"use client";

import { Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import StarPicker from "./StarPicker";
import type { Empresa } from "../data/empresas";

const categorias = [
  "Clima laboral",
  "Estabilidad",
  "Crecimiento",
  "Trato en el proceso",
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]";

function ratingsVacios(): Record<string, number> {
  return Object.fromEntries(categorias.map((categoria) => [categoria, 0]));
}

export default function NuevaResenaForm({ empresa }: { empresa: Empresa }) {
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>(ratingsVacios);
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  function reiniciar() {
    setRating(0);
    setRatings(ratingsVacios());
    setEnviado(false);
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-[#E4E3F1] bg-white p-8 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#EEEDFC] text-[#3730A3]">
          <Check size={28} strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
          ¡Reseña enviada!
        </h2>
        <p className="mt-2 text-[15px] text-[#4A4A68]">
          Gracias por compartir tu experiencia sobre {empresa.nombre}.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/empresas/${empresa.id}`}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl bg-[#3730A3] px-5 text-sm font-bold text-white transition-colors hover:bg-[#2E2888] ${focusRing}`}
          >
            Volver a {empresa.nombre}
          </Link>
          <button
            type="button"
            onClick={reiniciar}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-[#3730A3] px-5 text-sm font-bold text-[#3730A3] transition-colors hover:bg-[#EEEDFC] ${focusRing}`}
          >
            Escribir otra
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-[#E4E3F1] bg-white p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 rounded-xl bg-[#EEEDFC] px-4 py-3">
        <div>
          <p className="text-sm font-bold text-[#12122B]">{empresa.nombre}</p>
          <p className="text-[13px] text-[#4A4A68]">
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <span className="text-xs font-bold tracking-wide text-[#3730A3] uppercase">
          Empresa
        </span>
      </div>

      <StarPicker
        label="Calificación general"
        value={rating}
        onChange={setRating}
      />

      <div className="flex flex-col gap-2">
        {categorias.map((categoria) => (
          <StarPicker
            key={categoria}
            label={categoria}
            value={ratings[categoria]}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, [categoria]: value }))
            }
          />
        ))}
      </div>

      <hr className="border-[#E4E3F1]" />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="comentario"
          className="text-sm font-bold text-[#12122B]"
        >
          Comentario
        </label>
        <textarea
          id="comentario"
          name="comentario"
          required
          rows={4}
          placeholder="Cuéntanos cómo fue tu experiencia..."
          className="resize-none rounded-xl border border-[#8C8AA8] bg-white px-4 py-3 text-[15px] text-[#12122B] outline-none transition-colors placeholder:text-[#4A4A68]/70 focus:border-[#3730A3] focus:ring-2 focus:ring-[#EEEDFC]"
        />
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-[#12122B]">
        <input
          type="checkbox"
          name="entrevista"
          className="size-5 accent-[#3730A3]"
        />
        Tuve entrevista
      </label>

      <button
        type="submit"
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3730A3] text-base font-bold text-white transition-colors hover:bg-[#2E2888] ${focusRing}`}
      >
        <Send size={18} aria-hidden="true" />
        Publicar reseña
      </button>
    </form>
  );
}
