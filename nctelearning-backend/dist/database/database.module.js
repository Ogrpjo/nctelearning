"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
const video_entity_1 = require("../videos/entities/video.entity");
const quiz_entity_1 = require("../quizzes/entities/quiz.entity");
const quiz_question_entity_1 = require("../quizzes/entities/quiz-question.entity");
const quiz_question_option_entity_1 = require("../quizzes/entities/quiz-question-option.entity");
const quiz_attempt_entity_1 = require("../quizzes/entities/quiz-attempt.entity");
const quiz_attempt_answer_entity_1 = require("../quizzes/entities/quiz-attempt-answer.entity");
const essay_exercise_entity_1 = require("../essay-exercises/entities/essay-exercise.entity");
const essay_submission_entity_1 = require("../essay-exercises/entities/essay-submission.entity");
const user_progress_entity_1 = require("../user-progress/entities/user-progress.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const dbType = configService.get('DATABASE_TYPE') || 'postgres';
                    const entities = [
                        user_entity_1.User,
                        course_entity_1.Course,
                        lesson_entity_1.Lesson,
                        video_entity_1.Video,
                        quiz_entity_1.Quiz,
                        quiz_question_entity_1.QuizQuestion,
                        quiz_question_option_entity_1.QuizQuestionOption,
                        quiz_attempt_entity_1.QuizAttempt,
                        quiz_attempt_answer_entity_1.QuizAttemptAnswer,
                        essay_exercise_entity_1.EssayExercise,
                        essay_submission_entity_1.EssaySubmission,
                        user_progress_entity_1.UserProgress,
                    ];
                    if (dbType === 'sqlite') {
                        return {
                            type: 'sqlite',
                            database: configService.get('DATABASE_NAME') || 'database.sqlite',
                            entities,
                            synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true' || configService.get('NODE_ENV') === 'development',
                            logging: configService.get('NODE_ENV') === 'development',
                        };
                    }
                    return {
                        type: 'postgres',
                        host: configService.get('DATABASE_HOST'),
                        port: configService.get('DATABASE_PORT'),
                        username: configService.get('DATABASE_USER'),
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_NAME'),
                        ssl: configService.get('DATABASE_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
                        entities,
                        synchronize: false,
                        logging: configService.get('NODE_ENV') === 'development',
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map