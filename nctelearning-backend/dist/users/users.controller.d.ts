import { UsersService, CreateUserDto, UpdateUserDto } from './users.service';
import { UserRole, GradeLevel } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(role?: UserRole, gradeLevel?: GradeLevel): Promise<import("./entities/user.entity").User[]>;
    getStudents(gradeLevel?: GradeLevel): Promise<import("./entities/user.entity").User[]>;
    getTeachers(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
