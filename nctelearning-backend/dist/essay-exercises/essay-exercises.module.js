"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const essay_exercises_service_1 = require("./essay-exercises.service");
const essay_exercises_controller_1 = require("./essay-exercises.controller");
const essay_exercise_entity_1 = require("./entities/essay-exercise.entity");
const essay_submission_entity_1 = require("./entities/essay-submission.entity");
let EssayExercisesModule = class EssayExercisesModule {
};
exports.EssayExercisesModule = EssayExercisesModule;
exports.EssayExercisesModule = EssayExercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([essay_exercise_entity_1.EssayExercise, essay_submission_entity_1.EssaySubmission])],
        controllers: [essay_exercises_controller_1.EssayExercisesController],
        providers: [essay_exercises_service_1.EssayExercisesService],
        exports: [essay_exercises_service_1.EssayExercisesService],
    })
], EssayExercisesModule);
//# sourceMappingURL=essay-exercises.module.js.map