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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
let Course = class Course {
    id;
    title;
    description;
    gradeLevel;
    thumbnailUrl;
    createdById;
    createdBy;
    isPublished;
    createdAt;
    updatedAt;
    lessons;
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
    }),
    __metadata("design:type", String)
], Course.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_id', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.courses, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_published', default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.course),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)('courses')
], Course);
//# sourceMappingURL=course.entity.js.map