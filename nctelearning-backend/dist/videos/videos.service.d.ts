import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { User, GradeLevel } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
export interface CreateVideoDto {
    lessonId?: string;
    gradeLevel: GradeLevel;
    title: string;
    description?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    fileSizeMb?: number;
}
export interface UpdateVideoDto {
    title?: string;
    description?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    fileSizeMb?: number;
    gradeLevel?: GradeLevel;
}
export declare class VideosService {
    private videosRepository;
    private coursesRepository;
    private lessonsRepository;
    constructor(videosRepository: Repository<Video>, coursesRepository: Repository<Course>, lessonsRepository: Repository<Lesson>);
    create(createVideoDto: CreateVideoDto): Promise<Video>;
    createWithFile(file: any, createVideoDto: CreateVideoDto): Promise<Video>;
    findAll(): Promise<Video[]>;
    findAllForUser(user: User): Promise<Video[]>;
    findById(id: string): Promise<Video | null>;
    findByIdForUser(id: string, user: User): Promise<Video | null>;
    canUserAccessVideo(video: Video, user: User): Promise<boolean>;
    findByLesson(lessonId: string): Promise<Video[]>;
    update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video>;
    remove(id: string): Promise<void>;
}
