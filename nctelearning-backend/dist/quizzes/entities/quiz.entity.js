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
exports.Quiz = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
const quiz_question_entity_1 = require("./quiz-question.entity");
const quiz_attempt_entity_1 = require("./quiz-attempt.entity");
let Quiz = class Quiz {
    id;
    lessonId;
    gradeLevel;
    title;
    description;
    timeLimitMinutes;
    maxAttempts;
    isPublished;
    practiceType;
    topic;
    createdAt;
    updatedAt;
    lesson;
    questions;
    attempts;
    get totalPoints() {
        return this.questions?.reduce((sum, question) => sum + question.points, 0) || 0;
    }
    get questionCount() {
        return this.questions?.length || 0;
    }
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_level', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], Quiz.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeLimitMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 3 }),
    __metadata("design:type", Number)
], Quiz.prototype, "maxAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'practice_type', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], Quiz.prototype, "practiceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'topic', type: 'varchar', length: 32, nullable: true }),
    __metadata("design:type", Object)
], Quiz.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.quizzes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lessonId' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Quiz.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_question_entity_1.QuizQuestion, (question) => question.quiz, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_entity_1.QuizAttempt, (attempt) => attempt.quiz, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Quiz.prototype, "attempts", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)('quizzes')
], Quiz);
//# sourceMappingURL=quiz.entity.js.map