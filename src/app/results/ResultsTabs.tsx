"use client";

import { TabItem, Tabs } from "flowbite-react/components/Tabs";
import { Button } from "flowbite-react";

export interface DimensionResult {
  dimensionId: string;
  dimensionLabel: string;
  score: number;
  classification: string | null;
  pdfUrl?: string | null;
}

interface ResultsTabsProps {
  results: DimensionResult[];
}

function getClassificationStyle(classification: string | null) {
  const normalizedClassification = classification
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizedClassification?.includes("desfavorables")) {
    return {
      label: "Condiciones laborales desfavorables",
      border: "border-danger-500",
      background: "bg-danger-50",
      text: "text-danger-800",
      badge: "border-danger-200 bg-danger-100 text-danger-800",
    };
  }

  if (normalizedClassification?.includes("parcialmente")) {
    return {
      label: "Condiciones laborales parcialmente favorables",
      border: "border-warning-500",
      background: "bg-warning-50",
      text: "text-warning-800",
      badge: "border-warning-200 bg-warning-100 text-warning-800",
    };
  }

  if (normalizedClassification?.includes("favorables")) {
    return {
      label: "Condiciones laborales favorables",
      border: "border-success-500",
      background: "bg-success-50",
      text: "text-success-800",
      badge: "border-success-200 bg-success-100 text-success-800",
    };
  }

  return {
    label: classification ?? "No disponible",
    border: "border-border-2",
    background: "bg-surface-2",
    text: "text-muted",
    badge: "border-border bg-surface-2 text-muted",
  };
}

export default function ResultsTabs({ results }: ResultsTabsProps) {
  if (results.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-6 text-center text-muted">
        Esta evaluación no tiene resultados por dimensión disponibles.
      </p>
    );
  }

  return (
    <section
      aria-label="Resultados por dimensión"
      className="overflow-hidden rounded-3xl border border-border bg-surface p-4 shadow-card sm:p-6"
    >
      <Tabs
        aria-label="Resultados por dimensión"
        theme={{
          tablist: {
            variant: {
              underline:
                "-mb-px flex w-full flex-nowrap justify-start overflow-x-auto border-b border-border",
            },
            tabitem: {
              variant: {
                underline: {
                  active: {
                    on: "rounded-t-lg border-b-2 border-primary-800 text-primary-900",
                    off: "border-b-2 border-transparent text-muted hover:border-primary-300 hover:text-primary-900",
                  },
                },
              },
            },
          },
        }}
        variant="underline"
      >
        {results.map((result) => {
          const classificationStyle = getClassificationStyle(
            result.classification,
          );
          const infographicUrl = result.pdfUrl;

          return (
            <TabItem
              key={result.dimensionId}
              title={<span className="whitespace-nowrap">{result.dimensionLabel}</span>}
            >
              <article className="pt-5 sm:pt-6">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    {result.dimensionLabel}
                  </h2>
                  <span
                    className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-semibold ${classificationStyle.badge}`}
                  >
                    {classificationStyle.label}
                  </span>
                </header>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">
                    Puntaje:{" "}
                    <span className="font-semibold tabular-nums text-foreground">
                      {result.score}
                    </span>
                  </p>
                  {infographicUrl ? (
                    <a
                      download
                      href={infographicUrl}
                      className="inline-flex w-fit items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                    >
                      Descargar infografía PDF
                    </a>
                  ) : (
                    <Button color="default" disabled>
                      PDF próximamente
                    </Button>
                  )}
                </div>

                <div
                  aria-label={`Infografía PDF de ${result.dimensionLabel}`}
                  className={`mt-4 overflow-hidden rounded-xl border-2 ${classificationStyle.border}`}
                >
                  {infographicUrl ? (
                    <iframe
                      className="aspect-4/3 w-full bg-white sm:aspect-video"
                      src={infographicUrl}
                      title={`Infografía de ${result.dimensionLabel}`}
                    />
                  ) : (
                    <div
                      className={`flex aspect-4/3 w-full flex-col items-center justify-center gap-2 px-5 text-center sm:aspect-video ${classificationStyle.background} ${classificationStyle.text}`}
                    >
                      <p className="text-base font-semibold">
                        La infografía estará disponible próximamente
                      </p>
                      <p className="max-w-md text-sm">
                        Aquí podrás consultar y descargar el PDF con la
                        información de esta dimensión.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            </TabItem>
          );
        })}
      </Tabs>
    </section>
  );
}
