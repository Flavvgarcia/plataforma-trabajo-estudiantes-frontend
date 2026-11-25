import mockVacantesData from './mockVacantes.json';
import type { VacanteConCoincidencia } from './types';

export const mockVacantes: VacanteConCoincidencia[] =
  mockVacantesData as VacanteConCoincidencia[];

export function getVacantes(): VacanteConCoincidencia[] {
  return [...mockVacantes].sort(
    (a, b) => b.coincidencia.porcentaje - a.coincidencia.porcentaje
  );
}

export function getVacanteById(id: string): VacanteConCoincidencia | undefined {
  return mockVacantes.find((v) => v.id === id);
}
