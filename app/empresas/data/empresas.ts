export type CategoriaRating = {
  label: string;
  value: number;
};

export type FuenteExterna = {
  nombre: string;
  rating: number;
  url: string;
};

export type Empresa = {
  id: string;
  nombre: string;
  sector: string;
  ubicacion: string;
  rating: number;
  totalResenas: number;
  categorias: CategoriaRating[];
  fuenteExterna?: FuenteExterna;
};

export type Resena = {
  id: string;
  empresaId: string;
  autor: string;
  rating: number;
  comentario: string;
  verificada: boolean;
};

export const empresas: Empresa[] = [
  {
    id: "nova-software",
    nombre: "Nova Software",
    sector: "Software",
    ubicacion: "Morelia, Mich.",
    rating: 4.2,
    totalResenas: 12,
    categorias: [
      { label: "Clima laboral", value: 4.4 },
      { label: "Estabilidad", value: 4.0 },
      { label: "Crecimiento", value: 4.3 },
      { label: "Trato en el proceso", value: 4.1 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 3.9,
      url: "https://www.glassdoor.com",
    },
  },
  {
    id: "technova",
    nombre: "TechNova",
    sector: "Tecnología",
    ubicacion: "Guadalajara, Jal.",
    rating: 4.5,
    totalResenas: 28,
    categorias: [
      { label: "Clima laboral", value: 4.6 },
      { label: "Estabilidad", value: 4.3 },
      { label: "Crecimiento", value: 4.7 },
      { label: "Trato en el proceso", value: 4.4 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 4.1,
      url: "https://www.glassdoor.com",
    },
  },
  {
    id: "dataminds",
    nombre: "DataMinds",
    sector: "Ciencia de datos",
    ubicacion: "CDMX",
    rating: 4.0,
    totalResenas: 9,
    categorias: [
      { label: "Clima laboral", value: 4.1 },
      { label: "Estabilidad", value: 3.8 },
      { label: "Crecimiento", value: 4.2 },
      { label: "Trato en el proceso", value: 3.9 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 3.7,
      url: "https://www.glassdoor.com",
    },
  },
  {
    id: "creativa-studio",
    nombre: "Creativa Studio",
    sector: "Diseño",
    ubicacion: "Monterrey, N.L.",
    rating: 3.8,
    totalResenas: 7,
    categorias: [
      { label: "Clima laboral", value: 3.9 },
      { label: "Estabilidad", value: 3.5 },
      { label: "Crecimiento", value: 4.0 },
      { label: "Trato en el proceso", value: 3.7 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 3.6,
      url: "https://www.glassdoor.com",
    },
  },
  {
    id: "cloudworks",
    nombre: "CloudWorks",
    sector: "Cloud y DevOps",
    ubicacion: "Remoto",
    rating: 4.3,
    totalResenas: 19,
    categorias: [
      { label: "Clima laboral", value: 4.4 },
      { label: "Estabilidad", value: 4.1 },
      { label: "Crecimiento", value: 4.5 },
      { label: "Trato en el proceso", value: 4.2 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 4.0,
      url: "https://www.glassdoor.com",
    },
  },
  {
    id: "biolab",
    nombre: "BioLab",
    sector: "Biotecnología",
    ubicacion: "Querétaro, Qro.",
    rating: 4.1,
    totalResenas: 6,
    categorias: [
      { label: "Clima laboral", value: 4.0 },
      { label: "Estabilidad", value: 4.2 },
      { label: "Crecimiento", value: 4.1 },
      { label: "Trato en el proceso", value: 3.9 },
    ],
    fuenteExterna: {
      nombre: "Glassdoor",
      rating: 3.8,
      url: "https://www.glassdoor.com",
    },
  },
];

export const resenas: Resena[] = [
  {
    id: "resena-1",
    empresaId: "nova-software",
    autor: "Anónimo",
    rating: 5,
    comentario: "Buen ambiente y mentoría constante.",
    verificada: true,
  },
  {
    id: "resena-2",
    empresaId: "nova-software",
    autor: "Anónimo",
    rating: 4,
    comentario: "Proceso claro, respondieron en 3 días.",
    verificada: true,
  },
  {
    id: "resena-3",
    empresaId: "nova-software",
    autor: "Anónimo",
    rating: 4,
    comentario: "Las prácticas están bien estructuradas, aunque el onboarding puede mejorar.",
    verificada: false,
  },
  {
    id: "resena-4",
    empresaId: "technova",
    autor: "Anónimo",
    rating: 5,
    comentario: "Excelente cultura de aprendizaje y proyectos retadores.",
    verificada: true,
  },
  {
    id: "resena-5",
    empresaId: "technova",
    autor: "Anónimo",
    rating: 5,
    comentario: "Me contactaron rápido y el proceso fue muy transparente.",
    verificada: true,
  },
  {
    id: "resena-6",
    empresaId: "technova",
    autor: "Anónimo",
    rating: 4,
    comentario: "Buen lugar para iniciar, con horarios flexibles.",
    verificada: true,
  },
  {
    id: "resena-7",
    empresaId: "dataminds",
    autor: "Anónimo",
    rating: 4,
    comentario: "Equipo muy técnico, aprendí bastante de datos.",
    verificada: true,
  },
  {
    id: "resena-8",
    empresaId: "dataminds",
    autor: "Anónimo",
    rating: 3,
    comentario: "El proceso tardó más de lo esperado, pero el trato fue bueno.",
    verificada: false,
  },
  {
    id: "resena-9",
    empresaId: "creativa-studio",
    autor: "Anónimo",
    rating: 4,
    comentario: "Ambiente creativo y mucha libertad para proponer ideas.",
    verificada: true,
  },
  {
    id: "resena-10",
    empresaId: "creativa-studio",
    autor: "Anónimo",
    rating: 3,
    comentario: "Buen portafolio de proyectos, aunque la carga puede ser alta.",
    verificada: false,
  },
  {
    id: "resena-11",
    empresaId: "cloudworks",
    autor: "Anónimo",
    rating: 5,
    comentario: "100% remoto y con muy buena comunicación interna.",
    verificada: true,
  },
  {
    id: "resena-12",
    empresaId: "cloudworks",
    autor: "Anónimo",
    rating: 4,
    comentario: "Proceso técnico exigente pero justo. Respondieron en una semana.",
    verificada: true,
  },
  {
    id: "resena-13",
    empresaId: "cloudworks",
    autor: "Anónimo",
    rating: 4,
    comentario: "Buenas herramientas y apoyo para certificaciones.",
    verificada: true,
  },
  {
    id: "resena-14",
    empresaId: "biolab",
    autor: "Anónimo",
    rating: 4,
    comentario: "Investigación interesante y tutores con experiencia.",
    verificada: true,
  },
  {
    id: "resena-15",
    empresaId: "biolab",
    autor: "Anónimo",
    rating: 4,
    comentario: "El laboratorio está bien equipado y el ambiente es colaborativo.",
    verificada: false,
  },
];

export function getEmpresaById(id: string): Empresa | undefined {
  return empresas.find((empresa) => empresa.id === id);
}

export function getResenasByEmpresa(empresaId: string): Resena[] {
  return resenas.filter((resena) => resena.empresaId === empresaId);
}
