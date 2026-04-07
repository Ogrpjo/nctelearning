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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
let CoursesService = class CoursesService {
    coursesRepository;
    constructor(coursesRepository) {
        this.coursesRepository = coursesRepository;
    }
    async create(createCourseDto) {
        const course = this.coursesRepository.create(createCourseDto);
        return this.coursesRepository.save(course);
    }
    async findAll() {
        try {
            try {
                return this.coursesRepository.find({
                    relations: ['createdBy', 'lessons'],
                    order: { createdAt: 'DESC' },
                });
            }
            catch (relationError) {
                console.warn('Failed to load with relations, trying without:', relationError);
                return this.coursesRepository.find({
                    relations: ['lessons'],
                    order: { createdAt: 'DESC' },
                });
            }
        }
        catch (error) {
            console.error('Error in findAll courses:', error);
            throw error;
        }
    }
    async findById(id) {
        return this.coursesRepository.findOne({
            where: { id },
            relations: ['createdBy', 'lessons'],
        });
    }
    async findByGradeLevel(gradeLevel) {
        return this.coursesRepository.find({
            where: { gradeLevel, isPublished: true },
            relations: ['createdBy', 'lessons'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByTeacher(teacherId) {
        return this.coursesRepository.find({
            where: { createdById: teacherId },
            relations: ['createdBy', 'lessons'],
            order: { createdAt: 'DESC' },
        });
    }
    async findPublished() {
        return this.coursesRepository.find({
            where: { isPublished: true },
            relations: ['createdBy', 'lessons'],
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, updateCourseDto) {
        const course = await this.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Không tìm thấy khóa học');
        }
        Object.assign(course, updateCourseDto);
        return this.coursesRepository.save(course);
    }
    async remove(id) {
        const result = await this.coursesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Không tìm thấy khóa học');
        }
    }
    async publish(id) {
        return this.update(id, { isPublished: true });
    }
    async unpublish(id) {
        return this.update(id, { isPublished: false });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map