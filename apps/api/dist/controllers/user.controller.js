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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const isPublic_1 = require("../constants/isPublic");
const auth_dto_1 = require("../dto/auth.dto");
const createUser_dto_1 = require("../dto/createUser.dto");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(user) {
        try {
            const createdUser = await this.userService.createUser(user);
            return {
                message: 'Conta criada com sucesso',
                data: createdUser,
            };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('Não foi possível criar conta');
            }
            throw new common_1.InternalServerErrorException('Algum erro inesperado aconteceu, tente novamente mais tarde');
        }
    }
    async auth(login) {
        try {
            const authResult = await this.userService.auth(login);
            return {
                message: 'Conta autenticada com sucesso',
                data: authResult,
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.BadRequestException('Não foi possível se autenticar');
            }
            else {
                throw new common_1.InternalServerErrorException('Algum erro inesperado aconteceu, tente novamente mais tarde');
            }
        }
    }
    async submitProfilePicture(file, request) {
        try {
            return this.userService.uploadProfilePicture(file, request['user'].sub ?? 0);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Algum erro inesperado aconteceu, tente novamente mais tarde');
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, isPublic_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, isPublic_1.Public)(),
    (0, common_1.Post)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "auth", null);
__decorate([
    (0, common_1.Post)('profile-picture'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "submitProfilePicture", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map