import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { insignia } from "@/components/mis-insignias/data";
import { InsigniaActions } from "@/components/mis-insignias/InsigniaActions";
import { InsigniaEmblem } from "@/components/mis-insignias/InsigniaEmblem";
import styles from "@/components/mis-insignias/insignia.module.css";
import { StudentLayout } from "@/components/navigation/StudentLayout";
import { StudentSidebar } from "@/components/navigation/StudentSidebar";

export const metadata: Metadata = {
  title: "Mis insignias | Talented",
  description: "Consulta el resultado y la visibilidad de tu insignia de dominio.",
};

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function MisInsigniasPage() {
  const vacancyHref = `/vacantes/${insignia.vacanteId}`;

  return (
    <StudentLayout>
      <div className={styles.shell}>
        <StudentSidebar />

        <main className={styles.main}>
          <header className={styles.header}>
            <Link
              href={vacancyHref}
              className={styles.back}
              aria-label="Volver a la vacante"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </Link>
            <h1>Insignia de dominio</h1>
          </header>

          <div className={styles.columns}>
            <section className={styles.card} aria-labelledby="insignia-title">
              <InsigniaEmblem siglas={insignia.habilidad.siglas} resultado={insignia.resultado} />
              <h2 id="insignia-title">{insignia.titulo}</h2>
              <p className={styles.level}>
                Insignia de {insignia.emisor} · Nivel {insignia.nivel}
              </p>

              <dl className={styles.details}>
                <div>
                  <dt>Habilidad</dt>
                  <dd>{insignia.habilidad.nombre}</dd>
                </div>
                <div>
                  <dt>Fecha de obtención</dt>
                  <dd>
                    <time dateTime={insignia.fechaObtencion}>
                      {dateFormatter.format(new Date(insignia.fechaObtencion))}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Resultado</dt>
                  <dd>{insignia.resultado} % (mínimo {insignia.resultadoMinimo} %)</dd>
                </div>
              </dl>
            </section>

            <InsigniaActions insignia={insignia} />
          </div>
        </main>
      </div>
    </StudentLayout>
  );
}
