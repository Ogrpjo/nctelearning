"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const videos_service_1 = require("./videos.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_entity_2 = require("../users/entities/user.entity");
const multer_1 = require("multer");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let VideosController = class VideosController {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    async healthCheck() {
        try {
            return { status: 'ok', timestamp: new Date().toISOString() };
        }
        catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
    async create(file, createVideoDto) {
        try {
            console.log('Video upload request received:', {
                fileName: file?.originalname,
                fileSize: file?.size,
                title: createVideoDto.title,
                gradeLevel: createVideoDto.gradeLevel,
                lessonId: createVideoDto.lessonId,
                bodyKeys: Object.keys(createVideoDto)
            });
            if (!file) {
                console.error('No file uploaded');
                throw new common_1.BadRequestException('Video file is required');
            }
            if (!file.mimetype.startsWith('video/')) {
                console.error('Invalid file type:', file.mimetype);
                throw new common_1.BadRequestException('File must be a video');
            }
            if (!Number.isFinite(file.size) || file.size <= 0) {
                throw new common_1.BadRequestException('Tệp tin không hợp lệ');
            }
            if (!createVideoDto.title) {
                console.error('Missing title');
                throw new common_1.BadRequestException('Title is required');
            }
            if (!createVideoDto.gradeLevel) {
                console.error('Missing gradeLevel');
                throw new common_1.BadRequestException('Grade level is required');
            }
            console.log('Starting video creation process...');
            const result = await this.videosService.createWithFile(file, createVideoDto);
            console.log('Video created successfully:', result.id);
            return result;
        }
        catch (error) {
            console.error('Error in video upload:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
    async stream(id, res, req) {
        const video = await this.videosService.findById(id);
        if (!video || !video.videoUrl) {
            res.status(common_1.HttpStatus.NOT_FOUND).send('Video not found');
            return;
        }
        const absolutePath = path.join(process.cwd(), video.videoUrl.startsWith('/') ? video.videoUrl.substring(1) : video.videoUrl);
        if (!fs.existsSync(absolutePath)) {
            res.status(common_1.HttpStatus.NOT_FOUND).send('File not found');
            return;
        }
        const stat = fs.statSync(absolutePath);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            const file = fs.createReadStream(absolutePath, { start, end });
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            });
            file.pipe(res);
        }
        else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
            });
            fs.createReadStream(absolutePath).pipe(res);
        }
    }
    async findAll(user, lessonId) {
        if (lessonId) {
            const videos = await this.videosService.findByLesson(lessonId);
            const accessibleVideos = [];
            for (const video of videos) {
                if (await this.videosService.canUserAccessVideo(video, user)) {
                    accessibleVideos.push(video);
                }
            }
            return accessibleVideos;
        }
        return this.videosService.findAllForUser(user);
    }
    async findOne(id, user) {
        const video = await this.videosService.findByIdForUser(id, user);
        if (!video) {
            throw new common_1.ForbiddenException('Bạn không có quyền truy cập video này');
        }
        return video;
    }
    update(id, updateVideoDto) {
        return this.videosService.update(id, updateVideoDto);
    }
    remove(id) {
        return this.videosService.remove(id);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const uploadsDir = path.join(process.cwd(), 'uploads', 'videos');
                if (!fs.existsSync(uploadsDir))
                    fs.mkdirSync(uploadsDir, { recursive: true });
                cb(null, uploadsDir);
            },
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname);
                const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
                cb(null, name);
            },
        }),
        limits: {
            fileSize: 4 * 1024 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('stream/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "stream", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_2.User, String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_2.User]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "remove", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map