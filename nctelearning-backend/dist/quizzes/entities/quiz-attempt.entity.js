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
exports.QuizAttempt = void 0;
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const quiz_attempt_answer_entity_1 = require("./quiz-attempt-answer.entity");
let QuizAttempt = class QuizAttempt {
    id;
    quizId;
    userId;
    startedAt;
    completedAt;
    score;
    totalPoints;
    timeSpentMinutes;
    createdAt;
    quiz;
    user;
    answers;
    get isCompleted() {
        return this.completedAt !== null;
    }
    get percentage() {
        if (this.totalPoints === 0)
            return 0;
        return Math.round((this.score / this.totalPoints) * 100);
    }
    get duration() {
        if (!this.completedAt)
            return 0;
        return Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000 / 60);
    }
};
exports.QuizAttempt = QuizAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttempt.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttempt.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "totalPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "timeSpentMinutes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.attempts),
    (0, typeorm_1.JoinColumn)({ name: 'quizId' }),
    __metadata("design:type", quiz_entity_1.Quiz)
], QuizAttempt.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.quizAttempts),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], QuizAttempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_answer_entity_1.QuizAttemptAnswer, (answer) => answer.attempt),
    __metadata("design:type", Array)
], QuizAttempt.prototype, "answers", void 0);
exports.QuizAttempt = QuizAttempt = __decorate([
    (0, typeorm_1.Entity)('quiz_attempts')
], QuizAttempt);
//# sourceMappingURL=quiz-attempt.entity.js.map