import { Repository } from 'typeorm';
import { UserProgress } from './entities/user-progress.entity';
export interface CreateUserProgressDto {
    userId: string;
    lessonId: string;
    timeSpentMinutes?: number;
}
export declare class UserProgressService {
    private progressRepository;
    constructor(progressRepository: Repository<UserProgress>);
    create(createProgressDto: CreateUserProgressDto): Promise<UserProgress>;
    findByUser(userId: string): Promise<UserProgress[]>;
    findByLesson(lessonId: string): Promise<UserProgress[]>;
    hasCompleted(userId: string, lessonId: string): Promise<boolean>;
    getCompletionStats(userId: string): Promise<{
        completed: number;
        total: number;
    }>;
}
