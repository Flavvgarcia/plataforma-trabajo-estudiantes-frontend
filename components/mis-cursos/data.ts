/**
 * Datos mock para "Mis Cursos".
 * Reemplazar las funciones de este archivo por llamadas reales a la API
 * usando `process.env.NEXT_PUBLIC_API_URL` cuando el backend esté listo.
 *
 * Ejemplo de migración:
 *   export async function getAlumnoData(): Promise<AlumnoData> {
 *     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/alumno`);
 *     if (!res.ok) throw new Error("Error al cargar datos del alumno");
 *     return res.json();
 *   }
 */

import type { AdminData, AlumnoData } from "./types";

// ─── Vista Alumno ─────────────────────────────────────────────────────────────
export const ALUMNO_MOCK: AlumnoData = {
  user: {
    initials: "MF",
    fullName: "María Fernanda",
    role: "Estudiante",
  },
  aiNotice: {
    message: "Este contenido fue generado por IA.",
    reportLabel: "Reportar error",
  },
  activeLesson: {
    id: "lesson-2",
    title: "Tipos básicos",
    description:
      "En TypeScript indicas el tipo de cada variable. Así detectas errores antes de ejecutar tu código.",
    codeExample: `let edad: number = 21;\nedad = "veintiuno"; // error`,
    currentQuestion: 1,
    totalQuestions: 4,
    passingScore: 80,
    question: {
      id: "q1",
      text: "¿Qué tipo tiene el valor true?",
      options: [
        { id: "opt-string", label: "string" },
        { id: "opt-boolean", label: "boolean" },
        { id: "opt-number", label: "number" },
        { id: "opt-any", label: "any" },
      ],
      correctOptionId: "opt-boolean",
    },
  },
  progress: {
    courseTitle: "TypeScript básico",
    currentLesson: 2,
    totalLessons: 5,
    progressPercent: 40,
    lessons: [
      { id: "l1", number: 1, title: "Qué es TypeScript", status: "hecha" },
      { id: "l2", number: 2, title: "Tipos básicos", status: "en_curso" },
      { id: "l3", number: 3, title: "Funciones", status: "pendiente" },
      { id: "l4", number: 4, title: "Interfaces", status: "pendiente" },
      { id: "l5", number: 5, title: "Proyecto final", status: "pendiente" },
    ],
  },
};

// ─── Vista Admin ──────────────────────────────────────────────────────────────
export const ADMIN_MOCK: AdminData = {
  kpis: {
    generatedCourses: 1240,
    avgApprovalPercent: 71,
    reportedErrors: 3,
    firstLessonLoadSeconds: 14,
  },
  aiNotice: {
    message:
      "Los cursos regenerados mantienen el aviso permanente de contenido generado por IA.",
    reportLabel: "Reportar error",
  },
  courses: [
    {
      id: "c1",
      name: "TypeScript básico",
      enrolledCount: 320,
      approvalPercent: 88,
      reportCount: 1,
      status: "publicado",
    },
    {
      id: "c2",
      name: "React avanzado",
      enrolledCount: 280,
      approvalPercent: 82,
      reportCount: 0,
      status: "publicado",
    },
    {
      id: "c3",
      name: "SQL esencial",
      enrolledCount: 410,
      approvalPercent: 74,
      reportCount: 2,
      status: "en_revision",
    },
    {
      id: "c4",
      name: "Git en equipo",
      enrolledCount: 150,
      approvalPercent: 69,
      reportCount: 0,
      status: "publicado",
    },
    {
      id: "c5",
      name: "Python para datos",
      enrolledCount: 80,
      approvalPercent: 91,
      reportCount: 0,
      status: "publicado",
    },
  ],
  errorReports: [
    {
      id: "e1",
      title: "Pregunta con dos respuestas correctas",
      description: "Curso SQL esencial · lección 3",
      courseName: "SQL esencial",
      lessonRef: "lección 3",
    },
    {
      id: "e2",
      title: "Explicación incompleta",
      description: "Curso TypeScript básico · lección 2",
      courseName: "TypeScript básico",
      lessonRef: "lección 2",
    },
  ],
};
