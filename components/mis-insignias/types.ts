export interface Insignia {
  id: string;
  titulo: string;
  habilidad: {
    id: string;
    nombre: string;
    siglas: string;
  };
  emisor: string;
  nivel: string;
  fechaObtencion: string;
  resultado: number;
  resultadoMinimo: number;
  visibilidad: "publica" | "privada";
  vacanteId: string;
}
