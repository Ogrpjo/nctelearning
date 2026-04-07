import { QuizAttempt } from './quiz-attempt.entity';
import { QuizQuestion } from './quiz-question.entity';
import { QuizQuestionOption } from './quiz-question-option.entity';
export declare class QuizAttemptAnswer {
    id: string;
    attemptId: string;
    questionId: string;
    selectedOptionId: string;
    answerText: string;
    isCorrect: boolean;
    pointsEarned: number;
    feedback: string;
    createdAt: Date;
    attempt: QuizAttempt;
    question: QuizQuestion;
    selectedOption: QuizQuestionOption;
}
