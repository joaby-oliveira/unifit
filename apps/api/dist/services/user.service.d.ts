import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { S3ManagerService } from './s3-manager.service';
import { UserInterface } from 'src/interfaces/user.interface';
export declare class UserService {
    private prismaService;
    private jwtService;
    private s3ManagerService;
    constructor(prismaService: PrismaService, jwtService: JwtService, s3ManagerService: S3ManagerService);
    createUser(user: UserInterface): Promise<{
        id: number;
        email: string;
        password: string;
        accessLevel: string;
        name: string;
        status: string;
        ra: string;
        profilePicture: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    auth(loginData: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    uploadProfilePicture(file: any, userId: number): Promise<{
        message: string;
    }>;
}
