import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
export interface CreateLessonDto {
    courseId: string;
    title: string;
    description?: string;
    orderIndex: number;
    durationMinutes?: number;
    isPublished?: boolean;
}
export interface UpdateLessonDto {
    title?: string;
    description?: string;
    orderIndex?: number;
    durationMinutes?: number;
    isPublished?: boolean;
}
export declare class LessonsService {
    private lessonsRepository;
    constructor(lessonsRepository: Repository<Lesson>);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    findById(id: string): Promise<Lesson | null>;
    findByCourse(courseId: string): Promise<Lesson[]>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: string): Promise<void>;
}
