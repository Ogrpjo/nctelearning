import { UserRole, GradeLevel } from '../../users/entities/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    gradeLevel?: GradeLevel;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: UserRole;
        gradeLevel?: GradeLevel;
        avatarUrl?: string;
    };
}
