import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { VacanteDetailClient } from '@/components/vacantes/VacanteDetailClient';
import {
  getVacanteById,
  getVacantes,
} from '@/components/vacantes/data/vacantesService';

export function generateStaticParams() {
  return getVacantes().map((v) => ({ id: v.id }));
}

async function VacanteDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacante = getVacanteById(id);

  if (!vacante) {
    notFound();
  }

  return <VacanteDetailClient vacante={vacante} />;
}

function VacanteDetailFallback() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-8 w-64 rounded-lg bg-slate-200" />
        <div className="h-40 rounded-2xl bg-white p-5 shadow-xs" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="h-24 rounded-xl bg-slate-200/70" />
          <div className="h-24 rounded-xl bg-slate-200/70" />
          <div className="h-24 rounded-xl bg-slate-200/70" />
        </div>
      </div>
    </div>
  );
}

export default function VacanteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<VacanteDetailFallback />}>
      <VacanteDetailContent params={params} />
    </Suspense>
  );
}
