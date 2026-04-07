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
exports.QuizQuestionOption = void 0;
const typeorm_1 = require("typeorm");
const quiz_question_entity_1 = require("./quiz-question.entity");
let QuizQuestionOption = class QuizQuestionOption {
    id;
    questionId;
    optionText;
    isCorrect;
    orderIndex;
    createdAt;
    question;
};
exports.QuizQuestionOption = QuizQuestionOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizQuestionOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizQuestionOption.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuizQuestionOption.prototype, "optionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuizQuestionOption.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuizQuestionOption.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestionOption.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_question_entity_1.QuizQuestion, (question) => question.options),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", quiz_question_entity_1.QuizQuestion)
], QuizQuestionOption.prototype, "question", void 0);
exports.QuizQuestionOption = QuizQuestionOption = __decorate([
    (0, typeorm_1.Entity)('quiz_question_options')
], QuizQuestionOption);
//# sourceMappingURL=quiz-question-option.entity.js.map