"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controllers/user.controller");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./guards/auth.guard");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const aws_sdk_1 = require("aws-sdk");
const s3_manager_module_1 = require("./modules/s3-manager.module");
const prisma_service_1 = require("./services/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            s3_manager_module_1.S3ManagerModule,
            nest_aws_sdk_1.AwsSdkModule.forRoot({
                defaultServiceOptions: {
                    region: 'us-east-1',
                    credentials: new aws_sdk_1.SharedIniFileCredentials({
                        profile: 'localstack',
                    }),
                    endpoint: 'http://localhost:4566',
                    s3ForcePathStyle: true,
                },
                services: [aws_sdk_1.S3],
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            prisma_service_1.PrismaService,
            user_service_1.UserService,
            jwt_1.JwtService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map