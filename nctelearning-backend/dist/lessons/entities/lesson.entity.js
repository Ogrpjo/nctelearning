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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
const video_entity_1 = require("../../videos/entities/video.entity");
const quiz_entity_1 = require("../../quizzes/entities/quiz.entity");
const essay_exercise_entity_1 = require("../../essay-exercises/entities/essay-exercise.entity");
let Lesson = class Lesson {
    id;
    courseId;
    title;
    description;
    orderIndex;
    durationMinutes;
    isPublished;
    createdAt;
    updatedAt;
    course;
    videos;
    quizzes;
    essayExercises;
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lesson.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.lessons),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.Course)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => video_entity_1.Video, (video) => video.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "videos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => essay_exercise_entity_1.EssayExercise, (exercise) => exercise.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "essayExercises", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lessons')
], Lesson);
//# sourceMappingURL=lesson.entity.js.map