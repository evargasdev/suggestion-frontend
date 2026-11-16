"use client";

import { useMemo, useState } from "react";
import { TabItem, Tabs } from "flowbite-react/components/Tabs";

import type { DashboardStat } from "@/lib/api/evaluations";
import { Button, Select } from "flowbite-react";

const dimensionMaximums: Record<string, number> = {
  Laboral: 27,
  Discriminación: 21,
  Violencias: 27,
  "Cuidados y corresponsabilidad": 18,
  "Salud física y mental": 18,
};

const spanishCollator = new Intl.Collator("es", { sensitivity: "base" });

function getMaximumScore(dimensionLabel: string): number {
  return dimensionMaximums[dimensionLabel] ?? 27;
}

function DashboardTable({ stats }: { stats: DashboardStat[] }) {
  if (stats.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface-2 p-6 text-center text-muted">
        No hay resultados para esta combinación de filtros. Prueba con otros
        valores o limpia los filtros.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-card">
      <table className="w-full min-w-xl border-collapse text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-semibold">Actividad turística</th>
            <th className="px-4 py-3 font-semibold">Cargo</th>
            <th className="px-4 py-3 font-semibold">Puntaje promedio</th>
            <th className="px-4 py-3 text-right font-semibold">Evaluaciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border)">
          {stats.map((stat) => {
            const maximumScore = getMaximumScore(stat.dimensionLabel);
            const percentage = Math.min(
              100,
              Math.max(0, (stat.averageScore / maximumScore) * 100),
            );

            return (
              <tr
                key={`${stat.sector}-${stat.position}-${stat.dimensionId}`}
                className="align-middle text-foreground"
              >
                <td className="px-4 py-4">{stat.sector}</td>
                <td className="px-4 py-4">{stat.position}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-16 shrink-0 font-semibold tabular-nums">
                      {stat.averageScore.toFixed(1)} / {maximumScore}
                    </span>
                    <div
                      aria-label={`${percentage.toFixed(0)}% del puntaje máximo`}
                      aria-valuemax={maximumScore}
                      aria-valuemin={0}
                      aria-valuenow={stat.averageScore}
                      className="h-2 min-w-16 flex-1 overflow-hidden rounded-full bg-primary-100"
                      role="progressbar"
                    >
                      <div
                        className="h-full rounded-full bg-primary-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right tabular-nums">
                  {stat.evaluationCount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FilterSelect({
  id,
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label
      className="flex w-full flex-col gap-1.5 text-sm font-medium text-foreground"
      htmlFor={id}
    >
      {label}
      <Select
        color="default"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </label>
  );
}

export default function DashboardResults({
  stats,
}: {
  stats: DashboardStat[];
}) {
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const dimensions = useMemo(() => {
    const groups = new Map<string, DashboardStat[]>();

    for (const stat of stats) {
      const dimensionStats = groups.get(stat.dimensionId) ?? [];
      dimensionStats.push(stat);
      groups.set(stat.dimensionId, dimensionStats);
    }

    return [...groups.entries()]
      .map(([dimensionId, dimensionStats]) => ({
        dimensionId,
        label: dimensionStats[0].dimensionLabel,
        stats: dimensionStats,
      }))
      .sort((left, right) => spanishCollator.compare(left.label, right.label));
  }, [stats]);

  const sectors = useMemo(
    () =>
      [...new Set(stats.map((stat) => stat.sector))].sort((a, b) =>
        spanishCollator.compare(a, b),
      ),
    [stats],
  );

  const positions = useMemo(
    () =>
      [
        ...new Set(
          stats
            .filter(
              (stat) => selectedSector === "" || stat.sector === selectedSector,
            )
            .map((stat) => stat.position),
        ),
      ].sort((a, b) => spanishCollator.compare(a, b)),
    [selectedSector, stats],
  );

  const filteredStatsByDimension = useMemo(
    () =>
      dimensions.map((dimension) => ({
        ...dimension,
        stats: dimension.stats
          .filter(
            (stat) =>
              (selectedSector === "" || stat.sector === selectedSector) &&
              (selectedPosition === "" || stat.position === selectedPosition),
          )
          .sort(
            (left, right) =>
              spanishCollator.compare(left.sector, right.sector) ||
              spanishCollator.compare(left.position, right.position),
          ),
      })),
    [dimensions, selectedPosition, selectedSector],
  );

  if (stats.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-6 text-center text-muted">
        Aún no hay grupos con suficientes respuestas para mostrar resultados.
      </p>
    );
  }

  return (
    <section
      aria-label="Resultados agregados por dimensión"
      className="overflow-hidden rounded-3xl border border-border bg-surface p-4 shadow-card sm:p-6"
    >
      <div className="mb-5 rounded-2xl border border-primary-100 bg-primary-50/60 p-4 sm:p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-foreground">
            Filtra los resultados
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Los filtros se aplican a todas las dimensiones. Elige una actividad
            para limitar la lista de cargos.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
          <FilterSelect
            id="dashboard-sector-filter"
            allLabel="Todas las actividades"
            label="Actividad turística"
            onChange={(value) => {
              setSelectedSector(value);
              setSelectedPosition((currentPosition) => {
                if (!currentPosition) return "";
                const hasPosition = stats.some(
                  (stat) =>
                    (value === "" || stat.sector === value) &&
                    stat.position === currentPosition,
                );
                return hasPosition ? currentPosition : "";
              });
            }}
            options={sectors}
            value={selectedSector}
          />
          <FilterSelect
            id="dashboard-position-filter"
            allLabel="Todos los cargos"
            label="Cargo"
            onChange={setSelectedPosition}
            options={positions}
            value={selectedPosition}
          />
          {(selectedSector || selectedPosition) && (
            <Button
              size="md"
              className="sm:col-span-2 sm:justify-self-end"
              onClick={() => {
                setSelectedSector("");
                setSelectedPosition("");
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <Tabs
        aria-label="Resultados por dimensión"
        theme={{
          tablist: {
            variant: {
              underline: "-mb-px flex-wrap border-b border-border",
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
        {filteredStatsByDimension.map((dimension) => {
          return (
            <TabItem
              key={dimension.dimensionId}
              title={
                <span className="inline-flex items-center gap-2">
                  {dimension.label}
                  <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-900">
                    {dimension.stats.length}
                  </span>
                </span>
              }
            >
              <DashboardTable stats={dimension.stats} />
            </TabItem>
          );
        })}
      </Tabs>
    </section>
  );
}
