import { VideosService, CreateVideoDto, UpdateVideoDto } from './videos.service';
import { Video } from './entities/video.entity';
import { User } from '../users/entities/user.entity';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
    }>;
    create(file: any, createVideoDto: CreateVideoDto): Promise<Video>;
    stream(id: string, res: any, req: any): Promise<void>;
    findAll(user: User, lessonId?: string): Promise<Video[]>;
    findOne(id: string, user: User): Promise<Video>;
    update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video>;
    remove(id: string): Promise<void>;
}
