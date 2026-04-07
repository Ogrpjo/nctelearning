import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
export declare class UserProgress {
    id: string;
    userId: string;
    lessonId: string;
    completedAt: Date;
    timeSpentMinutes: number;
    createdAt: Date;
    user: User;
    lesson: Lesson;
}
