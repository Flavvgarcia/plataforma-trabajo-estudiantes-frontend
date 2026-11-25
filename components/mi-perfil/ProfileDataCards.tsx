"use client";

import { useState } from "react";
import type { EducationInfo, ExperienceInfo, LanguageItem } from "./types";

interface ProfileDataCardsProps {
  education: EducationInfo;
  experience: ExperienceInfo;
  skills: string[];
  languages: LanguageItem[];
  onUpdateEducation: (next: EducationInfo) => void;
  onUpdateExperience: (next: ExperienceInfo) => void;
  onUpdateSkills: (next: string[]) => void;
  onUpdateLanguages: (next: LanguageItem[]) => void;
}

export function ProfileDataCards({
  education,
  experience,
  skills,
  languages,
  onUpdateEducation,
  onUpdateExperience,
  onUpdateSkills,
  onUpdateLanguages,
}: ProfileDataCardsProps) {
  const [editingEducation, setEditingEducation] = useState(false);
  const [eduDraft, setEduDraft] = useState<EducationInfo>(education);
  const [eduError, setEduError] = useState<string | null>(null);

  const [editingExperience, setEditingExperience] = useState(false);
  const [expDraft, setExpDraft] = useState<ExperienceInfo>(experience);
  const [expError, setExpError] = useState<string | null>(null);

  const [addingSkill, setAddingSkill] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [editingLanguages, setEditingLanguages] = useState(false);
  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("");

  const openEducationEditor = () => {
    setEduDraft(education);
    setEduError(null);
    setEditingEducation(true);
  };

  const saveEducation = (event: React.FormEvent) => {
    event.preventDefault();
    const inst = eduDraft.institution.trim();
    const prog = eduDraft.program.trim();
    const sem = eduDraft.semester.trim();
    if (!inst) {
      setEduError("Por favor ingresa la institución educativa.");
      return;
    }
    if (!prog) {
      setEduError("Por favor ingresa la carrera o programa.");
      return;
    }
    if (!sem) {
      setEduError("Por favor ingresa el semestre.");
      return;
    }
    setEduError(null);
    onUpdateEducation({
      institution: inst,
      program: prog,
      semester: sem,
    });
    setEditingEducation(false);
  };

  const openExperienceEditor = () => {
    setExpDraft(experience);
    setExpError(null);
    setEditingExperience(true);
  };

  const saveExperience = (event: React.FormEvent) => {
    event.preventDefault();
    const title = expDraft.title.trim();
    const period = expDraft.period.trim();
    const location = expDraft.location.trim();
    if (!title) {
      setExpError("Por favor ingresa el puesto o experiencia.");
      return;
    }
    if (!period) {
      setExpError("Por favor ingresa el periodo (ej. Ene – Jun 2026).");
      return;
    }
    if (!location) {
      setExpError("Por favor ingresa la ubicación (ej. Morelia).");
      return;
    }
    setExpError(null);
    onUpdateExperience({
      title,
      period,
      location,
    });
    setEditingExperience(false);
  };

  const handleAddSkill = (event: React.FormEvent) => {
    event.preventDefault();
    const cleaned = skillInput.trim();
    if (!cleaned) return;
    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === cleaned.toLowerCase()
    );
    if (!alreadyExists) {
      onUpdateSkills([...skills, cleaned]);
    }
    setSkillInput("");
    setAddingSkill(false);
  };

  const handleRemoveSkill = (target: string) => {
    onUpdateSkills(skills.filter((item) => item !== target));
  };

  const handleAddLanguage = (event: React.FormEvent) => {
    event.preventDefault();
    const name = langName.trim();
    const level = langLevel.trim() || "Básico";
    if (!name) return;
    onUpdateLanguages([
      ...languages,
      { id: `${name.toLowerCase()}-${Date.now()}`, name, level },
    ]);
    setLangName("");
    setLangLevel("");
  };

  const handleRemoveLanguage = (id: string) => {
    onUpdateLanguages(languages.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* ESTUDIOS */}
      <section className="bg-white border border-[#E4E3F1] rounded-2xl p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-normal uppercase tracking-wide text-[#4A4A68]">
            ESTUDIOS
          </h3>
          {!editingEducation ? (
            <button
              type="button"
              onClick={openEducationEditor}
              className="text-[13px] font-bold text-[#3730A3] hover:underline cursor-pointer px-1 py-0.5"
            >
              Editar
            </button>
          ) : null}
        </div>

        {editingEducation ? (
          <form onSubmit={saveEducation} className="mt-3 space-y-2.5">
            <input
              type="text"
              value={eduDraft.institution}
              onChange={(event) =>
                setEduDraft({ ...eduDraft, institution: event.target.value })
              }
              aria-label="Institución educativa"
              placeholder="Institución"
              className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={eduDraft.program}
                onChange={(event) =>
                  setEduDraft({ ...eduDraft, program: event.target.value })
                }
                aria-label="Carrera o programa"
                placeholder="Carrera"
                className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
              />
              <input
                type="text"
                value={eduDraft.semester}
                onChange={(event) =>
                  setEduDraft({ ...eduDraft, semester: event.target.value })
                }
                aria-label="Semestre actual"
                placeholder="Semestre"
                className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
              />
            </div>
            {eduError ? (
              <p role="alert" className="text-[12px] font-medium text-[#B42318]">
                {eduError}
              </p>
            ) : null}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingEducation(false)}
                className="min-h-[36px] px-3 rounded-lg border border-[#E4E3F1] text-[13px] font-bold text-[#4A4A68] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="min-h-[36px] px-4 rounded-lg bg-[#3730A3] text-[13px] font-bold text-white cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-2">
            <p className="text-[16px] font-bold text-[#12122B]">
              {education.institution}
            </p>
            <p className="mt-1 text-[13px] text-[#4A4A68]">
              {education.program} · {education.semester}
            </p>
          </div>
        )}
      </section>

      {/* EXPERIENCIA */}
      <section className="bg-white border border-[#E4E3F1] rounded-2xl p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-normal uppercase tracking-wide text-[#4A4A68]">
            EXPERIENCIA
          </h3>
          {!editingExperience ? (
            <button
              type="button"
              onClick={openExperienceEditor}
              className="text-[13px] font-bold text-[#3730A3] hover:underline cursor-pointer px-1 py-0.5"
            >
              Editar
            </button>
          ) : null}
        </div>

        {editingExperience ? (
          <form onSubmit={saveExperience} className="mt-3 space-y-2.5">
            <input
              type="text"
              value={expDraft.title}
              onChange={(event) =>
                setExpDraft({ ...expDraft, title: event.target.value })
              }
              aria-label="Puesto o experiencia"
              placeholder="Ej. Residencia · Desarrollador web"
              className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={expDraft.period}
                onChange={(event) =>
                  setExpDraft({ ...expDraft, period: event.target.value })
                }
                aria-label="Periodo"
                placeholder="Ej. Ene – Jun 2026"
                className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
              />
              <input
                type="text"
                value={expDraft.location}
                onChange={(event) =>
                  setExpDraft({ ...expDraft, location: event.target.value })
                }
                aria-label="Ubicación"
                placeholder="Ej. Morelia"
                className="w-full rounded-xl border border-[#E4E3F1] px-3 py-2 text-[14px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
              />
            </div>
            {expError ? (
              <p role="alert" className="text-[12px] font-medium text-[#B42318]">
                {expError}
              </p>
            ) : null}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingExperience(false)}
                className="min-h-[36px] px-3 rounded-lg border border-[#E4E3F1] text-[13px] font-bold text-[#4A4A68] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="min-h-[36px] px-4 rounded-lg bg-[#3730A3] text-[13px] font-bold text-white cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-2">
            <p className="text-[16px] font-bold text-[#12122B]">
              {experience.title}
            </p>
            <p className="mt-1 text-[13px] text-[#4A4A68]">
              {experience.period} · {experience.location}
            </p>
          </div>
        )}
      </section>

      {/* HABILIDADES */}
      <section className="bg-white border border-[#E4E3F1] rounded-2xl p-4">
        <h3 className="text-[13px] font-normal uppercase tracking-wide text-[#4A4A68]">
          HABILIDADES
        </h3>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="group inline-flex items-center gap-1 rounded-full bg-[#EEEDFC] px-3 py-1 text-[12px] font-bold text-[#2E2785]"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                aria-label={`Quitar ${skill}`}
                className="text-[#4A4A68] hover:text-[#B42318] opacity-60 group-hover:opacity-100 focus:opacity-100 cursor-pointer leading-none"
              >
                ×
              </button>
            </span>
          ))}

          {!addingSkill ? (
            <button
              type="button"
              onClick={() => setAddingSkill(true)}
              className="inline-flex items-center rounded-full bg-[#EEEDFC] px-3 py-1 text-[12px] font-bold text-[#2E2785] hover:bg-[#DCD9FA] transition-colors cursor-pointer"
            >
              + Agregar
            </button>
          ) : null}
        </div>

        {addingSkill ? (
          <form onSubmit={handleAddSkill} className="mt-3 flex gap-2">
            <input
              type="text"
              autoFocus
              value={skillInput}
              onChange={(event) => setSkillInput(event.target.value)}
              placeholder="Ej. TypeScript"
              aria-label="Nueva habilidad"
              className="flex-1 min-w-0 rounded-xl border border-[#E4E3F1] px-3 py-1.5 text-[13px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
            />
            <button
              type="submit"
              className="min-h-[34px] px-3 rounded-lg bg-[#3730A3] text-[12px] font-bold text-white cursor-pointer"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => {
                setAddingSkill(false);
                setSkillInput("");
              }}
              className="min-h-[34px] px-3 rounded-lg border border-[#E4E3F1] text-[12px] font-bold text-[#4A4A68] cursor-pointer"
            >
              Cancelar
            </button>
          </form>
        ) : null}
      </section>

      {/* IDIOMAS */}
      <section className="bg-white border border-[#E4E3F1] rounded-2xl p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-normal uppercase tracking-wide text-[#4A4A68]">
            IDIOMAS
          </h3>
          {editingLanguages ? (
            <button
              type="button"
              onClick={() => setEditingLanguages(false)}
              className="text-[13px] font-bold text-[#3730A3] hover:underline cursor-pointer"
            >
              Listo
            </button>
          ) : null}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEDFC] px-3 py-1 text-[12px] font-bold text-[#2E2785]"
            >
              <button
                type="button"
                onClick={() => setEditingLanguages((prev) => !prev)}
                title="Haz clic para editar idiomas"
                className="cursor-pointer"
              >
                {lang.name} · {lang.level}
              </button>
              {editingLanguages ? (
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(lang.id)}
                  aria-label={`Quitar idioma ${lang.name}`}
                  className="text-[#4A4A68] hover:text-[#B42318] cursor-pointer leading-none"
                >
                  ×
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {editingLanguages ? (
          <form
            onSubmit={handleAddLanguage}
            className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2"
          >
            <input
              type="text"
              value={langName}
              onChange={(event) => setLangName(event.target.value)}
              placeholder="Idioma (ej. Francés)"
              aria-label="Nombre del idioma"
              className="rounded-xl border border-[#E4E3F1] px-3 py-1.5 text-[13px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
            />
            <input
              type="text"
              value={langLevel}
              onChange={(event) => setLangLevel(event.target.value)}
              placeholder="Nivel (ej. B1)"
              aria-label="Nivel del idioma"
              className="rounded-xl border border-[#E4E3F1] px-3 py-1.5 text-[13px] text-[#12122B] focus:outline-none focus:border-[#3730A3]"
            />
            <button
              type="submit"
              className="min-h-[34px] px-3 rounded-lg bg-[#3730A3] text-[12px] font-bold text-white cursor-pointer"
            >
              Agregar
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
