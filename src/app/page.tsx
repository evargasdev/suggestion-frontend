"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InstitutionalFooter from "@/components/InstitutionalFooter";
import ProjectCreditsModal from "@/components/ProjectCreditsModal";
import { Button, Card, Checkbox, Label, Badge } from "flowbite-react";

export default function Home() {
  const router = useRouter();
  const [isConfirmedWoman, setIsConfirmedWoman] = useState(false);

  const handleStartTest = () => {
    if (!isConfirmedWoman) return;
    router.push("/test");
  };

  return (
    <div className="flex min-h-screen flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
      {/* Contenedor Principal */}
      <main className="my-auto mx-auto w-full max-w-3xl">
        <Card className="rounded-3xl border border-border bg-surface/75 p-2 shadow-pop backdrop-blur-2xl sm:p-6">
          {/* Etiqueta / Nombre del Proyecto */}
          <div className="flex justify-center text-center">
            <Badge
              color="purple"
              size="sm"
              className="px-3.5 py-1 text-xs font-semibold uppercase tracking-widest rounded-full"
            >
              Test: Las mujeres en el trabajo turístico
            </Badge>
          </div>

          {/* Título Principal */}
          <h1 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Conoce tu situación laboral
          </h1>

          {/* Presentación y Explicación del Test */}
          <div className="mx-auto mt-2 max-w-2xl space-y-3 text-muted">
            <p className="text-base leading-relaxed sm:text-lg">
              Test anónimo diseñado para evaluar las
              condiciones laborales de las mujeres en el sector turístico a
              través de <strong>cinco dimensiones clave</strong>:
            </p>

            {/* Píldoras de las 5 dimensiones */}
            <div className="flex flex-wrap justify-center gap-2 py-1">
              {[
                "Condiciones laborales",
                "Discriminación",
                "Violencias",
                "Cuidados",
                "Salud física y mental",
              ].map((dimension) => (
                <span
                  key={dimension}
                  className="rounded-full border border-primary-200/60 bg-primary-100/80 px-3 py-1 text-xs font-medium text-primary-900"
                >
                  {dimension}
                </span>
              ))}
            </div>

            <p className="text-center text-sm leading-relaxed text-muted">
              Tus respuestas son estrictamente confidenciales y se analizan de
              forma estadística agregada. Al finalizar, obtendrás el diagnóstico
              por dimensión junto con{" "}
              <span className="font-medium text-primary-800">
                infografías y recomendaciones descargables en PDF
              </span>
              .
            </p>
          </div>

          {/* Filtro / Declaración de participación (Criterio: asegurar que contesten mujeres) */}
          <div className="mx-auto mt-4 w-full max-w-lg rounded-2xl border border-primary-200 bg-primary-50/70 p-4 text-left transition-colors">
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm-woman"
                checked={isConfirmedWoman}
                onChange={(e) => setIsConfirmedWoman(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer text-primary-700"
              />
              <Label
                htmlFor="confirm-woman"
                className="text-xs sm:text-sm font-medium text-primary-700 leading-snug cursor-pointer select-none"
              >
                Confirmo que soy mujer y actualmente laboro (o he laborado
                recientemente) en el sector turístico, y acepto participar de
                forma voluntaria y anónima.
              </Label>
            </div>
          </div>

          {/* Acciones Principales */}
          <div className="mt-4 flex flex-col items-center gap-4">
            <Button
              size="lg"
              disabled={!isConfirmedWoman}
              onClick={handleStartTest}
              className="w-full bg-primary-700 px-8 shadow-card transition-all hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 disabled:opacity-50 sm:w-auto"
            >
              Comenzar el test
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href="/dashboard"
                className="font-semibold text-primary-800 underline decoration-primary-400 underline-offset-4 transition-colors hover:text-primary-900"
              >
                Consultar resultados agregados y datos
              </Link>

              <span className="hidden text-border-2 sm:inline">|</span>

              <ProjectCreditsModal
                className="font-medium text-muted underline decoration-border-2 underline-offset-4 transition-colors hover:text-primary-800"
                label="Equipo de investigación y desarrollo"
              />
            </div>
          </div>
        </Card>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
