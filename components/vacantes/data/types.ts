// Enums exactos del esquema de PostgreSQL
export type Modalidad = 'presencial' | 'remoto' | 'hibrido';
export type TipoVacante = 'residencia' | 'practicas' | 'primer_empleo';
export type EstadoVacante = 'vigente' | 'vencida' | 'retirada';
export type TipoFuente = 'directa' | 'api' | 'enlace' | 'convenio' | 'prueba';
export type CategoriaHabilidad = 'tecnica' | 'blanda' | 'herramienta' | 'idioma';
export type EstadoGap = 'abierto' | 'cerrado' | 'disputado';

export type MotivoReporteGap =
  | 'marcado_incorrecto'
  | 'aportar_evidencia'
  | 'error_ia';

export interface HabilidadCoincidente {
  habilidad_id: string;
  nombre: string;
  categoria: CategoriaHabilidad;
  evidencia: string; // Viene de perfil_habilidades.evidencia
}

export interface GapItem {
  id: string;
  habilidad_id: string;
  nombre: string;
  categoria: CategoriaHabilidad;
  obligatoria: boolean;
  motivo_vacante: string; // Qué pide la vacante (ej. "Pide tipado estático.")
  estado: EstadoGap;
  marcado_incorrecto: boolean;
  evidencia: string | null;
}

export interface VacanteConCoincidencia {
  id: string;
  titulo: string;
  resumen: string;
  enlace_aplicar: string;
  estado_mx: string;
  ciudad: string;
  modalidad: Modalidad;
  tipo: TipoVacante;
  carreras: string[];
  estado: EstadoVacante;
  publicada_en: string;
  vence_en: string;
  empresa: {
    id: string;
    nombre: string;
  };
  fuente: {
    id: string;
    nombre: string; // Ej. "Talented", "LinkedIn", "Indeed"
    tipo: TipoFuente;
  };
  coincidencia: {
    id: string;
    porcentaje: number;
    explicacion: string;
    version_algoritmo: string;
    calculada_en: string;
    habilidades_coincidentes: HabilidadCoincidente[];
    gaps: GapItem[];
  };
}

export interface ReporteGapPayload {
  gapIds: string[];
  motivo: MotivoReporteGap;
  enlaceEvidencia: string;
  archivoNombre: string | null;
  comentario: string;
}

export const MODALIDAD_LABELS: Record<Modalidad, string> = {
  remoto: 'Remoto',
  hibrido: 'Híbrido',
  presencial: 'Presencial',
};

export const TIPO_VACANTE_LABELS: Record<TipoVacante, string> = {
  residencia: 'Residencia',
  practicas: 'Prácticas',
  primer_empleo: 'Primer empleo',
};
