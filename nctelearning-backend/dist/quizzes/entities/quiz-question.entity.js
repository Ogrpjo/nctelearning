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
exports.QuizQuestion = exports.QuestionType = void 0;
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
const quiz_question_option_entity_1 = require("./quiz-question-option.entity");
const quiz_attempt_answer_entity_1 = require("./quiz-attempt-answer.entity");
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTIPLE_CHOICE"] = "multiple_choice";
    QuestionType["ESSAY"] = "essay";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
let QuizQuestion = class QuizQuestion {
    id;
    quizId;
    questionText;
    questionType;
    orderIndex;
    points;
    createdAt;
    updatedAt;
    quiz;
    options;
    attemptAnswers;
    get correctOption() {
        return this.options?.find(option => option.isCorrect);
    }
    isMultipleChoice() {
        return this.questionType === QuestionType.MULTIPLE_CHOICE;
    }
    isEssay() {
        return this.questionType === QuestionType.ESSAY;
    }
};
exports.QuizQuestion = QuizQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizQuestion.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: QuestionType.MULTIPLE_CHOICE,
    }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1 }),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.questions),
    (0, typeorm_1.JoinColumn)({ name: 'quizId' }),
    __metadata("design:type", quiz_entity_1.Quiz)
], QuizQuestion.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_question_option_entity_1.QuizQuestionOption, (option) => option.question),
    __metadata("design:type", Array)
], QuizQuestion.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_answer_entity_1.QuizAttemptAnswer, (answer) => answer.question),
    __metadata("design:type", Array)
], QuizQuestion.prototype, "attemptAnswers", void 0);
exports.QuizQuestion = QuizQuestion = __decorate([
    (0, typeorm_1.Entity)('quiz_questions')
], QuizQuestion);
//# sourceMappingURL=quiz-question.entity.js.map