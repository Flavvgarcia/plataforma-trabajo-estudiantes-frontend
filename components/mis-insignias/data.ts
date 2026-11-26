import mockInsignia from "./mockInsignia.json";
import type { Insignia } from "./types";

const visibilidad = mockInsignia.visibilidad === "publica" ? "publica" : "privada";

export const insignia: Insignia = { ...mockInsignia, visibilidad };
