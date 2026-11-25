"use client";

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
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-indigo-50 text-2xl text-indigo-700">
          ✓
        </div>
        <h2 className="mt-4 text-xl font-bold text-zinc-900">
          ¡Reseña enviada!
        </h2>
        <p className="mt-2 text-zinc-500">
          Gracias por compartir tu experiencia sobre {empresa.nombre}.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/empresas/${empresa.id}`}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Volver a {empresa.nombre}
          </Link>
          <button
            type="button"
            onClick={reiniciar}
            className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
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
      className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 rounded-xl bg-indigo-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-indigo-900">
            {empresa.nombre}
          </p>
          <p className="text-xs text-indigo-700">
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
          Empresa
        </span>
      </div>

      <StarPicker
        label="Calificación general"
        value={rating}
        onChange={setRating}
      />

      <div className="flex flex-col gap-4">
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

      <hr className="border-zinc-200" />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="comentario"
          className="text-sm font-semibold text-zinc-900"
        >
          Comentario
        </label>
        <textarea
          id="comentario"
          name="comentario"
          required
          rows={4}
          placeholder="Cuéntanos cómo fue tu experiencia..."
          className="resize-none rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-800">
        <input
          type="checkbox"
          name="entrevista"
          className="h-4 w-4 accent-indigo-600"
        />
        Tuve entrevista
      </label>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 py-4 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Publicar reseña
      </button>
    </form>
  );
}
