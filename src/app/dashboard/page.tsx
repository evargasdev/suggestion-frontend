import { Suspense } from "react";

import {
  API_BASE_URL,
  getDashboardStats,
  type DashboardStat,
} from "@/lib/api/evaluations";
import { ApiError } from "@/lib/api/http/errors";
import InstitutionalFooter from "@/components/InstitutionalFooter";
import DashboardResults from "./DashboardResults";
import { Button } from "flowbite-react";

function DashboardError({ message }: { message: string }) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
      <h1 className="text-2xl font-bold text-foreground">
        No se pudieron cargar los resultados agregados
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
    <p className="rounded-2xl border border-border bg-surface p-6 text-center text-muted">
      Cargando resultados agregados...
    </p>
  );
}

async function DashboardContent() {
  let stats: DashboardStat[] = [];
  let loadError: string | null = null;

  try {
    stats = await getDashboardStats();
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
          Explora los promedios por dimensión, actividad turística y cargo. Solo
          se muestran grupos que cumplen el mínimo de privacidad definido para
          el panel.
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-primary-100 bg-surface/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm leading-relaxed text-muted">
          El puntaje se muestra respecto al máximo posible en cada dimensión.
        </p>
        <Button href={`${API_BASE_URL}/api/evaluations/dashboard/report.xlsx`}>
          Descargar reporte Excel
        </Button>
      </div>

      <DashboardResults stats={stats} />

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
