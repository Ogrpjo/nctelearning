import { Lesson } from '../../lessons/entities/lesson.entity';
import { GradeLevel } from '../../users/entities/user.entity';
import { EssaySubmission } from './essay-submission.entity';
export declare class EssayExercise {
    id: string;
    lessonId: string | null;
    gradeLevel: GradeLevel | null;
    title: string;
    prompt: string;
    wordCountMin: number;
    wordCountMax: number;
    timeLimitMinutes: number;
    isPublished: boolean;
    practiceType: 'doc_hieu' | 'viet';
    topic: 'tho' | 'truyen' | 'ki' | 'nghi_luan' | 'thong_tin' | 'nghi_luan_xa_hoi' | 'nghi_luan_van_hoc';
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    lesson: Lesson | null;
    submissions: EssaySubmission[];
    get wordCountRange(): string;
    get timeLimitFormatted(): string;
}
