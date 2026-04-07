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
exports.EssaySubmission = void 0;
const typeorm_1 = require("typeorm");
const essay_exercise_entity_1 = require("./essay-exercise.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let EssaySubmission = class EssaySubmission {
    id;
    exerciseId;
    userId;
    content;
    wordCount;
    timeSpentMinutes;
    submittedAt;
    gradedAt;
    grade;
    feedback;
    createdAt;
    exercise;
    user;
    get isGraded() {
        return this.gradedAt !== null;
    }
    get gradeFormatted() {
        if (this.grade === null)
            return 'Chưa chấm';
        return `${this.grade}/100`;
    }
    get wordCountFormatted() {
        return `${this.wordCount || 0} từ`;
    }
};
exports.EssaySubmission = EssaySubmission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EssaySubmission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EssaySubmission.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EssaySubmission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EssaySubmission.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EssaySubmission.prototype, "wordCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EssaySubmission.prototype, "timeSpentMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EssaySubmission.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EssaySubmission.prototype, "gradedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], EssaySubmission.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EssaySubmission.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EssaySubmission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => essay_exercise_entity_1.EssayExercise, (exercise) => exercise.submissions),
    (0, typeorm_1.JoinColumn)({ name: 'exerciseId' }),
    __metadata("design:type", essay_exercise_entity_1.EssayExercise)
], EssaySubmission.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.essaySubmissions),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], EssaySubmission.prototype, "user", void 0);
exports.EssaySubmission = EssaySubmission = __decorate([
    (0, typeorm_1.Entity)('essay_submissions')
], EssaySubmission);
//# sourceMappingURL=essay-submission.entity.js.map