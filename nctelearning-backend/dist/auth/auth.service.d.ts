import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    private generateAccessToken;
    private sanitizeUser;
    validateUser(email: string, password: string): Promise<User | null>;
}
