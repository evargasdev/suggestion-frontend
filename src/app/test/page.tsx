"use client";

import { Button, Progress } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  DemographicsSection,
  type DemographicsData,
} from "@/components/DemographicsSection";
import { QuestionsSection } from "@/components/QuestionsSection";
import { useActiveSurvey } from "@/hooks/useActiveSurvey";
import { useSubmitEvaluation } from "@/hooks/useSubmitEvaluation";
import type {
  EvaluationDemographicsInput,
  SurveyQuestion,
} from "@/lib/api/evaluations";
import {
  activityTypes,
  ageRanges,
  careResponsibilityOptions,
  genderIdentities,
  mexicanStates,
  positions,
  sectors,
  vulnerableGroupOptions,
} from "@/lib/helpers/selectorData";

const initialDemographics: DemographicsData = {
  ageRange: "",
  genderIdentity: "",
  vulnerableGroups: [],
  origin: "",
  foreignCountry: "",
  hasCareResponsibilities: false,
  careResponsibilitiesDetails: [],
  activityType: "",
  sector: "",
  position: "",
};

function isCompleteDemographics(demographics: DemographicsData): boolean {
  const origin =
    demographics.origin === "Extranjera"
      ? demographics.foreignCountry.trim()
      : demographics.origin;

  return Boolean(
    demographics.ageRange &&
      demographics.genderIdentity &&
      origin &&
      demographics.activityType &&
      demographics.sector &&
      demographics.position &&
      (!demographics.hasCareResponsibilities ||
        demographics.careResponsibilitiesDetails.length > 0),
  );
}

export default function TestPage() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const { survey, isLoading, error } = useActiveSurvey();
  const { isSubmitting, error: submitError, submit } = useSubmitEvaluation();
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(-1);
  const [demographics, setDemographics] =
    useState<DemographicsData>(initialDemographics);
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

  const currentDimension =
    currentDimensionIndex >= 0
      ? survey.dimensions[currentDimensionIndex]
      : null;
  const totalSteps = survey.dimensions.length + 1;
  const progressPercentage = Math.round(
    ((currentDimensionIndex + 2) / totalSteps) * 100,
  );

  const missingRequired = (questions: SurveyQuestion[]): SurveyQuestion[] =>
    questions.filter((question) => question.isRequired && !answers[question.id]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: answerId,
    }));
    setValidationMessage(null);
  };

  const handleNext = () => {
    if (currentDimensionIndex < 0) {
      if (!isCompleteDemographics(demographics)) {
        setValidationMessage(
          "Completa los datos generales y selecciona al menos una responsabilidad de cuidado si respondiste que sí.",
        );
        return;
      }

      setValidationMessage(null);
      setCurrentDimensionIndex(0);
      scrollToTop();
      return;
    }

    if (
      currentDimension &&
      missingRequired(currentDimension.questions).length > 0
    ) {
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
    setCurrentDimensionIndex((index) => Math.max(-1, index - 1));
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
    const submittedDemographics: EvaluationDemographicsInput = {
      ageRange: demographics.ageRange,
      genderIdentity: demographics.genderIdentity,
      vulnerableGroups: demographics.vulnerableGroups,
      origin:
        demographics.origin === "Extranjera"
          ? demographics.foreignCountry.trim()
          : demographics.origin,
      hasCareResponsibilities: demographics.hasCareResponsibilities,
      careResponsibilitiesDetails: demographics.careResponsibilitiesDetails,
      activityType: demographics.activityType,
      sector: demographics.sector,
      position: demographics.position,
    };

    const evaluationId = await submit({
      demographics: submittedDemographics,
      answers: Object.entries(answers).map(([questionId, answerId]) => ({
        questionId,
        answerId,
      })),
    });

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
              {currentDimension
                ? `Dimensión ${currentDimensionIndex + 1} de ${survey.dimensions.length}`
                : "Datos generales"}
            </span>
            <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-primary-900">
              {progressPercentage}%
            </span>
          </div>
          <Progress progress={progressPercentage} size="sm" />
        </div>
      </header>

      {currentDimension ? (
        <QuestionsSection
          currentDimension={currentDimension}
          answers={answers}
          onSelectAnswer={handleSelectAnswer}
        />
      ) : (
        <DemographicsSection
          demographics={demographics}
          onChangeDemographics={setDemographics}
          ageRanges={ageRanges}
          genderIdentities={genderIdentities}
          vulnerableGroupOptions={vulnerableGroupOptions}
          mexicanStates={mexicanStates}
          careResponsibilityOptions={careResponsibilityOptions}
          activityTypes={activityTypes}
          sectors={sectors}
          positions={positions}
        />
      )}

      {(validationMessage || submitError) && (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {validationMessage ?? submitError}
        </p>
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-(--border) bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <Button
            color="gray"
            onClick={handlePrev}
            disabled={currentDimensionIndex < 0 || isSubmitting}
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
              {currentDimensionIndex < 0 ? "Continuar" : "Siguiente"}
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