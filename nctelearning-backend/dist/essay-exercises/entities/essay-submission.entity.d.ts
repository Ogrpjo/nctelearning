import { EssayExercise } from './essay-exercise.entity';
import { User } from '../../users/entities/user.entity';
export declare class EssaySubmission {
    id: string;
    exerciseId: string;
    userId: string;
    content: string;
    wordCount: number;
    timeSpentMinutes: number;
    submittedAt: Date;
    gradedAt: Date;
    grade: number;
    feedback: string;
    createdAt: Date;
    exercise: EssayExercise;
    user: User;
    get isGraded(): boolean;
    get gradeFormatted(): string;
    get wordCountFormatted(): string;
}
