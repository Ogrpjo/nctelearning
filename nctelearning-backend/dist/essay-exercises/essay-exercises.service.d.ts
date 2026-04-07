import { Repository } from 'typeorm';
import { EssayExercise } from './entities/essay-exercise.entity';
import { EssaySubmission } from './entities/essay-submission.entity';
import { GradeLevel } from '../users/entities/user.entity';
export interface CreateEssayExerciseDto {
    lessonId: string;
    title: string;
    prompt: string;
    wordCountMin?: number;
    wordCountMax?: number;
    timeLimitMinutes?: number;
    isPublished?: boolean;
    gradeLevel?: GradeLevel;
    practiceType: 'doc_hieu' | 'viet';
    topic: 'tho' | 'truyen' | 'ki' | 'nghi_luan' | 'thong_tin' | 'nghi_luan_xa_hoi' | 'nghi_luan_van_hoc';
    imageUrl?: string | null;
}
export interface CreateEssaySubmissionDto {
    exerciseId: string;
    userId: string;
    content: string;
    wordCount?: number;
    timeSpentMinutes?: number;
}
export declare class EssayExercisesService {
    private exercisesRepository;
    private submissionsRepository;
    constructor(exercisesRepository: Repository<EssayExercise>, submissionsRepository: Repository<EssaySubmission>);
    createExercise(createExerciseDto: CreateEssayExerciseDto): Promise<EssayExercise>;
    createSubmission(createSubmissionDto: CreateEssaySubmissionDto): Promise<EssaySubmission>;
    findAllExercises(gradeLevel?: '10' | '11' | '12', practiceType?: 'doc_hieu' | 'viet', topic?: string): Promise<EssayExercise[]>;
    findExerciseById(id: string): Promise<EssayExercise | null>;
    findByLesson(lessonId: string): Promise<EssayExercise[]>;
    findByUser(userId: string): Promise<EssaySubmission[]>;
    gradeSubmission(submissionId: string, grade: number, feedback?: string): Promise<EssaySubmission>;
    deleteExercise(id: string): Promise<void>;
}
