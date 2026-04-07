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
exports.User = exports.GradeLevel = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
const quiz_attempt_entity_1 = require("../../quizzes/entities/quiz-attempt.entity");
const essay_submission_entity_1 = require("../../essay-exercises/entities/essay-submission.entity");
const user_progress_entity_1 = require("../../user-progress/entities/user-progress.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var GradeLevel;
(function (GradeLevel) {
    GradeLevel["GRADE_10"] = "10";
    GradeLevel["GRADE_11"] = "11";
    GradeLevel["GRADE_12"] = "12";
})(GradeLevel || (exports.GradeLevel = GradeLevel = {}));
let User = class User {
    id;
    email;
    passwordHash;
    firstName;
    lastName;
    role;
    gradeLevel;
    avatarUrl;
    isActive;
    createdAt;
    updatedAt;
    courses;
    quizAttempts;
    essaySubmissions;
    progress;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    isAdmin() {
        return this.role === UserRole.ADMIN;
    }
    isStudent() {
        return this.role === UserRole.USER;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash' }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        name: 'grade_level',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_url', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, (course) => course.createdBy),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_entity_1.QuizAttempt, (attempt) => attempt.user),
    __metadata("design:type", Array)
], User.prototype, "quizAttempts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => essay_submission_entity_1.EssaySubmission, (submission) => submission.user),
    __metadata("design:type", Array)
], User.prototype, "essaySubmissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_progress_entity_1.UserProgress, (progress) => progress.user),
    __metadata("design:type", Array)
], User.prototype, "progress", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map