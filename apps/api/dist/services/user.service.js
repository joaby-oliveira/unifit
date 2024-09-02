"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const fs_1 = require("fs");
const s3_manager_service_1 = require("./s3-manager.service");
let UserService = class UserService {
    constructor(prismaService, jwtService, s3ManagerService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.s3ManagerService = s3ManagerService;
    }
    async createUser(user) {
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
    async auth(loginData) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: {
                email: loginData.email,
            },
        });
        const passwordIsValid = await bcrypt.compare(loginData.password, user.password);
        if (!passwordIsValid) {
            const error = new Error();
            error['code'] = 'P2025';
            throw error;
        }
        return {
            access_token: await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                accessLevel: user.accessLevel,
            }, {
                secret: process.env['JWT_SECRET'],
                algorithm: 'HS256',
                expiresIn: '1d',
            }),
        };
    }
    async uploadProfilePicture(file, userId) {
        const filePath = 'temp/' + file.originalname;
        (0, fs_1.writeFileSync)(filePath, file.buffer);
        const key = `profile_${Date.now().toString()}.${file.originalname.split('.')[1]}`;
        await this.s3ManagerService.putObject({
            key,
            stream: (0, fs_1.readFileSync)(filePath),
        });
        (0, fs_1.rmSync)(filePath);
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
    async listUsers(filter) {
        const fieldsToBring = {};
        filter.fieldsToReturn.forEach((field) => {
            fieldsToBring[field] = true;
        });
        return {
            message: 'Usuários listados com sucesso',
            data: await this.prismaService.user.findMany({
                select: { ...fieldsToBring },
                where: { createdAt: { gt: new Date() } },
            }),
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        s3_manager_service_1.S3ManagerService])
], UserService);
//# sourceMappingURL=user.service.js.map