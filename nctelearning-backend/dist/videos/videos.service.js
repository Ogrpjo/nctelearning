"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("./entities/video.entity");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
let VideosService = class VideosService {
    videosRepository;
    coursesRepository;
    lessonsRepository;
    constructor(videosRepository, coursesRepository, lessonsRepository) {
        this.videosRepository = videosRepository;
        this.coursesRepository = coursesRepository;
        this.lessonsRepository = lessonsRepository;
    }
    async create(createVideoDto) {
        try {
            console.log(`Creating video for grade level: ${createVideoDto.gradeLevel}`);
            if (!createVideoDto.gradeLevel) {
                throw new common_1.NotFoundException('Grade level is required');
            }
            const video = this.videosRepository.create({
                ...createVideoDto,
                lessonId: createVideoDto.lessonId || null
            });
            return await this.videosRepository.save(video);
        }
        catch (error) {
            console.error('Error in create video:', error);
            throw error;
        }
    }
    async createWithFile(file, createVideoDto) {
        try {
            console.log('Starting createWithFile with data:', {
                fileName: file?.originalname,
                fileSize: file?.size,
                title: createVideoDto.title,
                gradeLevel: createVideoDto.gradeLevel,
                lessonId: createVideoDto.lessonId
            });
            const savedFilePath = file.path;
            const savedFileName = file.filename;
            const fileSizeMb = file.size / (1024 * 1024);
            const videoData = {
                ...createVideoDto,
                videoUrl: `/uploads/videos/${savedFileName}`,
                fileSizeMb: Math.round(fileSizeMb * 100) / 100,
            };
            console.log('Calling create method with videoData:', videoData);
            const video = await this.create(videoData);
            console.log('Video created successfully:', video.id);
            return video;
        }
        catch (error) {
            console.error('Error in createWithFile:', error);
            throw error;
        }
    }
    async findAll() {
        return this.videosRepository.find({
            relations: ['lesson', 'lesson.course'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAllForUser(user) {
        const query = this.videosRepository
            .createQueryBuilder('video')
            .leftJoinAndSelect('video.lesson', 'lesson')
            .leftJoinAndSelect('lesson.course', 'course')
            .orderBy('video.createdAt', 'DESC');
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return query.getMany();
        }
        if (user.gradeLevel) {
            query.andWhere('video.gradeLevel = :gradeLevel', { gradeLevel: user.gradeLevel });
        }
        else {
            return [];
        }
        return query.getMany();
    }
    async findById(id) {
        return this.videosRepository.findOne({
            where: { id },
            relations: ['lesson', 'lesson.course'],
        });
    }
    async findByIdForUser(id, user) {
        const video = await this.findById(id);
        if (!video) {
            return null;
        }
        if (await this.canUserAccessVideo(video, user)) {
            return video;
        }
        return null;
    }
    async canUserAccessVideo(video, user) {
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return true;
        }
        if (!user.gradeLevel || !video.gradeLevel) {
            return false;
        }
        return user.gradeLevel === video.gradeLevel;
    }
    async findByLesson(lessonId) {
        return this.videosRepository.find({
            where: { lessonId },
            relations: ['lesson', 'lesson.course'],
            order: { createdAt: 'ASC' },
        });
    }
    async update(id, updateVideoDto) {
        const video = await this.findById(id);
        if (!video) {
            throw new common_1.NotFoundException('Không tìm thấy video');
        }
        Object.assign(video, updateVideoDto);
        return this.videosRepository.save(video);
    }
    async remove(id) {
        const result = await this.videosRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Không tìm thấy video');
        }
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VideosService);
//# sourceMappingURL=videos.service.js.map