"use client";

import { useState } from "react";
import type { UserRole } from "./types";
import { ALUMNO_MOCK, ADMIN_MOCK } from "./data";
import { AlumnoView } from "./AlumnoView";
import { AdminView } from "./AdminView";

/**
 * ============================================================================
 * VARIABLE DE CONTROL DE ROL:
 * Cambia el valor inicial a "alumno" o "admin" según la vista que quieras probar.
 * También puedes usar el interruptor en pantalla para alternar rápidamente.
 * ============================================================================
 */
const DEFAULT_ROLE: UserRole = "alumno"; // "alumno" | "admin"

export function MisCursosShell() {
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

  return (
    <div className="min-h-screen bg-[#F7F6FC]">
      {/* Botón flotante para alternar rol y probar ambas maquetas en vivo */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#12122B] text-white px-3 py-2 rounded-xl shadow-lg border border-[#E4E3F1]/20">
        <span className="text-xs font-semibold text-gray-300">Rol actual:</span>
        <button
          onClick={() => setRole(role === "alumno" ? "admin" : "alumno")}
          className="text-xs font-bold px-2.5 py-1 rounded bg-[#3730A3] hover:bg-[#4338CA] text-white transition-colors cursor-pointer"
          title="Alternar entre vista de Alumno y Administrador"
        >
          {role === "alumno" ? "Alumno" : "Administrador"}
        </button>
      </div>

      {/* Renderizado del contenido según rol (sin sidebars) */}
      {role === "alumno" ? (
        <AlumnoView data={ALUMNO_MOCK} />
      ) : (
        <AdminView data={ADMIN_MOCK} />
      )}
    </div>
  );
}
