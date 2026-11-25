"use client";

import { Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useProfileBadge } from "./badgeStorage";
import type { Insignia } from "./types";

export function ProfileBadge({ insignia }: { insignia: Insignia }) {
  const added = useProfileBadge(insignia.id);

  if (!added) return null;

  return (
    <section id="insignias" aria-labelledby="insignias-heading" className="rounded-2xl border border-[#E4E3F1] bg-white p-4">
      <h2 id="insignias-heading" className="mb-3 text-lg font-bold">
        Insignias
      </h2>
      <Link
        href="/mis-insignias"
        className="flex items-center gap-3 rounded-xl border border-[#E4E3F1] p-3 text-sm hover:bg-[#F7F6FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
      >
        <Award size={24} aria-hidden="true" className="shrink-0 text-[#3730A3]" />
        <span className="min-w-0 flex-1">
          <strong className="block">{insignia.titulo}</strong>
          <span className="text-[#4A4A68]">{insignia.emisor} · {insignia.resultado} %</span>
        </span>
        <ChevronRight size={16} aria-hidden="true" className="shrink-0" />
      </Link>
    </section>
  );
}
