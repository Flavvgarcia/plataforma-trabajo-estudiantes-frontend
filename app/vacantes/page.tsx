import { VacantesListClient } from '@/components/vacantes/VacantesListClient';
import { getVacantes } from '@/components/vacantes/data/vacantesService';

export default function VacantesPage() {
  const vacantes = getVacantes();
  return <VacantesListClient initialVacantes={vacantes} />;
}
