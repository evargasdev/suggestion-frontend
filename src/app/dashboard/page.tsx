import { Suspense } from "react";

import {
  getActiveSurvey,
  getDashboardClassificationStats,
  type DashboardClassificationStat,
} from "@/lib/api/evaluations";
import { ApiError } from "@/lib/api/http/errors";
import InstitutionalFooter from "@/components/InstitutionalFooter";
import DashboardResults from "./DashboardResults";
import { Button } from "flowbite-react";

function DashboardError({ message }: { message: string }) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
      <h1 className="text-2xl font-bold text-foreground">
        No se pudieron cargar los resultados agregados.
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-muted">{message}</p>
      <Button color="default" size="xl" className="mt-6" href="/">
        Volver al inicio
      </Button>
    </section>
  );
}

function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface/80 p-8 text-center shadow-card backdrop-blur-md">
          <p className="font-medium text-primary-900">Cargando resultados...</p>
          <p className="font-medium text-xs text-primary-900/50">Puede tardar hasta 60 segundos</p>
        </div>
      </div>
  );
}

async function DashboardContent() {
  let stats: DashboardClassificationStat[] = [];
  let dimensionOrder: string[] = [];
  let loadError: string | null = null;

  try {
    const [classificationStats, survey] = await Promise.all([
      getDashboardClassificationStats(),
      getActiveSurvey(),
    ]);
    stats = classificationStats;
    dimensionOrder = survey.dimensions.map((dimension) => dimension.id);
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    loadError = `No fue posible consultar el panel. ${error.message}`;
  }

  if (loadError) {
    return <DashboardError message={loadError} />;
  }

  return (
    <>
      <header className="text-center">
        <p className="inline-flex rounded-full border border-primary-200/60 bg-primary-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-900">
          Las mujeres en el trabajo turístico
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Resultados agregados
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Consulta el porcentaje de evaluaciones en cada clasificación por
          dimensión.
        </p>
      </header>

      <DashboardResults dimensionOrder={dimensionOrder} stats={stats} />

      <div className="text-center">
        <Button color="default" size="xl" className="mt-4" href="/">
          Volver al inicio
        </Button>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
      <main className="my-auto mx-auto flex w-full max-w-6xl flex-1 items-center">
        <div className="w-full space-y-7">
          <Suspense fallback={<DashboardLoading />}>
            <DashboardContent />
          </Suspense>
        </div>
      </main>
      <InstitutionalFooter />
    </div>
  );
}
