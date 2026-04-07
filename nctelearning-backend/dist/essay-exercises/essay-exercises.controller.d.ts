import { EssayExercisesService, CreateEssayExerciseDto, CreateEssaySubmissionDto } from './essay-exercises.service';
import { User } from '../users/entities/user.entity';
export declare class EssayExercisesController {
    private readonly essayExercisesService;
    constructor(essayExercisesService: EssayExercisesService);
    createExercise(createExerciseDto?: CreateEssayExerciseDto): Promise<import("./entities/essay-exercise.entity").EssayExercise>;
    createSubmission(createSubmissionDto: CreateEssaySubmissionDto, req: any): Promise<import("./entities/essay-submission.entity").EssaySubmission>;
    findAll(lessonId?: string, gradeLevel?: '10' | '11' | '12', practiceType?: 'doc_hieu' | 'viet', topic?: string): Promise<import("./entities/essay-exercise.entity").EssayExercise[]>;
    findSubmissions(userId: string): Promise<import("./entities/essay-submission.entity").EssaySubmission[]>;
    getMySubmissions(user: User): Promise<import("./entities/essay-submission.entity").EssaySubmission[]>;
    findOne(id: string): Promise<import("./entities/essay-exercise.entity").EssayExercise | null>;
    gradeSubmission(id: string, body: {
        grade: number;
        feedback?: string;
    }): Promise<import("./entities/essay-submission.entity").EssaySubmission>;
    remove(id: string): Promise<void>;
}
