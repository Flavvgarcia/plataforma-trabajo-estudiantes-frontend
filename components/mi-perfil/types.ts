export interface EducationInfo {
  institution: string;
  program: string;
  semester: string;
}

export interface ExperienceInfo {
  title: string;
  period: string;
  location: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface PrivacySettings {
  estudios: boolean;
  experiencia: boolean;
  habilidades: boolean;
  idiomas: boolean;
  notas: boolean;
}

export type PrivacyFieldKey = keyof PrivacySettings;

export interface StudentProfile {
  initials: string;
  fullName: string;
  role: string;
  education: EducationInfo;
  experience: ExperienceInfo;
  skills: string[];
  languages: LanguageItem[];
  notes: string;
  privacy: PrivacySettings;
  cvFileName?: string;
}

export const INITIAL_PROFILE: StudentProfile = {
  initials: "MF",
  fullName: "María Fernanda",
  role: "Estudiante",
  education: {
    institution: "Instituto Tecnológico de Morelia",
    program: "Ing. en Sistemas",
    semester: "7.º semestre",
  },
  experience: {
    title: "Residencia · Desarrollador web",
    period: "Ene – Jun 2026",
    location: "Morelia",
  },
  skills: ["Python", "SQL", "React", "Git"],
  languages: [
    { id: "es", name: "Español", level: "Nativo" },
    { id: "en", name: "Inglés", level: "B2" },
  ],
  notes: "",
  privacy: {
    estudios: true,
    experiencia: true,
    habilidades: true,
    idiomas: true,
    notas: false,
  },
};
