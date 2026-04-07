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
exports.EssayExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const essay_exercise_entity_1 = require("./entities/essay-exercise.entity");
const essay_submission_entity_1 = require("./entities/essay-submission.entity");
let EssayExercisesService = class EssayExercisesService {
    exercisesRepository;
    submissionsRepository;
    constructor(exercisesRepository, submissionsRepository) {
        this.exercisesRepository = exercisesRepository;
        this.submissionsRepository = submissionsRepository;
    }
    async createExercise(createExerciseDto) {
        const exercise = this.exercisesRepository.create(createExerciseDto);
        return this.exercisesRepository.save(exercise);
    }
    async createSubmission(createSubmissionDto) {
        const submission = this.submissionsRepository.create(createSubmissionDto);
        return this.submissionsRepository.save(submission);
    }
    async findAllExercises(gradeLevel, practiceType, topic) {
        const qb = this.exercisesRepository.createQueryBuilder('exercise')
            .leftJoinAndSelect('exercise.lesson', 'lesson')
            .leftJoinAndSelect('lesson.course', 'course')
            .orderBy('exercise.createdAt', 'DESC');
        if (gradeLevel) {
            qb.andWhere('(exercise.gradeLevel = :gradeLevel OR course.gradeLevel = :gradeLevel)', { gradeLevel });
        }
        if (practiceType) {
            qb.andWhere('exercise.practiceType = :practiceType', { practiceType });
        }
        if (topic) {
            qb.andWhere('exercise.topic = :topic', { topic });
        }
        return qb.getMany();
    }
    async findExerciseById(id) {
        return this.exercisesRepository.findOne({
            where: { id },
            relations: ['lesson'],
        });
    }
    async findByLesson(lessonId) {
        return this.exercisesRepository.find({
            where: { lessonId, isPublished: true },
            relations: ['lesson'],
            order: { createdAt: 'ASC' },
        });
    }
    async findByUser(userId) {
        return this.submissionsRepository.find({
            where: { userId },
            relations: ['exercise', 'exercise.lesson'],
            order: { submittedAt: 'DESC' },
        });
    }
    async gradeSubmission(submissionId, grade, feedback) {
        const submission = await this.submissionsRepository.findOne({
            where: { id: submissionId },
        });
        if (!submission) {
            throw new common_1.NotFoundException('Không tìm thấy bài nộp');
        }
        submission.grade = grade;
        submission.feedback = feedback || '';
        submission.gradedAt = new Date();
        return this.submissionsRepository.save(submission);
    }
    async deleteExercise(id) {
        await this.exercisesRepository.delete(id);
    }
};
exports.EssayExercisesService = EssayExercisesService;
exports.EssayExercisesService = EssayExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(essay_exercise_entity_1.EssayExercise)),
    __param(1, (0, typeorm_1.InjectRepository)(essay_submission_entity_1.EssaySubmission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EssayExercisesService);
//# sourceMappingURL=essay-exercises.service.js.map