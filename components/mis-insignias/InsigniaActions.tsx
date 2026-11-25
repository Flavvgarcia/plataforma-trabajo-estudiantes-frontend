"use client";

import { Check, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./insignia.module.css";
import { addProfileBadge, useProfileBadge } from "./badgeStorage";
import type { Insignia } from "./types";

export function InsigniaActions({ insignia }: { insignia: Insignia }) {
  const added = useProfileBadge(insignia.id);
  const [saveError, setSaveError] = useState(false);
  const isPublic = insignia.visibilidad === "publica";

  function handleAdd() {
    try {
      addProfileBadge(insignia.id);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <div className={styles.actions}>
      <p className={styles.notice}>
        <strong>Importante:</strong> esta insignia NO es una certificación
        acreditada. Indica que aprobaste un curso de {insignia.emisor} generado
        con IA.
      </p>

      <div className={styles.visibility}>
        <p>
          <strong>{isPublic ? "Visible para empresas" : "Solo visible para ti"}</strong>
          <span>{isPublic ? "Público" : "Privado"}</span>
        </p>
        <span aria-hidden="true" className={styles.visibilityIcon}>
          {isPublic ? <Check size={16} strokeWidth={3} /> : <LockKeyhole size={14} />}
        </span>
      </div>

      {added ? (
        <Link href="/mi-perfil#insignias" className={styles.primary}>
          <Check size={18} aria-hidden="true" />
          Añadida a mi perfil
        </Link>
      ) : (
        <button type="button" onClick={handleAdd} className={styles.primary}>
          Añadir a mi perfil
        </button>
      )}

      <p className={styles.status} role="status">
        {added ? "La insignia está guardada en tu perfil." : null}
      </p>
      {saveError ? (
        <p className={styles.error} role="alert">
          No pudimos guardar la insignia en este navegador.
        </p>
      ) : null}

      <Link href={`/vacantes/${insignia.vacanteId}`} className={styles.secondary}>
        Volver a la vacante
      </Link>
    </div>
  );
}
