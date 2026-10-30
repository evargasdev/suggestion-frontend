import Link from "next/link";
import type { ReactNode } from "react";

import ResultsTabs, { type DimensionResult } from "./ResultsTabs";
import { ApiError, INVALID_RESPONSE_MESSAGE } from "@/lib/api/http/errors";
import { request } from "@/lib/api/http/client";

interface EvaluationResultsResponse {
  evaluationId: string;
  results: DimensionResult[];
}

interface ResultsPageProps {
  searchParams: Promise<{
    id?: string | string[];
    evaluationId?: string | string[];
  }>;
}

function getSingleParam(value: string | string[] | undefined): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function ResultsMessage({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-8 text-center shadow-xl">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Resultados de tu evaluación
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-[var(--muted)]">{children}</p>
      <Link
        className="mt-6 inline-flex rounded-xl bg-[var(--foreground)] px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        href="/"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default async function ResultsPage({
  searchParams,
}: ResultsPageProps) {
  const params = await searchParams;
  const evaluationId =
    getSingleParam(params.evaluationId) ?? getSingleParam(params.id);

  if (!evaluationId) {
    return (
      <ResultsMessage>
        No se indicó el identificador de la evaluación. Abre esta página con el
        ID que recibiste al enviar tus respuestas.
      </ResultsMessage>
    );
  }

  try {
    const { data } = await request<EvaluationResultsResponse>({
      baseUrl:
        process.env.API_BASE_URL ??
        process.env.NEXT_PUBLIC_API_BASE_URL ??
        "http://localhost:4000",
      path: `/api/evaluations/${encodeURIComponent(evaluationId)}/results`,
    });

    if (!data || !Array.isArray(data.results)) {
      throw new ApiError(502, INVALID_RESPONSE_MESSAGE);
    }

    return (
      <div className="w-full space-y-5">
        <header className="px-1 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ring)]">
            Evaluación completada
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Tus resultados
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Consulta el puntaje de cada dimensión en sus pestañas.
          </p>
        </header>
        <ResultsTabs results={data.results} />
      </div>
    );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    return (
      <ResultsMessage>
        {error.status === 404
          ? "No encontramos una evaluación con ese identificador."
          : `No fue posible cargar los resultados. ${error.message}`}
      </ResultsMessage>
    );
  }
}
