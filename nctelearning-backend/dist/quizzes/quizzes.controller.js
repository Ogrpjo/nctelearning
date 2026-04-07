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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let QuizzesController = class QuizzesController {
    quizzesService;
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    createQuiz(createQuizDto) {
        const dto = (createQuizDto ?? {});
        return this.quizzesService.createQuiz(dto);
    }
    createQuestion(createQuestionDto) {
        return this.quizzesService.createQuestion(createQuestionDto);
    }
    createOption(createOptionDto) {
        return this.quizzesService.createOption(createOptionDto);
    }
    findAll(lessonId, gradeLevel) {
        if (lessonId) {
            return this.quizzesService.findByLesson(lessonId);
        }
        return this.quizzesService.findAllQuizzes(gradeLevel);
    }
    findOne(id) {
        return this.quizzesService.findQuizById(id);
    }
    startAttempt(quizId, body) {
        return this.quizzesService.startAttempt(quizId, body.userId);
    }
    submitAnswer(attemptId, body) {
        return this.quizzesService.submitAnswer(attemptId, body.questionId, body.selectedOptionId, body.answerText);
    }
    completeAttempt(attemptId, body) {
        return this.quizzesService.completeAttempt(attemptId, body?.timeSpentMinutes);
    }
    getMyAttempts(user) {
        return this.quizzesService.getMyAttempts(user.id);
    }
    getMyAttempt(attemptId, user) {
        return this.quizzesService.getMyAttemptWithAnswers(attemptId, user.id);
    }
    listAttempts(quizId, status) {
        return this.quizzesService.listAttemptsForQuiz(quizId, status);
    }
    getAttempt(attemptId) {
        return this.quizzesService.getAttemptWithAnswers(attemptId);
    }
    updateAnswer(answerId, body) {
        if (body.pointsEarned !== undefined || body.isCorrect !== undefined || body.feedback !== undefined) {
            const parsedPointsEarned = typeof body?.pointsEarned === 'string' ? Number.parseFloat(body.pointsEarned) : body?.pointsEarned;
            return this.quizzesService.gradeAnswer(answerId, parsedPointsEarned, body.isCorrect, body.feedback);
        }
        return this.quizzesService.updateAnswer(answerId, body.answerText, body.selectedOptionId);
    }
    updateAttemptScore(attemptId, body) {
        const parsedScore = typeof body?.score === 'string' ? Number.parseFloat(body.score) : body?.score;
        return this.quizzesService.updateAttemptScore(attemptId, parsedScore);
    }
    getAllAttemptsByGrade() {
        return this.quizzesService.getAllAttemptsGroupedByGrade();
    }
    deleteAllAttempts() {
        return this.quizzesService.deleteAllAttempts();
    }
    remove(id) {
        return this.quizzesService.deleteQuiz(id);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)('questions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Post)('options'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "createOption", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('lessonId')),
    __param(1, (0, common_1.Query)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Post)('attempts/:attemptId/answers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)('attempts/:attemptId/complete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "completeAttempt", null);
__decorate([
    (0, common_1.Get)('my/attempts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "getMyAttempts", null);
__decorate([
    (0, common_1.Get)('my/attempts/:attemptId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "getMyAttempt", null);
__decorate([
    (0, common_1.Get)(':id/attempts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "listAttempts", null);
__decorate([
    (0, common_1.Get)('attempts/:attemptId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "getAttempt", null);
__decorate([
    (0, common_1.Patch)('attempts/answers/:answerId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('answerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "updateAnswer", null);
__decorate([
    (0, common_1.Patch)('attempts/:attemptId/score'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "updateAttemptScore", null);
__decorate([
    (0, common_1.Get)('admin/attempts/by-grade'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "getAllAttemptsByGrade", null);
__decorate([
    (0, common_1.Delete)('admin/attempts/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "deleteAllAttempts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "remove", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map