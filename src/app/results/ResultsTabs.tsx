"use client";

import { useState } from "react";

export interface DimensionResult {
  dimensionId: string;
  dimensionLabel: string;
  score: number;
  classification: string | null;
}

interface ResultsTabsProps {
  results: DimensionResult[];
}

export default function ResultsTabs({ results }: ResultsTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (results.length === 0) {
    return (
      <p className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center text-[var(--muted)]">
        Esta evaluación no tiene resultados por dimensión disponibles.
      </p>
    );
  }

  const activeResult = results[activeIndex];

  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-xl">
      <div
        aria-label="Resultados por dimensión"
        className="flex gap-2 overflow-x-auto border-b border-[var(--border)] p-3"
        role="tablist"
      >
        {results.map((result, index) => (
          <button
            key={result.dimensionId}
            id={`dimension-tab-${result.dimensionId}`}
            aria-controls={`dimension-panel-${result.dimensionId}`}
            aria-selected={activeIndex === index}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] ${
              activeIndex === index
                ? "bg-[var(--foreground)] text-white"
                : "bg-[var(--surface-2)] text-[var(--muted)] hover:bg-[var(--surface-3)]"
            }`}
            onClick={() => setActiveIndex(index)}
            role="tab"
            tabIndex={activeIndex === index ? 0 : -1}
            type="button"
          >
            {result.dimensionLabel}
          </button>
        ))}
      </div>

      <div
        id={`dimension-panel-${activeResult.dimensionId}`}
        aria-labelledby={`dimension-tab-${activeResult.dimensionId}`}
        className="p-6 sm:p-8"
        role="tabpanel"
        tabIndex={0}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          Resultado de la dimensión
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
          {activeResult.dimensionLabel}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl bg-[var(--surface-2)] p-5">
            <p className="text-sm font-medium text-[var(--muted)]">Puntaje</p>
            <p className="mt-2 text-4xl font-bold tabular-nums text-[var(--foreground)]">
              {activeResult.score}
            </p>
          </article>
          <article className="rounded-2xl bg-[var(--surface-2)] p-5">
            <p className="text-sm font-medium text-[var(--muted)]">
              Clasificación
            </p>
            <p className="mt-2 text-xl font-bold capitalize text-[var(--foreground)]">
              {activeResult.classification ?? "No disponible"}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
