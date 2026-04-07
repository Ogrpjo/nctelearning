import { Quiz } from './quiz.entity';
import { User } from '../../users/entities/user.entity';
import { QuizAttemptAnswer } from './quiz-attempt-answer.entity';
export declare class QuizAttempt {
    id: string;
    quizId: string;
    userId: string;
    startedAt: Date;
    completedAt: Date;
    score: number;
    totalPoints: number;
    timeSpentMinutes: number;
    createdAt: Date;
    quiz: Quiz;
    user: User;
    answers: QuizAttemptAnswer[];
    get isCompleted(): boolean;
    get percentage(): number;
    get duration(): number;
}
