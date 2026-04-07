import { Repository } from 'typeorm';
import { User, UserRole, GradeLevel } from './entities/user.entity';
export interface CreateUserDto {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    gradeLevel?: GradeLevel;
    avatarUrl?: string;
}
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    gradeLevel?: GradeLevel;
    avatarUrl?: string;
    isActive?: boolean;
}
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findByRole(role: UserRole): Promise<User[]>;
    findByGradeLevel(gradeLevel: GradeLevel): Promise<User[]>;
    getStudentsByGrade(gradeLevel: GradeLevel): Promise<User[]>;
    getTeachers(): Promise<User[]>;
}
