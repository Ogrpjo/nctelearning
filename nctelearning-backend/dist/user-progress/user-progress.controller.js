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
exports.UserProgressController = void 0;
const common_1 = require("@nestjs/common");
const user_progress_service_1 = require("./user-progress.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserProgressController = class UserProgressController {
    userProgressService;
    constructor(userProgressService) {
        this.userProgressService = userProgressService;
    }
    create(createProgressDto) {
        return this.userProgressService.create(createProgressDto);
    }
    findByUser(userId) {
        return this.userProgressService.findByUser(userId);
    }
    findByLesson(lessonId) {
        return this.userProgressService.findByLesson(lessonId);
    }
    getStats(userId) {
        return this.userProgressService.getCompletionStats(userId);
    }
    hasCompleted(userId, lessonId) {
        return this.userProgressService.hasCompleted(userId, lessonId);
    }
};
exports.UserProgressController = UserProgressController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('lesson'),
    __param(0, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "findByLesson", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "hasCompleted", null);
exports.UserProgressController = UserProgressController = __decorate([
    (0, common_1.Controller)('user-progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_progress_service_1.UserProgressService])
], UserProgressController);
//# sourceMappingURL=user-progress.controller.js.map