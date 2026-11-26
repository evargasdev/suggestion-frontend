"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";

import type { DashboardClassificationStat } from "@/lib/api/evaluations";

const classifications = [
  {
    label: "Condiciones laborales desfavorables",
    color: "#cab2ff",
  },
  {
    label: "Condiciones laborales parcialmente favorables",
    color: "#7232df",
  },
  {
    label: "Condiciones laborales favorables",
    color: "#411b7d",
  },
] as const;

const percentageFormatter = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 1,
});

function DimensionPieChart({
  dimension,
}: {
  dimension: {
    id: string;
    label: string;
    counts: Map<string, number>;
  };
}) {
  const chartElement = useRef<HTMLDivElement>(null);
  const total = useMemo(
    () =>
      [...dimension.counts.values()].reduce((sum, count) => sum + count, 0),
    [dimension.counts],
  );
  const chartData = useMemo(
    () =>
      classifications
        .map((classification) => ({
          name: classification.label,
          value: dimension.counts.get(classification.label) ?? 0,
          itemStyle: { color: classification.color },
        }))
        .filter((entry) => entry.value > 0),
    [dimension.counts],
  );

  useEffect(() => {
    const element = chartElement.current;
    if (!element) return;

    const chart = echarts.init(element);
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: "item",
        formatter: (item:any) => {
          const value =
            typeof item.value === "number" ? item.value : Number(item.value);
          const percent =
            total > 0 ? percentageFormatter.format((value / total) * 100) : "0";
          return `${item.name}: ${percent}% (${value})`;
        },
      },
      series: [
        {
          type: "pie",
          radius: "68%",
          data: chartData,
          label: {
            show: true,
            position: "inside",
            formatter: "{d}%",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: "bold",
          },
          labelLine: { show: false },
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 2,
          },
          emphasis: {
            scale: true,
            scaleSize: 8,
          },
        },
      ],
    });

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [chartData, total]);

  return (
    <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <h3 className="text-center text-lg font-bold text-foreground">
        {dimension.label}
      </h3>
      <div
        ref={chartElement}
        role="img"
        aria-label={`Gráfica de pastel con porcentajes de clasificaciones para ${dimension.label}`}
        className="mx-auto h-64 w-full max-w-sm"
      />
      <ul className="space-y-2 border-t border-border pt-4">
        {classifications.map((classification) => {
          const count = dimension.counts.get(classification.label) ?? 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <li
              key={classification.label}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <span className="flex items-start gap-2 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: classification.color }}
                />
                {classification.label}
              </span>
              <span className="shrink-0 text-right font-semibold tabular-nums text-foreground">
                {percentageFormatter.format(percentage)}% ({count})
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-right text-xs text-muted">
        {total} evaluaciones
      </p>
    </article>
  );
}

export default function DashboardResults({
  stats,
  dimensionOrder,
}: {
  stats: DashboardClassificationStat[];
  dimensionOrder: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dimensions = useMemo(() => {
    const groups = new Map<
      string,
      { id: string; label: string; counts: Map<string, number> }
    >();

    for (const stat of stats) {
      const dimension = groups.get(stat.dimensionId) ?? {
        id: stat.dimensionId,
        label: stat.dimensionLabel,
        counts: new Map<string, number>(),
      };
      dimension.counts.set(
        stat.classification,
        (dimension.counts.get(stat.classification) ?? 0) +
          stat.evaluationCount,
      );
      groups.set(stat.dimensionId, dimension);
    }

    const orderById = new Map(
      dimensionOrder.map((dimensionId, index) => [dimensionId, index]),
    );

    return [...groups.values()].sort((left, right) => {
      const leftOrder = orderById.get(left.id) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = orderById.get(right.id) ?? Number.MAX_SAFE_INTEGER;
      return (
        leftOrder - rightOrder ||
        left.label.localeCompare(right.label, "es", { sensitivity: "base" })
      );
    });
  }, [dimensionOrder, stats]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, dimensions.length - 1));
  }, [dimensions.length]);

  if (dimensions.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-6 text-center text-muted">
        Aún no hay dimensiones con suficientes evaluaciones clasificadas para
        mostrar resultados.
      </p>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-xl">
        <DimensionPieChart
          key={dimensions[activeIndex].id}
          dimension={dimensions[activeIndex]}
        />
      </div>
      {dimensions.length > 1 && (
        <nav
          aria-label="Navegación de dimensiones"
          className="mx-auto mt-5 flex max-w-xl items-center justify-between gap-4"
        >
          <button
            type="button"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex((index) => index - 1)}
          >
            Anterior
          </button>
          <span
            aria-live="polite"
            className="text-sm font-medium tabular-nums text-muted"
          >
            {activeIndex + 1} de {dimensions.length}
          </span>
          <button
            type="button"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={activeIndex === dimensions.length - 1}
            onClick={() => setActiveIndex((index) => index + 1)}
          >
            Siguiente
          </button>
        </nav>
      )}
    </>
  );
}
