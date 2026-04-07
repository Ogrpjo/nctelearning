import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { GradeLevel } from '../users/entities/user.entity';
export interface CreateCourseDto {
    title: string;
    description?: string;
    gradeLevel: GradeLevel;
    thumbnailUrl?: string;
    createdById: string;
    isPublished?: boolean;
}
export interface UpdateCourseDto {
    title?: string;
    description?: string;
    gradeLevel?: GradeLevel;
    thumbnailUrl?: string;
    isPublished?: boolean;
}
export declare class CoursesService {
    private coursesRepository;
    constructor(coursesRepository: Repository<Course>);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findById(id: string): Promise<Course | null>;
    findByGradeLevel(gradeLevel: GradeLevel): Promise<Course[]>;
    findByTeacher(teacherId: string): Promise<Course[]>;
    findPublished(): Promise<Course[]>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<void>;
    publish(id: string): Promise<Course>;
    unpublish(id: string): Promise<Course>;
}
