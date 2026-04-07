import { LessonsService, CreateLessonDto, UpdateLessonDto } from './lessons.service';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<import("./entities/lesson.entity").Lesson>;
    findAll(courseId?: string): Promise<import("./entities/lesson.entity").Lesson[]>;
    findOne(id: string): Promise<import("./entities/lesson.entity").Lesson | null>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<import("./entities/lesson.entity").Lesson>;
    remove(id: string): Promise<void>;
}
