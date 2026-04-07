import { Lesson } from '../../lessons/entities/lesson.entity';
import { GradeLevel } from '../../users/entities/user.entity';
export declare class Video {
    id: string;
    lessonId: string | null;
    gradeLevel: GradeLevel;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    durationSeconds: number;
    fileSizeMb: number;
    createdAt: Date;
    updatedAt: Date;
    lesson: Lesson;
    get durationFormatted(): string;
}
