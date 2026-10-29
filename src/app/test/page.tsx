"use client";

import { Button, Progress, Tooltip } from "flowbite-react";
import { FC, useRef, useState } from "react";

interface Question {
  id: number;
  text: string;
  helperText?: string;
}

const dimensions = [
  "Comunicación",
  "Trabajo en equipo",
  "Liderazgo",
  "Adaptabilidad",
  "Resolución de problemas",
];

const questions: Question[] = [
  {
    id: 1,
    text: "Expreso mis ideas de forma clara y respetuosa.",
    helperText:
      "Considera si utilizas un lenguaje adecuado y mantienes la calma al hablar con superiores o compañeros.",
  },
  {
    id: 2,
    text: "Escucho activamente las opiniones de otras personas.",
  },
  {
    id: 3,
    text: "Comparto la información necesaria a tiempo.",
    helperText:
      "Aplica para avisos sobre cambios de turno, reportes de fallas o comunicados en tu área.",
  },
  {
    id: 4,
    text: "Colaboro con mis compañeros para alcanzar objetivos comunes.",
  },
  {
    id: 5,
    text: "Cumplo con los compromisos que asumo dentro del equipo.",
  },
  {
    id: 6,
    text: "Tomo la iniciativa cuando se necesita resolver una situación.",
  },
  {
    id: 7,
    text: "Me adapto con disposición a cambios en las prioridades o procesos.",
  },
  {
    id: 8,
    text: "Mantengo una actitud constructiva ante los retos y los cambios.",
  },
  {
    id: 9,
    text: "Analizo las causas de un problema antes de proponer una solución.",
  },
  {
    id: 10,
    text: "Busco soluciones prácticas y doy seguimiento hasta resolver los problemas.",
  },
];

const ratings = [
  { value: 1, label: "--", color: "bg-red-700 hover:bg-red-800" },
  { value: 2, label: "-", color: "bg-red-500 hover:bg-red-600" },
  { value: 3, label: "+", color: "bg-green-500 hover:bg-green-600" },
  { value: 4, label: "++", color: "bg-green-700 hover:bg-green-800" },
];

const TestPage: FC = () => {
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const topRef = useRef<HTMLDivElement>(null);

  const currentDimension = dimensions[currentDimensionIndex];
  const progressPercentage = Math.round(
    ((currentDimensionIndex + 1) / dimensions.length) * 100
  );

  const handleNext = () => {
    if (currentDimensionIndex < dimensions.length - 1) {
      setCurrentDimensionIndex((prev) => prev + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex((prev) => prev - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Respuestas enviadas:", answers);
  };

  return (
    <div ref={topRef} className="mx-auto max-w-md p-4 pb-28 pt-20">
      {/* Header de Progreso Superior */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span className="truncate">
              Dimensión {currentDimensionIndex + 1} de {dimensions.length}
            </span>
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
              {progressPercentage}%
            </span>
          </div>
          <Progress progress={progressPercentage} color="blue" size="sm" />
        </div>
      </header>

      {/* Título de la Dimensión Actual */}
      <section className="mb-4 mt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Sección Actual
        </span>
        <h2 className="text-xl font-bold text-gray-900">{currentDimension}</h2>
      </section>

      {/* Lista de Preguntas */}
      <ol className="space-y-6">
        {questions.map((q, questionIndex) => {
          const answerKey = `${currentDimensionIndex}-question-${questionIndex}`;
          const isSelected = answers[answerKey] !== undefined;

          return (
            <li
              key={q.text}
              className={`space-y-3 rounded-xl border p-4 transition-all duration-200 ${
                isSelected
                  ? "border-blue-200 bg-blue-50/20"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Encabezado de Pregunta con Tooltip de Flowbite */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-relaxed text-gray-800">
                  <span className="mr-1 font-bold text-gray-900">
                    {questionIndex + 1}.
                  </span>{" "}
                  {q.text}
                </p>

                {q.helperText && (
                  <Tooltip content={q.helperText} style="dark">
                    <button
                      type="button"
                      aria-label="Información adicional sobre esta pregunta"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      i
                    </button>
                  </Tooltip>
                )}
              </div>

              {/* Botones de Likert */}
              <div
                className="grid w-full grid-cols-4 gap-2 pt-1"
                role="group"
                aria-label={`Respuesta para la pregunta ${questionIndex + 1}`}
              >
                {ratings.map((rating) => {
                  const active = answers[answerKey] === rating.value;
                  return (
                    <button
                      key={rating.value}
                      type="button"
                      aria-label={rating.label}
                      aria-pressed={active}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [answerKey]: rating.value,
                        }))
                      }
                      className={`w-full rounded-lg px-3 py-2.5 font-bold text-white shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
                        rating.color
                      } ${
                        active
                          ? "scale-105 ring-2 ring-gray-900 ring-offset-2"
                          : "opacity-90 hover:opacity-100"
                      }`}
                    >
                      {rating.label}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Controles de Navegación Inferiores */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <Button
            color="gray"
            onClick={handlePrev}
            disabled={currentDimensionIndex === 0}
            className="w-1/2"
          >
            Anterior
          </Button>

          {currentDimensionIndex < dimensions.length - 1 ? (
            <Button color="blue" onClick={handleNext} className="w-1/2">
              Siguiente
            </Button>
          ) : (
            <Button color="green" onClick={handleSubmit} className="w-1/2">
              Finalizar Test
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default TestPage;