import { CoursesService, CreateCourseDto, UpdateCourseDto } from './courses.service';
import { GradeLevel } from '../users/entities/user.entity';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    findAll(gradeLevel?: GradeLevel, teacherId?: string): Promise<import("./entities/course.entity").Course[]>;
    findAllForAdmin(): Promise<import("./entities/course.entity").Course[]>;
    findOne(id: string): Promise<import("./entities/course.entity").Course | null>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./entities/course.entity").Course>;
    publish(id: string): Promise<import("./entities/course.entity").Course>;
    unpublish(id: string): Promise<import("./entities/course.entity").Course>;
    remove(id: string): Promise<void>;
}
