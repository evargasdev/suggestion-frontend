"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Label,
  Badge,
} from "flowbite-react";

export default function Home() {
  const router = useRouter();
  const [openCreditsModal, setOpenCreditsModal] = useState(false);
  const [isConfirmedWoman, setIsConfirmedWoman] = useState(false);

  const handleStartTest = () => {
    if (!isConfirmedWoman) return;
    router.push("/test");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Contenedor Principal */}
      <main className="my-auto mx-auto w-full max-w-3xl">
        <Card className="border border-purple-100 bg-white/75 backdrop-blur-2xl shadow-2xl shadow-purple-900/10 rounded-3xl p-2 sm:p-6 text-center">
          {/* Etiqueta / Nombre del Proyecto */}
          <div className="flex justify-center">
            <Badge
              color="purple"
              size="sm"
              className="px-3.5 py-1 text-xs font-semibold uppercase tracking-widest rounded-full"
            >
              Diagnóstico: Las mujeres en el trabajo turístico
            </Badge>
          </div>

          {/* Título Principal */}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Conoce tu <span className="text-purple-700">situación laboral</span>
          </h1>

          {/* Presentación y Explicación del Test */}
          <div className="mx-auto mt-2 max-w-2xl space-y-3 text-gray-600">
            <p className="text-base leading-relaxed sm:text-lg">
              Instrumento de diagnóstico anónimo diseñado para evaluar las
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
                  className="rounded-full bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-900 border border-purple-200/60"
                >
                  {dimension}
                </span>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-gray-500">
              Tus respuestas son estrictamente confidenciales y se analizan de
              forma estadística agregada. Al finalizar, obtendrás el diagnóstico
              por dimensión junto con{" "}
              <span className="font-medium text-purple-800">
                infografías y recomendaciones descargables en PDF
              </span>
              .
            </p>
          </div>

          {/* Filtro / Declaración de participación (Criterio: asegurar que contesten mujeres) */}
          <div className="mx-auto mt-4 w-full max-w-lg rounded-2xl border border-purple-200 bg-purple-50/70 p-4 text-left transition-colors">
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm-woman"
                checked={isConfirmedWoman}
                onChange={(e) => setIsConfirmedWoman(e.target.checked)}
                className="mt-1 text-purple-700 focus:ring-purple-600 cursor-pointer"
              />
              <Label
                htmlFor="confirm-woman"
                className="text-xs sm:text-sm font-medium text-primary-700 leading-snug cursor-pointer select-none dark:text-primary-300"
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
              className="w-full sm:w-auto px-8 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:opacity-50 transition-all shadow-md shadow-purple-700/20"
            >
              Comenzar el test
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href="/dashboard"
                className="font-semibold text-purple-800 underline decoration-purple-400 underline-offset-4 hover:text-purple-950 transition-colors"
              >
                Consultar resultados agregados y datos
              </Link>

              <span className="hidden sm:inline text-gray-300">|</span>

              <button
                type="button"
                onClick={() => setOpenCreditsModal(true)}
                className="font-medium text-gray-600 hover:text-purple-800 underline decoration-gray-300 underline-offset-4 transition-colors cursor-pointer"
              >
                Equipo de investigación y desarrollo
              </button>
            </div>
          </div>
        </Card>
      </main>

      {/* Pie de página institucional (UQROO + Créditos rápidos) */}
      <footer className="mt-10 mx-auto w-full max-w-4xl border-t border-purple-200/60 pt-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          {/* Logo e Institución */}
          <div className="flex items-center gap-3">
            {/* Reemplaza el src con la ruta real de tu logo en /public */}
            <img
              src="/images/logo-uqroo.svg"
              alt="Universidad Autónoma del Estado de Quintana Roo"
              className="h-11 w-auto object-contain"
            />
            <div className="text-left">
              <p className="font-bold text-gray-800">
                Universidad Autónoma del Estado de Quintana Roo
              </p>
              <p className="text-gray-500">
                Proyecto de Investigación — Mujeres y Turismo
              </p>
            </div>
          </div>

          {/* Enlace rápido al modal de contacto/créditos */}
          <div className="flex flex-col items-center sm:items-end gap-1">
            <button
              type="button"
              onClick={() => setOpenCreditsModal(true)}
              className="font-semibold text-purple-800 hover:text-purple-950 hover:underline cursor-pointer"
            >
              Créditos académicos y contacto institucional
            </button>
            <p className="text-[11px] text-gray-400">
              © 2026 Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Equipo de Investigación y Desarrollo */}
      <Modal
        show={openCreditsModal}
        onClose={() => setOpenCreditsModal(false)}
        size="lg"
        dismissible
      >
        <ModalHeader className="border-b border-purple-100">
          <span className="text-lg font-bold text-gray-900">
            Créditos del Proyecto
          </span>
        </ModalHeader>

        <ModalBody className="space-y-6">
          {/* Sección Investigadoras */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3">
              Investigación y Diseño del Instrumento
            </h3>
            <div className="space-y-3">
              {/* Investigadora 1 */}
              <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-3.5">
                <p className="font-semibold text-gray-900">
                  Dra. [Nombre y Apellidos de la Investigadora 1]
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Universidad Autónoma del Estado de Quintana Roo (UQROO)
                </p>
                <a
                  href="mailto:correo1@uqroo.edu.mx"
                  className="mt-1.5 inline-block text-xs font-medium text-purple-700 hover:underline"
                >
                  correo1@uqroo.edu.mx
                </a>
              </div>

              {/* Investigadora 2 */}
              <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-3.5">
                <p className="font-semibold text-gray-900">
                  Dra. [Nombre y Apellidos de la Investigadora 2]
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Universidad Autónoma del Estado de Quintana Roo (UQROO)
                </p>
                <a
                  href="mailto:correo2@uqroo.edu.mx"
                  className="mt-1.5 inline-block text-xs font-medium text-purple-700 hover:underline"
                >
                  correo2@uqroo.edu.mx
                </a>
              </div>
            </div>
          </div>

          {/* Sección Desarrollo Tecnológico */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3">
              Arquitectura y Desarrollo de Plataforma
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-3.5">
              <div>
                <p className="font-semibold text-gray-900">
                  Erick Daniel Vargas Corona
                </p>
                <p className="text-xs text-gray-600">
                  Ingeniería de Software & Desarrollo Full-Stack
                </p>
              </div>
              <a
                href="https://erickvargas.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-white px-3.5 py-2 text-xs font-semibold text-purple-800 shadow-xs hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                erickvargas.dev ↗
              </a>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="border-t border-gray-100 justify-end">
          <Button
            color="purple"
            size="sm"
            onClick={() => setOpenCreditsModal(false)}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}