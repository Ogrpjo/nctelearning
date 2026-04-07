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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayExercise = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
const essay_submission_entity_1 = require("./essay-submission.entity");
let EssayExercise = class EssayExercise {
    id;
    lessonId;
    gradeLevel;
    title;
    prompt;
    wordCountMin;
    wordCountMax;
    timeLimitMinutes;
    isPublished;
    practiceType;
    topic;
    imageUrl;
    createdAt;
    updatedAt;
    lesson;
    submissions;
    get wordCountRange() {
        return `${this.wordCountMin} - ${this.wordCountMax} từ`;
    }
    get timeLimitFormatted() {
        return `${this.timeLimitMinutes} phút`;
    }
};
exports.EssayExercise = EssayExercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EssayExercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], EssayExercise.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_level', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], EssayExercise.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EssayExercise.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EssayExercise.prototype, "prompt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 200 }),
    __metadata("design:type", Number)
], EssayExercise.prototype, "wordCountMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1000 }),
    __metadata("design:type", Number)
], EssayExercise.prototype, "wordCountMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 60 }),
    __metadata("design:type", Number)
], EssayExercise.prototype, "timeLimitMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EssayExercise.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'practice_type', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], EssayExercise.prototype, "practiceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'topic', type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], EssayExercise.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EssayExercise.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EssayExercise.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EssayExercise.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.essayExercises, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lessonId' }),
    __metadata("design:type", Object)
], EssayExercise.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => essay_submission_entity_1.EssaySubmission, (submission) => submission.exercise),
    __metadata("design:type", Array)
], EssayExercise.prototype, "submissions", void 0);
exports.EssayExercise = EssayExercise = __decorate([
    (0, typeorm_1.Entity)('essay_exercises')
], EssayExercise);
//# sourceMappingURL=essay-exercise.entity.js.map