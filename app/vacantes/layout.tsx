import type { ReactNode } from 'react';
import { VacantesShell } from '@/components/vacantes/VacantesShell';

export default function VacantesLayout({ children }: { children: ReactNode }) {
  return <VacantesShell>{children}</VacantesShell>;
}
