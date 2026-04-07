import { QuizQuestion } from './quiz-question.entity';
export declare class QuizQuestionOption {
    id: string;
    questionId: string;
    optionText: string;
    isCorrect: boolean;
    orderIndex: number;
    createdAt: Date;
    question: QuizQuestion;
}
