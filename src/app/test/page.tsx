"use client";

import { Button, Progress } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  DemographicsSection,
  type DemographicsData,
  type DemographicsField,
  getMissingDemographicsField,
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

export default function TestPage() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const { survey, isLoading, error } = useActiveSurvey();
  const { isSubmitting, error: submitError, submit } = useSubmitEvaluation();
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(-1);
  const [demographics, setDemographics] =
    useState<DemographicsData>(initialDemographics);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [invalidQuestionId, setInvalidQuestionId] = useState<string | null>(
    null,
  );
  const [invalidDemographicsField, setInvalidDemographicsField] =
    useState<DemographicsField | null>(null);

  useEffect(() => {
    if (invalidQuestionId) {
      const question = document.getElementById(`question-${invalidQuestionId}`);
      question?.scrollIntoView({ behavior: "smooth", block: "center" });
      question
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
      return;
    }

    if (invalidDemographicsField) {
      const field = document.getElementById(
        `demographics-${invalidDemographicsField}`,
      );
      field?.scrollIntoView({ behavior: "smooth", block: "center" });
      field?.focus({ preventScroll: true });
    }
  }, [invalidQuestionId, invalidDemographicsField, currentDimensionIndex]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
          <p className="font-medium text-purple-900">Cargando encuesta...</p>
        </div>
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
    questions.filter(
      (question) => question.isRequired && !answers[question.id],
    );

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: answerId,
    }));
    setInvalidQuestionId(null);
  };

  const handleNext = () => {
    if (currentDimensionIndex < 0) {
      const missingField = getMissingDemographicsField(demographics);
      if (missingField) {
        setInvalidDemographicsField(missingField);
        return;
      }

      setInvalidDemographicsField(null);
      setInvalidQuestionId(null);
      setCurrentDimensionIndex(0);
      scrollToTop();
      return;
    }

    const unanswered = currentDimension
      ? missingRequired(currentDimension.questions)
      : [];
    if (unanswered.length > 0) {
      setInvalidDemographicsField(null);
      setInvalidQuestionId(unanswered[0].id);
      return;
    }

    setInvalidQuestionId(null);
    setInvalidDemographicsField(null);
    setCurrentDimensionIndex((index) => index + 1);
    scrollToTop();
  };

  const handlePrev = () => {
    setInvalidQuestionId(null);
    setInvalidDemographicsField(null);
    setCurrentDimensionIndex((index) => Math.max(-1, index - 1));
    scrollToTop();
  };

  const handleSubmit = async () => {
    const unanswered = survey.dimensions.flatMap((dimension) =>
      missingRequired(dimension.questions),
    );

    if (unanswered.length > 0) {
      const unansweredQuestion = unanswered[0];
      const dimensionIndex = survey.dimensions.findIndex((dimension) =>
        dimension.questions.some(
          (question) => question.id === unansweredQuestion.id,
        ),
      );
      setInvalidDemographicsField(null);
      setInvalidQuestionId(unansweredQuestion.id);
      setCurrentDimensionIndex(dimensionIndex);
      return;
    }

    setInvalidQuestionId(null);
    setInvalidDemographicsField(null);
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
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-purple-100 bg-white/90 p-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span className="truncate">
              {currentDimension
                ? `Dimensión ${currentDimensionIndex + 1} de ${survey.dimensions.length}`
                : "Datos generales"}
            </span>
            <span className="ml-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-900">
              {progressPercentage}%
            </span>
          </div>
          <Progress progress={progressPercentage} size="sm" color="purple" />
        </div>
      </header>

      {currentDimension ? (
        <QuestionsSection
          currentDimension={currentDimension}
          answers={answers}
          invalidQuestionId={invalidQuestionId}
          onSelectAnswer={handleSelectAnswer}
        />
      ) : (
        <DemographicsSection
          demographics={demographics}
          invalidField={invalidDemographicsField}
          onChangeDemographics={(update) => {
            setDemographics(update);
            setInvalidDemographicsField(null);
          }}
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

      {submitError && (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {submitError}
        </p>
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-purple-100 bg-white/90 p-4 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <Button
            color="light"
            onClick={handlePrev}
            disabled={currentDimensionIndex < 0 || isSubmitting}
            className="w-1/2 border-gray-300 text-gray-700"
          >
            Anterior
          </Button>

          {currentDimensionIndex < survey.dimensions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="w-1/2 bg-purple-700 hover:bg-purple-800 focus:ring-purple-300"
            >
              {currentDimensionIndex < 0 ? "Continuar" : "Siguiente"}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-1/2 bg-purple-900 hover:bg-purple-950 focus:ring-purple-300"
            >
              {isSubmitting ? "Enviando..." : "Finalizar test"}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
