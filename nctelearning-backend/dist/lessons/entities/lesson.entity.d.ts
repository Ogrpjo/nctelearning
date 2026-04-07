import { Course } from '../../courses/entities/course.entity';
import { Video } from '../../videos/entities/video.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { EssayExercise } from '../../essay-exercises/entities/essay-exercise.entity';
export declare class Lesson {
    id: string;
    courseId: string;
    title: string;
    description: string;
    orderIndex: number;
    durationMinutes: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    course: Course;
    videos: Video[];
    quizzes: Quiz[];
    essayExercises: EssayExercise[];
}
