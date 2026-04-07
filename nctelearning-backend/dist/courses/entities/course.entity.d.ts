import { User, GradeLevel } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
export declare class Course {
    id: string;
    title: string;
    description: string;
    gradeLevel: GradeLevel;
    thumbnailUrl: string;
    createdById: string;
    createdBy: User;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    lessons: Lesson[];
}
