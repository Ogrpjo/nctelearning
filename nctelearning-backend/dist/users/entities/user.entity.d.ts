import { Course } from '../../courses/entities/course.entity';
import { QuizAttempt } from '../../quizzes/entities/quiz-attempt.entity';
import { EssaySubmission } from '../../essay-exercises/entities/essay-submission.entity';
import { UserProgress } from '../../user-progress/entities/user-progress.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare enum GradeLevel {
    GRADE_10 = "10",
    GRADE_11 = "11",
    GRADE_12 = "12"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    gradeLevel: GradeLevel;
    avatarUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    courses: Course[];
    quizAttempts: QuizAttempt[];
    essaySubmissions: EssaySubmission[];
    progress: UserProgress[];
    get fullName(): string;
    isAdmin(): boolean;
    isStudent(): boolean;
}
