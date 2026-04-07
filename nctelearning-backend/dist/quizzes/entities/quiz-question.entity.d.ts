import { Quiz } from './quiz.entity';
import { QuizQuestionOption } from './quiz-question-option.entity';
import { QuizAttemptAnswer } from './quiz-attempt-answer.entity';
export declare enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    ESSAY = "essay"
}
export declare class QuizQuestion {
    id: string;
    quizId: string;
    questionText: string;
    questionType: QuestionType;
    orderIndex: number;
    points: number;
    createdAt: Date;
    updatedAt: Date;
    quiz: Quiz;
    options: QuizQuestionOption[];
    attemptAnswers: QuizAttemptAnswer[];
    get correctOption(): QuizQuestionOption | undefined;
    isMultipleChoice(): boolean;
    isEssay(): boolean;
}
