import { Suspense } from "react";
import { access } from "node:fs/promises";
import Link from "next/link";
import path from "node:path";
import type { ReactNode } from "react";

import ResultsTabs, { type DimensionResult } from "./ResultsTabs";
import { ApiError, INVALID_RESPONSE_MESSAGE } from "@/lib/api/http/errors";
import { request } from "@/lib/api/http/client";
import InstitutionalFooter from "@/components/InstitutionalFooter";
import { getInfographicUrl } from "@/lib/helpers/infographics";

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

function isMissingAsset(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

function ResultsMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl items-center justify-center">
      <section className="w-full rounded-3xl border border-border bg-surface p-6 text-center shadow-card sm:p-8">
        <h1 className="text-2xl font-bold text-foreground">
          Resultados de tu evaluación
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted">{children}</p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-secondary-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-secondary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          href="/"
        >
          Volver al inicio
        </Link>
      </section>
    </div>
  );
}

async function ResultsContent({
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

  let results: DimensionResult[] = [];
  let apiError: ApiError | null = null;

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

    results = await Promise.all(
      data.results.map(async (result) => {
        const pdfUrl = getInfographicUrl(
          result.dimensionLabel,
          result.classification,
        );

        if (!pdfUrl) {
          return { ...result, pdfUrl: null };
        }

        try {
          await access(
            path.join(process.cwd(), "public", pdfUrl.slice(1)),
          );
          return { ...result, pdfUrl };
        } catch (error) {
          if (!isMissingAsset(error)) {
            throw error;
          }

          return { ...result, pdfUrl: null };
        }
      }),
    );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    apiError = error;
  }

  if (apiError) {
    return (
      <ResultsMessage>
        {apiError.status === 404
          ? "No encontramos una evaluación con ese identificador."
          : `No fue posible cargar los resultados. ${apiError.message}`}
      </ResultsMessage>
    );
  }

  return (
    <div className="w-full space-y-5">
      <header className="px-1 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
          Evaluación completada
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Tus resultados
        </h1>
        <p className="mt-2 text-muted">
          Consulta la clasificación y la infografía de cada dimensión en sus
          pestañas.
        </p>
      </header>
      <ResultsTabs results={results} />
    </div>
  );
}

export default function ResultsPage(props: ResultsPageProps) {
  return (
    <div className="flex min-h-screen flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-4">
        <Suspense
          fallback={
            <ResultsMessage>
              Cargando los resultados de tu evaluación...
            </ResultsMessage>
          }
        >
          <ResultsContent searchParams={props.searchParams} />
        </Suspense>
      </main>
      <InstitutionalFooter />
    </div>
  );
}
