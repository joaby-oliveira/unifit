import { Request } from 'express';
import { AuthDTO } from 'src/dto/auth.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<{
        message: string;
        data: {
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
        };
    }>;
    auth(login: AuthDTO): Promise<{
        message: string;
        data: {
            access_token: string;
        };
    }>;
    submitProfilePicture(file: Express.Multer.File, request: Request): Promise<{
        message: string;
    }>;
}
