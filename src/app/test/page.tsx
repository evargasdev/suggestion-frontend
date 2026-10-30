"use client";

import { Button, Progress, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { useActiveSurvey } from "@/hooks/useActiveSurvey";
import { useSubmitEvaluation } from "@/hooks/useSubmitEvaluation";
import type { SurveyQuestion } from "@/lib/api/evaluations";

const ratingPresentation = [
  {
    label: "--",
    color: "bg-red-700 text-white hover:bg-red-800",
    selectedColor: "border-red-900 ring-red-900",
  },
  {
    label: "-",
    color: "bg-red-500 text-white hover:bg-red-600",
    selectedColor: "border-red-800 ring-red-800",
  },
  {
    label: "+",
    color: "bg-green-500 text-white hover:bg-green-600",
    selectedColor: "border-green-800 ring-green-800",
  },
  {
    label: "++",
    color: "bg-green-700 text-white hover:bg-green-800",
    selectedColor: "border-green-900 ring-green-900",
  },
];

export default function TestPage() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const { survey, isLoading, error } = useActiveSurvey();
  const { isSubmitting, error: submitError, submit } = useSubmitEvaluation();
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <p className="font-medium text-[var(--muted)]">Cargando encuesta...</p>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-xl font-bold text-[var(--foreground)]">
          No se pudo cargar la encuesta
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {error ?? "La encuesta no está disponible en este momento."}
        </p>
        <Button
          color="gray"
          onClick={() => window.location.reload()}
          className="mt-5"
        >
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (survey.dimensions.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-xl font-bold text-[var(--foreground)]">
          Encuesta no disponible
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          No hay dimensiones activas para responder.
        </p>
      </div>
    );
  }

  const currentDimension = survey.dimensions[currentDimensionIndex];
  const progressPercentage = Math.round(
    ((currentDimensionIndex + 1) / survey.dimensions.length) * 100,
  );

  const missingRequired = (questions: SurveyQuestion[]): SurveyQuestion[] =>
    questions.filter(
      (question) => question.isRequired && !answers[question.id],
    );

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (missingRequired(currentDimension.questions).length > 0) {
      setValidationMessage(
        "Responde todas las preguntas obligatorias para continuar.",
      );
      return;
    }

    setValidationMessage(null);
    setCurrentDimensionIndex((index) => index + 1);
    scrollToTop();
  };

  const handlePrev = () => {
    setValidationMessage(null);
    setCurrentDimensionIndex((index) => Math.max(0, index - 1));
    scrollToTop();
  };

  const handleSubmit = async () => {
    const unanswered = survey.dimensions.flatMap((dimension) =>
      missingRequired(dimension.questions),
    );

    if (unanswered.length > 0) {
      setValidationMessage(
        "Responde todas las preguntas obligatorias antes de finalizar.",
      );
      return;
    }

    setValidationMessage(null);
    const evaluationId = await submit(
      Object.entries(answers).map(([questionId, answerId]) => ({
        questionId,
        answerId,
      })),
    );

    if (evaluationId) {
      router.push(`/results?id=${encodeURIComponent(evaluationId)}`);
    }
  };

  return (
    <div ref={topRef} className="mx-auto max-w-md p-4 pb-28 pt-20">
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span className="truncate">
              Dimensión {currentDimensionIndex + 1} de{" "}
              {survey.dimensions.length}
            </span>
            <span className="ml-2 rounded-full bg-cyan-100 px-2 py-0.5 text-cyan-900">
              {progressPercentage}%
            </span>
          </div>
          <Progress progress={progressPercentage} color="blue" size="sm" />
        </div>
      </header>

      <section className="mb-4 mt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Sección Actual
        </span>
        <h2 className="text-xl font-bold text-gray-900">
          {currentDimension.label}
        </h2>
      </section>

      <ol className="space-y-6">
        {currentDimension.questions.map((question, questionIndex) => (
          <li
            key={question.id}
            className={`space-y-3 rounded-xl border p-4 transition-all duration-200 ${
              answers[question.id]
                ? "border-blue-200 bg-blue-50/20"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-relaxed text-gray-800">
                <span className="mr-1 font-bold text-gray-900">
                  {questionIndex + 1}.
                </span>{" "}
                {question.label}
                {question.isRequired && (
                  <span className="ml-1 text-red-600" aria-label="Obligatoria">
                    *
                  </span>
                )}
              </p>

              {question.helperText && (
                <Tooltip content={question.helperText} style="dark">
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
            <div
              aria-label={`Respuesta para la pregunta ${questionIndex + 1}`}
              className="grid w-full grid-cols-4 gap-2 pt-1"
              role="group"
            >
              {question.answers.map((answer, answerIndex) => {
                const presentation = ratingPresentation[answerIndex];
                const isSelected = answers[question.id] === answer.id;

                return (
                  <button
                    key={answer.id}
                    type="button"
                    aria-label={presentation.label}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: answer.id,
                      }));
                      setValidationMessage(null);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 font-bold text-white shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${presentation.color} ${
                      isSelected
                        ? `scale-105 ring-2 ring-offset-2 ${presentation.selectedColor}`
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    {presentation.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {(validationMessage || submitError) && (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {validationMessage ?? submitError}
        </p>
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--border)] bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <Button
            color="gray"
            onClick={handlePrev}
            disabled={currentDimensionIndex === 0 || isSubmitting}
            className="w-1/2"
          >
            Anterior
          </Button>

          {currentDimensionIndex < survey.dimensions.length - 1 ? (
            <Button
              color="blue"
              onClick={handleNext}
              disabled={isSubmitting}
              className="w-1/2"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              color="green"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-1/2"
            >
              {isSubmitting ? "Enviando..." : "Finalizar test"}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
