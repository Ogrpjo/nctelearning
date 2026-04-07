import { Repository, DataSource } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizQuestionOption } from './entities/quiz-question-option.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizAttemptAnswer } from './entities/quiz-attempt-answer.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { GradeLevel } from '../users/entities/user.entity';
export interface CreateQuizDto {
    lessonId?: string;
    title: string;
    description?: string;
    timeLimitMinutes?: number;
    maxAttempts?: number;
    isPublished?: boolean;
    gradeLevel?: GradeLevel;
    practiceType?: 'doc_hieu' | 'viet';
    topic?: string;
}
export interface CreateQuizQuestionDto {
    quizId: string;
    questionText: string;
    questionType: 'multiple_choice' | 'essay';
    orderIndex: number;
    points?: number;
}
export interface CreateQuizOptionDto {
    questionId: string;
    optionText: string;
    isCorrect: boolean;
    orderIndex: number;
}
export declare class QuizzesService {
    private quizzesRepository;
    private questionsRepository;
    private optionsRepository;
    private attemptsRepository;
    private answersRepository;
    private lessonsRepository;
    private dataSource;
    constructor(quizzesRepository: Repository<Quiz>, questionsRepository: Repository<QuizQuestion>, optionsRepository: Repository<QuizQuestionOption>, attemptsRepository: Repository<QuizAttempt>, answersRepository: Repository<QuizAttemptAnswer>, lessonsRepository: Repository<Lesson>, dataSource: DataSource);
    createQuiz(createQuizDto?: CreateQuizDto): Promise<Quiz>;
    createQuestion(createQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion>;
    createOption(createOptionDto: CreateQuizOptionDto): Promise<QuizQuestionOption>;
    findAllQuizzes(gradeLevel?: '10' | '11' | '12'): Promise<Quiz[]>;
    findQuizById(id: string): Promise<Quiz | null>;
    findByLesson(lessonId: string): Promise<Quiz[]>;
    startAttempt(quizId: string, userId: string): Promise<QuizAttempt>;
    submitAnswer(attemptId: string, questionId: string, selectedOptionId?: string, answerText?: string): Promise<QuizAttemptAnswer>;
    completeAttempt(attemptId: string, timeSpentMinutes?: number): Promise<QuizAttempt>;
    listAttemptsForQuiz(quizId: string, status?: 'in_progress' | 'completed'): Promise<QuizAttempt[]>;
    getAttemptWithAnswers(attemptId: string): Promise<QuizAttempt | null>;
    getMyAttemptWithAnswers(attemptId: string, userId: string): Promise<QuizAttempt | null>;
    updateAnswer(answerId: string, answerText?: string, selectedOptionId?: string): Promise<QuizAttemptAnswer>;
    gradeAnswer(answerId: string, pointsEarned?: number, isCorrect?: boolean, feedback?: string): Promise<QuizAttemptAnswer>;
    recalculateAttemptScore(attemptId: string): Promise<QuizAttempt>;
    updateAttemptScore(attemptId: string, score: number): Promise<QuizAttempt>;
    deleteAllAttempts(): Promise<{
        message: string;
        deletedAttempts: number;
        deletedAnswers: number;
    }>;
    deleteQuiz(id: string): Promise<void>;
    getAllAttemptsGroupedByGrade(): Promise<Record<string, QuizAttempt[]>>;
    getMyAttempts(userId: string): Promise<QuizAttempt[]>;
}
