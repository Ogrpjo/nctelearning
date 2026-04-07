import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./dto/auth.dto").AuthResponseDto>;
    login(loginDto: LoginDto): Promise<import("./dto/auth.dto").AuthResponseDto>;
    getProfile(req: {
        user: User;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import("../users/entities/user.entity").UserRole;
        gradeLevel: import("../users/entities/user.entity").GradeLevel;
        avatarUrl: string;
    }>;
}
