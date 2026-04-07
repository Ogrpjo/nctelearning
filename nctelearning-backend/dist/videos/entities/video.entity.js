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
exports.Video = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Video = class Video {
    id;
    lessonId;
    gradeLevel;
    title;
    description;
    videoUrl;
    thumbnailUrl;
    durationSeconds;
    fileSizeMb;
    createdAt;
    updatedAt;
    lesson;
    get durationFormatted() {
        if (!this.durationSeconds)
            return '0:00';
        const minutes = Math.floor(this.durationSeconds / 60);
        const seconds = this.durationSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
};
exports.Video = Video;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Video.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lesson_id', nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_level', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Video.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'video_url' }),
    __metadata("design:type", String)
], Video.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size_mb', nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "fileSizeMb", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Video.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Video.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.videos, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lesson_id' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Video.prototype, "lesson", void 0);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)('videos')
], Video);
//# sourceMappingURL=video.entity.js.map