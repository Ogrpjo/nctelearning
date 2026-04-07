import { UserProgressService, CreateUserProgressDto } from './user-progress.service';
export declare class UserProgressController {
    private readonly userProgressService;
    constructor(userProgressService: UserProgressService);
    create(createProgressDto: CreateUserProgressDto): Promise<import("./entities/user-progress.entity").UserProgress>;
    findByUser(userId: string): Promise<import("./entities/user-progress.entity").UserProgress[]>;
    findByLesson(lessonId: string): Promise<import("./entities/user-progress.entity").UserProgress[]>;
    getStats(userId: string): Promise<{
        completed: number;
        total: number;
    }>;
    hasCompleted(userId: string, lessonId: string): Promise<boolean>;
}
