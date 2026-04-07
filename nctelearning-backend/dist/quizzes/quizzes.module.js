"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quizzes_service_1 = require("./quizzes.service");
const quizzes_controller_1 = require("./quizzes.controller");
const quiz_entity_1 = require("./entities/quiz.entity");
const quiz_question_entity_1 = require("./entities/quiz-question.entity");
const quiz_question_option_entity_1 = require("./entities/quiz-question-option.entity");
const quiz_attempt_entity_1 = require("./entities/quiz-attempt.entity");
const quiz_attempt_answer_entity_1 = require("./entities/quiz-attempt-answer.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
let QuizzesModule = class QuizzesModule {
};
exports.QuizzesModule = QuizzesModule;
exports.QuizzesModule = QuizzesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                quiz_entity_1.Quiz,
                quiz_question_entity_1.QuizQuestion,
                quiz_question_option_entity_1.QuizQuestionOption,
                quiz_attempt_entity_1.QuizAttempt,
                quiz_attempt_answer_entity_1.QuizAttemptAnswer,
                lesson_entity_1.Lesson,
            ]),
        ],
        controllers: [quizzes_controller_1.QuizzesController],
        providers: [quizzes_service_1.QuizzesService],
        exports: [quizzes_service_1.QuizzesService],
    })
], QuizzesModule);
//# sourceMappingURL=quizzes.module.js.map