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
exports.QuizAttemptAnswer = void 0;
const typeorm_1 = require("typeorm");
const quiz_attempt_entity_1 = require("./quiz-attempt.entity");
const quiz_question_entity_1 = require("./quiz-question.entity");
const quiz_question_option_entity_1 = require("./quiz-question-option.entity");
let QuizAttemptAnswer = class QuizAttemptAnswer {
    id;
    attemptId;
    questionId;
    selectedOptionId;
    answerText;
    isCorrect;
    pointsEarned;
    feedback;
    createdAt;
    attempt;
    question;
    selectedOption;
};
exports.QuizAttemptAnswer = QuizAttemptAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "selectedOptionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "answerText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], QuizAttemptAnswer.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], QuizAttemptAnswer.prototype, "pointsEarned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuizAttemptAnswer.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttemptAnswer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_attempt_entity_1.QuizAttempt, (attempt) => attempt.answers),
    (0, typeorm_1.JoinColumn)({ name: 'attemptId' }),
    __metadata("design:type", quiz_attempt_entity_1.QuizAttempt)
], QuizAttemptAnswer.prototype, "attempt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_question_entity_1.QuizQuestion, (question) => question.attemptAnswers),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", quiz_question_entity_1.QuizQuestion)
], QuizAttemptAnswer.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_question_option_entity_1.QuizQuestionOption),
    (0, typeorm_1.JoinColumn)({ name: 'selectedOptionId' }),
    __metadata("design:type", quiz_question_option_entity_1.QuizQuestionOption)
], QuizAttemptAnswer.prototype, "selectedOption", void 0);
exports.QuizAttemptAnswer = QuizAttemptAnswer = __decorate([
    (0, typeorm_1.Entity)('quiz_attempt_answers')
], QuizAttemptAnswer);
//# sourceMappingURL=quiz-attempt-answer.entity.js.map