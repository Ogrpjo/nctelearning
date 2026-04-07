import { QuizzesService, CreateQuizDto, CreateQuizQuestionDto, CreateQuizOptionDto } from './quizzes.service';
import { User } from '../users/entities/user.entity';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    createQuiz(createQuizDto?: CreateQuizDto): Promise<import("./entities/quiz.entity").Quiz>;
    createQuestion(createQuestionDto: CreateQuizQuestionDto): Promise<import("./entities/quiz-question.entity").QuizQuestion>;
    createOption(createOptionDto: CreateQuizOptionDto): Promise<import("./entities/quiz-question-option.entity").QuizQuestionOption>;
    findAll(lessonId?: string, gradeLevel?: '10' | '11' | '12'): Promise<import("./entities/quiz.entity").Quiz[]>;
    findOne(id: string): Promise<import("./entities/quiz.entity").Quiz | null>;
    startAttempt(quizId: string, body: {
        userId: string;
    }): Promise<import("./entities/quiz-attempt.entity").QuizAttempt>;
    submitAnswer(attemptId: string, body: {
        questionId: string;
        selectedOptionId?: string;
        answerText?: string;
    }): Promise<import("./entities/quiz-attempt-answer.entity").QuizAttemptAnswer>;
    completeAttempt(attemptId: string, body?: {
        timeSpentMinutes?: number;
    }): Promise<import("./entities/quiz-attempt.entity").QuizAttempt>;
    getMyAttempts(user: User): Promise<import("./entities/quiz-attempt.entity").QuizAttempt[]>;
    getMyAttempt(attemptId: string, user: User): Promise<import("./entities/quiz-attempt.entity").QuizAttempt | null>;
    listAttempts(quizId: string, status?: 'in_progress' | 'completed'): Promise<import("./entities/quiz-attempt.entity").QuizAttempt[]>;
    getAttempt(attemptId: string): Promise<import("./entities/quiz-attempt.entity").QuizAttempt | null>;
    updateAnswer(answerId: string, body: {
        answerText?: string;
        selectedOptionId?: string;
        pointsEarned?: number | string;
        isCorrect?: boolean;
        feedback?: string;
    }): Promise<import("./entities/quiz-attempt-answer.entity").QuizAttemptAnswer>;
    updateAttemptScore(attemptId: string, body: {
        score: number | string;
    }): Promise<import("./entities/quiz-attempt.entity").QuizAttempt>;
    getAllAttemptsByGrade(): Promise<Record<string, import("./entities/quiz-attempt.entity").QuizAttempt[]>>;
    deleteAllAttempts(): Promise<{
        message: string;
        deletedAttempts: number;
        deletedAnswers: number;
    }>;
    remove(id: string): Promise<void>;
}
