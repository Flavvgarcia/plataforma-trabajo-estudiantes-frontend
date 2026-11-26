"use client";

import { useState } from "react";
import type { AlumnoData, LessonStatus } from "./types";
import { AiBanner } from "./AiBanner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABEL: Record<LessonStatus, string> = {
  hecha: "Hecha",
  en_curso: "En curso",
  pendiente: "Pendiente",
};

const STATUS_CLASSES: Record<LessonStatus, string> = {
  hecha: "bg-[#EEEDFC] text-[#2E2785]",
  en_curso: "bg-[#EEEDFC] text-[#2E2785]",
  pendiente: "bg-[#EEEDFC] text-[#2E2785]",
};

// ─── Componente ───────────────────────────────────────────────────────────────
interface AlumnoViewProps {
  data: AlumnoData;
}

/**
 * Vista de alumno para "Mis Cursos".
 * Muestra: aviso IA · lección activa con código · cuestionario interactivo · panel de ruta.
 */
export function AlumnoView({ data }: AlumnoViewProps) {
  const { activeLesson, progress, aiNotice } = data;

  // Estado interactivo del formulario de cuestionario
  const [selectedOption, setSelectedOption] = useState<string>("opt-boolean");
  const [feedback, setFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    if (feedback.status !== "idle") {
      setFeedback({ status: "idle", message: "" });
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    if (selectedOption === activeLesson.question.correctOptionId) {
      setFeedback({
        status: "correct",
        message: "¡Correcto! En TypeScript 'true' y 'false' pertenecen al tipo boolean.",
      });
    } else {
      setFeedback({
        status: "incorrect",
        message: "Respuesta incorrecta. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <main className="flex-1 min-w-0 p-6 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-[28px] font-bold text-[#12122B]"
          style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
        >
          Curso con IA
        </h1>
      </div>

      {/* Layout de dos columnas */}
      <div className="flex gap-6 items-start">
        {/* Columna principal */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">

          {/* Aviso IA — alineado junto con la lección y cuestionario */}
          <AiBanner
            message={aiNotice.message}
            reportLabel={aiNotice.reportLabel}
            onReport={() => alert("Reportar error enviado para revisión.")}
          />

          {/* Card de lección activa */}
          <section
            aria-label="Lección activa"
            className="bg-white border border-[#E4E3F1] rounded-xl p-6"
          >
            <h2
              className="text-[20px] font-bold text-[#12122B] mb-3"
              style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
            >
              {activeLesson.title}
            </h2>
            <p className="text-[16px] text-[#12122B] mb-4">{activeLesson.description}</p>

            {/* Bloque de código */}
            {activeLesson.codeExample && (
              <pre className="bg-[#12122B] text-[#EEEEFF] text-[13px] font-mono rounded-lg px-5 py-4 overflow-x-auto whitespace-pre-wrap">
                {activeLesson.codeExample}
              </pre>
            )}
          </section>

          {/* Card de cuestionario interactivo */}
          <section
            aria-label="Cuestionario"
            className="bg-white border border-[#E4E3F1] rounded-xl p-6"
          >
            {/* Encabezado */}
            <h2
              className="text-[18px] font-bold text-[#12122B] mb-1"
              style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
            >
              Cuestionario · Pregunta {activeLesson.currentQuestion} de{" "}
              {activeLesson.totalQuestions}
            </h2>
            <p className="text-[13px] text-[#4A4A68] mb-4">
              Necesitas {activeLesson.passingScore} % para la insignia
            </p>

            {/* Pregunta */}
            <p className="text-[16px] font-bold text-[#12122B] mb-4">
              {activeLesson.question.text}
            </p>

            {/* Opciones interactivas accesibles */}
            <div
              className="flex flex-col gap-3 mb-4"
              role="radiogroup"
              aria-label="Opciones de respuesta"
            >
              {activeLesson.question.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3] ${
                      isSelected
                        ? "border-[#3730A3] bg-white shadow-xs"
                        : "border-[#E4E3F1] bg-white hover:border-[#6B6A8A]"
                    }`}
                  >
                    {/* Radio visual */}
                    <span
                      className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-[#3730A3]" : "border-[#6B6A8A]"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#3730A3]" />
                      )}
                    </span>
                    <span className="text-[13px] font-bold text-[#12122B]">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mensaje de retroalimentación interactivo */}
            {feedback.status !== "idle" && (
              <div
                className={`mb-4 p-3 rounded-lg text-[13px] font-medium ${
                  feedback.status === "correct"
                    ? "bg-[#EEF8F0] border border-[#15803D] text-[#14532D]"
                    : "bg-[#FFF8EA] border border-[#B45309] text-[#B45309]"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Botón comprobar — primario */}
            <button
              type="button"
              onClick={handleCheckAnswer}
              className="w-full min-h-[46px] bg-[#3730A3] text-white font-bold text-[15px] rounded-lg hover:bg-[#3730A3]/90 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3] focus-visible:ring-offset-2 cursor-pointer"
            >
              Comprobar respuesta
            </button>
          </section>
        </div>

        {/* Panel derecho — ruta del curso */}
        <aside
          aria-label="Ruta del curso"
          className="hidden xl:flex flex-col w-[320px] shrink-0 bg-white border border-[#E4E3F1] rounded-xl p-6"
        >
          <h3
            className="text-[18px] font-bold text-[#12122B] mb-4"
            style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
          >
            Ruta: {progress.courseTitle}
          </h3>

          {/* Barra de progreso */}
          <div className="mb-1">
            <div className="h-2 bg-[#E4E3F1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3730A3] rounded-full transition-all duration-300"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[13px] text-[#4A4A68] mb-5">
            Lección {progress.currentLesson} de {progress.totalLessons} ·{" "}
            {progress.progressPercent} %
          </p>

          {/* Lista de lecciones */}
          <ol className="flex flex-col gap-3">
            {progress.lessons.map((lesson) => (
              <li key={lesson.id} className="flex items-center justify-between gap-3">
                <span className="text-[16px] text-[#12122B]">
                  {lesson.number} · {lesson.title}
                </span>
                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-bold ${
                    STATUS_CLASSES[lesson.status]
                  }`}
                >
                  {STATUS_LABEL[lesson.status]}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </main>
  );
}
