import { request } from "@/lib/api/http/client";

export interface SurveyAnswerOption {
  id: string;
  label: string;
  sortOrder: number;
}

export interface SurveyQuestion {
  id: string;
  label: string;
  helperText?: string;
  sortOrder: number;
  isRequired: boolean;
  answers: SurveyAnswerOption[];
}

export interface SurveyDimension {
  id: string;
  label: string;
  sortOrder: number;
  questions: SurveyQuestion[];
}

export interface SurveyResponse {
  dimensions: SurveyDimension[];
}

export interface EvaluationAnswerInput {
  questionId: string;
  answerId: string;
}

export interface EvaluationCreatedResponse {
  id: string;
  date: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:4000";

export async function getActiveSurvey(): Promise<SurveyResponse> {
  const { data } = await request<SurveyResponse>({
    baseUrl: API_BASE_URL,
    path: "/api/evaluations/survey",
  });

  if (!data || !Array.isArray(data.dimensions)) {
    throw new Error("La encuesta recibida no tiene un formato válido.");
  }

  const dimensions = [...data.dimensions]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((dimension) => ({
      ...dimension,
      questions: [...dimension.questions]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((question) => {
          const answers = [...question.answers].sort(
            (left, right) => left.sortOrder - right.sortOrder,
          );
          if (answers.length !== 4) {
            throw new Error(
              `La pregunta "${question.label}" debe tener exactamente cuatro opciones de respuesta.`,
            );
          }

          return { ...question, answers };
        }),
    }));

  return { dimensions };
}

export async function submitEvaluation(
  answers: EvaluationAnswerInput[],
): Promise<EvaluationCreatedResponse> {
  const { data } = await request<EvaluationCreatedResponse>({
    baseUrl: API_BASE_URL,
    path: "/api/evaluations",
    method: "POST",
    body: { answers },
  });

  if (!data || typeof data.id !== "string" || data.id.trim() === "") {
    throw new Error("La API no devolvió el identificador de la evaluación.");
  }

  return data;
}
