import { Lesson } from '../../lessons/entities/lesson.entity';
import { GradeLevel } from '../../users/entities/user.entity';
import { QuizQuestion } from './quiz-question.entity';
import { QuizAttempt } from './quiz-attempt.entity';
export declare class Quiz {
    id: string;
    lessonId: string;
    gradeLevel: GradeLevel | null;
    title: string;
    description: string;
    timeLimitMinutes: number;
    maxAttempts: number;
    isPublished: boolean;
    practiceType: 'doc_hieu' | 'viet' | null;
    topic: string | null;
    createdAt: Date;
    updatedAt: Date;
    lesson: Lesson;
    questions: QuizQuestion[];
    attempts: QuizAttempt[];
    get totalPoints(): number;
    get questionCount(): number;
}
