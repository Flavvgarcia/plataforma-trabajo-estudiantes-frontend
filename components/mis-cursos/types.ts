// ─── Roles ────────────────────────────────────────────────────────────────────
export type UserRole = "alumno" | "admin";

// ─── Alumno ───────────────────────────────────────────────────────────────────
export type LessonStatus = "hecha" | "en_curso" | "pendiente";

export interface Lesson {
  id: string;
  number: number;
  title: string;
  status: LessonStatus;
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  /** id de la opción correcta — se usará cuando el back esté listo */
  correctOptionId: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  /** Bloque de código de ejemplo (opcional) */
  codeExample?: string;
  /** Pregunta del cuestionario asociada a esta lección */
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  /** Mínimo de aciertos para ganar insignia (0–100) */
  passingScore: number;
}

export interface CourseProgress {
  courseTitle: string;
  currentLesson: number;
  totalLessons: number;
  progressPercent: number;
  lessons: Lesson[];
}

export interface AlumnoData {
  user: {
    initials: string;
    fullName: string;
    role: string;
  };
  activeLesson: CourseLesson;
  progress: CourseProgress;
  /** Aviso de IA — siempre visible */
  aiNotice: {
    message: string;
    reportLabel: string;
  };
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export type CourseStatus = "publicado" | "en_revision" | "borrador";

export interface CourseRow {
  id: string;
  name: string;
  enrolledCount: number;
  approvalPercent: number;
  reportCount: number;
  status: CourseStatus;
}

export interface ErrorReport {
  id: string;
  title: string;
  description: string;
  courseName: string;
  lessonRef: string;
}

export interface AdminKPIs {
  generatedCourses: number;
  avgApprovalPercent: number;
  reportedErrors: number;
  firstLessonLoadSeconds: number;
}

export interface AdminData {
  kpis: AdminKPIs;
  courses: CourseRow[];
  errorReports: ErrorReport[];
  aiNotice: {
    message: string;
    reportLabel: string;
  };
}
