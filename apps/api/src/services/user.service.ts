import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { S3ManagerService } from './s3-manager.service';
import {
  ListUsersFilterInterface,
  UserInterface,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private s3ManagerService: S3ManagerService,
  ) {}

  public async createUser(user: UserInterface) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    return await this.prismaService.user.create({
      data: {
        ...user,
        accessLevel: 'member',
        status: 'waiting',
        password: hashedPassword,
      },
    });
  }

  public async auth(loginData: { email: string; password: string }) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        email: loginData.email,
      },
    });

    const passwordIsValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!passwordIsValid) {
      const error = new Error();
      error['code'] = 'P2025';

      throw error;
    }

    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          accessLevel: user.accessLevel,
        },
        {
          secret: process.env['JWT_SECRET'],
          algorithm: 'HS256',
          expiresIn: '1d',
        },
      ),
    };
  }

  public async uploadProfilePicture(file: any, userId: number) {
    const filePath = 'temp/' + file.originalname;

    writeFileSync(filePath, file.buffer);

    const key = `profile_${Date.now().toString()}.${file.originalname.split('.')[1]}`;

    await this.s3ManagerService.putObject({
      key,
      stream: readFileSync(filePath),
    });

    rmSync(filePath);

    await this.prismaService.user.update({
      data: {
        profilePicture: `${process.env['AWS_ENDPOINT'] ?? 'http://localhost:4566'}/${process.env['AWS_BUCKET_NAME'] ?? 'ichacara-dev'}/${key}`,
      },
      where: {
        id: userId,
      },
    });

    return {
      message: 'Foto de perfil atualizada com sucesso',
    };
  }

  public async listUsers(filter: ListUsersFilterInterface) {
    const fieldsToBring = {};

    filter.fieldsToReturn.forEach((field) => {
      fieldsToBring[field] = true;
    });

    console.log(fieldsToBring);
    return {
      message: 'Usuários listados com sucesso',
      data: await this.prismaService.user.findMany({
        select: { ...fieldsToBring },
        where: { createdAt: { gt: new Date() } },
      }),
    };
  }
}
