"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const quiz_question_entity_1 = require("./entities/quiz-question.entity");
const quiz_question_option_entity_1 = require("./entities/quiz-question-option.entity");
const quiz_attempt_entity_1 = require("./entities/quiz-attempt.entity");
const quiz_attempt_answer_entity_1 = require("./entities/quiz-attempt-answer.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
let QuizzesService = class QuizzesService {
    quizzesRepository;
    questionsRepository;
    optionsRepository;
    attemptsRepository;
    answersRepository;
    lessonsRepository;
    dataSource;
    constructor(quizzesRepository, questionsRepository, optionsRepository, attemptsRepository, answersRepository, lessonsRepository, dataSource) {
        this.quizzesRepository = quizzesRepository;
        this.questionsRepository = questionsRepository;
        this.optionsRepository = optionsRepository;
        this.attemptsRepository = attemptsRepository;
        this.answersRepository = answersRepository;
        this.lessonsRepository = lessonsRepository;
        this.dataSource = dataSource;
    }
    async createQuiz(createQuizDto) {
        const dto = (createQuizDto ?? {});
        if (!dto.title) {
            throw new common_1.BadRequestException('Thiếu tiêu đề (title)');
        }
        if (dto.lessonId) {
            const lesson = await this.lessonsRepository.findOne({ where: { id: dto.lessonId }, relations: ['course'] });
            if (!lesson) {
                throw new common_1.BadRequestException('Lesson không tồn tại');
            }
        }
        const quiz = this.quizzesRepository.create({
            ...dto,
            maxAttempts: dto.maxAttempts ?? 3,
        });
        return this.quizzesRepository.save(quiz);
    }
    async createQuestion(createQuestionDto) {
        const question = this.questionsRepository.create({
            ...createQuestionDto,
            questionType: createQuestionDto.questionType,
        });
        return this.questionsRepository.save(question);
    }
    async createOption(createOptionDto) {
        const option = this.optionsRepository.create(createOptionDto);
        return this.optionsRepository.save(option);
    }
    async findAllQuizzes(gradeLevel) {
        const qb = this.quizzesRepository.createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.lesson', 'lesson')
            .leftJoinAndSelect('lesson.course', 'course')
            .leftJoinAndSelect('quiz.questions', 'questions')
            .leftJoinAndSelect('questions.options', 'options')
            .orderBy('quiz.createdAt', 'DESC');
        if (gradeLevel) {
            qb.andWhere('(quiz.gradeLevel = :gradeLevel OR course.gradeLevel = :gradeLevel)', { gradeLevel });
        }
        return qb.getMany();
    }
    async findQuizById(id) {
        return this.quizzesRepository.findOne({
            where: { id },
            relations: ['lesson', 'lesson.course', 'questions', 'questions.options'],
        });
    }
    async findByLesson(lessonId) {
        return this.quizzesRepository.find({
            where: { lessonId, isPublished: true },
            relations: ['lesson', 'questions', 'questions.options'],
            order: { createdAt: 'ASC' },
        });
    }
    async startAttempt(quizId, userId) {
        const completedAttempt = await this.attemptsRepository
            .createQueryBuilder('attempt')
            .where('attempt.quizId = :quizId', { quizId })
            .andWhere('attempt.userId = :userId', { userId })
            .andWhere('attempt.completedAt IS NOT NULL')
            .getOne();
        if (completedAttempt) {
            throw new common_1.BadRequestException('Bạn đã hoàn thành bài tập này rồi. Mỗi học sinh chỉ được làm bài tập một lần.');
        }
        const inProgressAttempt = await this.attemptsRepository
            .createQueryBuilder('attempt')
            .where('attempt.quizId = :quizId', { quizId })
            .andWhere('attempt.userId = :userId', { userId })
            .andWhere('attempt.completedAt IS NULL')
            .getOne();
        if (inProgressAttempt) {
            return inProgressAttempt;
        }
        const attempt = this.attemptsRepository.create({
            quizId,
            userId,
            startedAt: new Date(),
        });
        return this.attemptsRepository.save(attempt);
    }
    async submitAnswer(attemptId, questionId, selectedOptionId, answerText) {
        const existingAnswer = await this.answersRepository.findOne({
            where: { attemptId, questionId },
        });
        if (existingAnswer) {
            if (answerText !== undefined) {
                existingAnswer.answerText = answerText;
                existingAnswer.selectedOptionId = null;
            }
            if (selectedOptionId !== undefined) {
                existingAnswer.selectedOptionId = selectedOptionId;
                existingAnswer.answerText = null;
            }
            return this.answersRepository.save(existingAnswer);
        }
        const answer = this.answersRepository.create({
            attemptId,
            questionId,
            selectedOptionId,
            answerText,
        });
        return this.answersRepository.save(answer);
    }
    async completeAttempt(attemptId, timeSpentMinutes) {
        const attempt = await this.attemptsRepository.findOne({
            where: { id: attemptId },
            relations: ['answers', 'quiz', 'quiz.questions', 'quiz.questions.options'],
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Không tìm thấy bài làm');
        }
        for (const answer of attempt.answers) {
            if (!answer.selectedOptionId)
                continue;
            const question = attempt.quiz.questions.find(q => q.id === answer.questionId);
            if (!question)
                continue;
            const selectedOption = question.options.find(opt => opt.id === answer.selectedOptionId);
            if (selectedOption) {
                answer.isCorrect = selectedOption.isCorrect;
                answer.pointsEarned = answer.isCorrect ? question.points : 0;
                await this.answersRepository.save(answer);
            }
        }
        const gradedAnswers = await this.answersRepository.find({
            where: { attemptId },
        });
        let score = 0;
        for (const answer of gradedAnswers) {
            if (answer.isCorrect) {
                score += answer.pointsEarned;
            }
        }
        const completedAt = new Date();
        let calculatedTimeSpent;
        if (timeSpentMinutes !== undefined) {
            calculatedTimeSpent = timeSpentMinutes;
        }
        else {
            const durationMs = completedAt.getTime() - attempt.startedAt.getTime();
            calculatedTimeSpent = Math.round(durationMs / 1000 / 60);
        }
        attempt.completedAt = completedAt;
        attempt.score = score;
        attempt.totalPoints = attempt.quiz.questions.reduce((sum, q) => sum + q.points, 0);
        attempt.timeSpentMinutes = calculatedTimeSpent;
        return this.attemptsRepository.save(attempt);
    }
    async listAttemptsForQuiz(quizId, status) {
        const where = { quizId };
        if (status === 'in_progress') {
            where.completedAt = null;
        }
        else if (status === 'completed') {
            where.completedAt = (0, typeorm_2.Not)(null);
        }
        return this.attemptsRepository.find({
            where,
            relations: ['user'],
            order: { startedAt: 'DESC' },
        });
    }
    async getAttemptWithAnswers(attemptId) {
        return this.attemptsRepository.findOne({
            where: { id: attemptId },
            relations: [
                'answers',
                'answers.question',
                'answers.selectedOption',
                'quiz',
                'quiz.questions',
                'quiz.questions.options',
                'user',
            ],
        });
    }
    async getMyAttemptWithAnswers(attemptId, userId) {
        const attempt = await this.attemptsRepository.findOne({
            where: { id: attemptId, userId },
            relations: [
                'answers',
                'answers.question',
                'answers.selectedOption',
                'quiz',
                'quiz.questions',
                'quiz.questions.options',
                'user',
            ],
            order: {
                quiz: {
                    questions: {
                        orderIndex: 'ASC',
                    },
                },
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Không tìm thấy bài làm');
        }
        if (attempt.quiz && attempt.quiz.questions) {
            attempt.quiz.questions.sort((a, b) => a.orderIndex - b.orderIndex);
        }
        return attempt;
    }
    async updateAnswer(answerId, answerText, selectedOptionId) {
        const answer = await this.answersRepository.findOne({ where: { id: answerId } });
        if (!answer) {
            throw new common_1.NotFoundException('Không tìm thấy câu trả lời');
        }
        if (answerText !== undefined) {
            answer.answerText = answerText;
            if (answerText) {
                answer.selectedOptionId = null;
            }
        }
        if (selectedOptionId !== undefined) {
            answer.selectedOptionId = selectedOptionId;
            if (selectedOptionId) {
                answer.answerText = null;
            }
        }
        return this.answersRepository.save(answer);
    }
    async gradeAnswer(answerId, pointsEarned, isCorrect, feedback) {
        const answer = await this.answersRepository.findOne({
            where: { id: answerId },
            relations: ['attempt'],
        });
        if (!answer) {
            throw new common_1.NotFoundException('Không tìm thấy câu trả lời');
        }
        if (pointsEarned !== undefined) {
            const numericPoints = Number(pointsEarned);
            if (Number.isFinite(numericPoints)) {
                answer.pointsEarned = numericPoints;
            }
        }
        if (typeof isCorrect === 'boolean') {
            answer.isCorrect = isCorrect;
        }
        if (feedback !== undefined) {
            answer.feedback = feedback;
        }
        const savedAnswer = await this.answersRepository.save(answer);
        await this.recalculateAttemptScore(answer.attemptId);
        return savedAnswer;
    }
    async recalculateAttemptScore(attemptId) {
        const attempt = await this.attemptsRepository.findOne({
            where: { id: attemptId },
            relations: ['quiz', 'quiz.questions', 'answers'],
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Không tìm thấy bài làm');
        }
        const calculatedScore = attempt.answers.reduce((sum, answer) => {
            return sum + (answer.pointsEarned || 0);
        }, 0);
        attempt.score = calculatedScore;
        attempt.totalPoints = attempt.quiz.questions.reduce((sum, q) => sum + q.points, 0);
        return this.attemptsRepository.save(attempt);
    }
    async updateAttemptScore(attemptId, score) {
        const attempt = await this.attemptsRepository.findOne({
            where: { id: attemptId },
            relations: ['quiz', 'quiz.questions'],
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Không tìm thấy bài làm');
        }
        const numericScore = Number(score);
        attempt.score = Number.isFinite(numericScore) ? numericScore : 0;
        if (attempt.quiz && attempt.quiz.questions) {
            attempt.totalPoints = attempt.quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
        }
        return this.attemptsRepository.save(attempt);
    }
    async deleteAllAttempts() {
        try {
            const answersCountBefore = await this.dataSource.query('SELECT COUNT(*) as count FROM quiz_attempt_answers');
            const attemptsCountBefore = await this.dataSource.query('SELECT COUNT(*) as count FROM quiz_attempts');
            const deletedAnswers = parseInt(answersCountBefore[0]?.count || '0', 10);
            const deletedAttempts = parseInt(attemptsCountBefore[0]?.count || '0', 10);
            await this.dataSource.query('DELETE FROM quiz_attempt_answers');
            await this.dataSource.query('DELETE FROM quiz_attempts');
            return {
                message: 'Đã xóa tất cả bài làm và câu trả lời',
                deletedAttempts,
                deletedAnswers,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteQuiz(id) {
        const quiz = await this.quizzesRepository.findOne({ where: { id } });
        if (!quiz) {
            throw new common_1.NotFoundException('Không tìm thấy bài tập');
        }
        const attempts = await this.attemptsRepository.find({ where: { quizId: id } });
        for (const attempt of attempts) {
            await this.answersRepository.delete({ attemptId: attempt.id });
        }
        await this.attemptsRepository.delete({ quizId: id });
        const questions = await this.questionsRepository.find({ where: { quizId: id } });
        for (const question of questions) {
            await this.optionsRepository.delete({ questionId: question.id });
        }
        await this.questionsRepository.delete({ quizId: id });
        const result = await this.quizzesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Không thể xóa bài tập');
        }
    }
    async getAllAttemptsGroupedByGrade() {
        const attempts = await this.attemptsRepository
            .createQueryBuilder('attempt')
            .leftJoinAndSelect('attempt.user', 'user')
            .leftJoinAndSelect('attempt.quiz', 'quiz')
            .where('attempt.completedAt IS NOT NULL')
            .orderBy('attempt.completedAt', 'DESC')
            .getMany();
        const grouped = {
            '10': [],
            '11': [],
            '12': [],
        };
        for (const attempt of attempts) {
            const gradeLevel = attempt.user?.gradeLevel || 'unknown';
            if (gradeLevel in grouped) {
                grouped[gradeLevel].push(attempt);
            }
        }
        return grouped;
    }
    async getMyAttempts(userId) {
        try {
            const attempts = await this.attemptsRepository.find({
                where: { userId },
                relations: ['quiz', 'answers', 'quiz.questions', 'quiz.questions.options'],
                order: { startedAt: 'DESC' },
            });
            console.log(`[getMyAttempts] Loaded ${attempts.length} attempts for user ${userId}`);
            attempts.forEach((attempt, idx) => {
                console.log(`[getMyAttempts] Attempt ${idx + 1}:`, {
                    id: attempt.id,
                    quizTitle: attempt.quiz?.title,
                    completedAt: attempt.completedAt,
                    hasAnswers: !!attempt.answers,
                    answersCount: attempt.answers?.length ?? 0,
                    answersType: Array.isArray(attempt.answers) ? 'array' : typeof attempt.answers,
                });
                if (attempt.answers && attempt.answers.length > 0) {
                    console.log(`[getMyAttempts] Answers for attempt ${attempt.id}:`, attempt.answers.map(a => ({ id: a.id, questionId: a.questionId, pointsEarned: a.pointsEarned })));
                }
            });
            for (const attempt of attempts) {
                try {
                    if (!attempt.completedAt) {
                        attempt.isFullyGraded = false;
                        continue;
                    }
                    const quiz = await this.quizzesRepository.findOne({
                        where: { id: attempt.quizId },
                        relations: ['questions', 'questions.options'],
                    });
                    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
                        attempt.isFullyGraded = true;
                        continue;
                    }
                    const essayQuestions = quiz.questions.filter(q => {
                        if (!q)
                            return false;
                        const isEssay = q.questionType === quiz_question_entity_1.QuestionType.ESSAY;
                        const hasNoOptions = !q.options || !Array.isArray(q.options) || q.options.length === 0;
                        return isEssay || hasNoOptions;
                    });
                    if (essayQuestions.length === 0) {
                        attempt.isFullyGraded = true;
                        continue;
                    }
                    const answers = attempt.answers || [];
                    const essayAnswers = answers.filter(a => a && essayQuestions.some(q => q && q.id === a.questionId));
                    if (essayAnswers.length === 0) {
                        attempt.isFullyGraded = false;
                        continue;
                    }
                    const allGraded = essayAnswers.every(a => a && a.pointsEarned !== null && a.pointsEarned !== undefined);
                    attempt.isFullyGraded = allGraded && essayAnswers.length > 0;
                }
                catch (error) {
                    attempt.isFullyGraded = false;
                }
                if (!attempt.answers) {
                    attempt.answers = [];
                }
            }
            return attempts;
        }
        catch (error) {
            return [];
        }
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_question_entity_1.QuizQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(quiz_question_option_entity_1.QuizQuestionOption)),
    __param(3, (0, typeorm_1.InjectRepository)(quiz_attempt_entity_1.QuizAttempt)),
    __param(4, (0, typeorm_1.InjectRepository)(quiz_attempt_answer_entity_1.QuizAttemptAnswer)),
    __param(5, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(6, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map