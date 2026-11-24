import { request } from "@/lib/api/http/client";

export interface SurveyAnswerOption {
  id: string;
  label: string;
  sortOrder: number;
  isNotApplicable: boolean;
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

export interface EvaluationDemographicsInput {
  ageRange: string;
  genderIdentity: string;
  vulnerableGroups: string[];
  origin: string;
  hasCareResponsibilities: boolean;
  careResponsibilitiesDetails: string[];
  activityType: string;
  sector: string;
  position: string;
}

export interface EvaluationSubmissionInput {
  demographics: EvaluationDemographicsInput;
  answers: EvaluationAnswerInput[];
}

export interface EvaluationCreatedResponse {
  id: string;
  date: string;
}

export interface DashboardStat {
  sector: string;
  position: string;
  dimensionId: string;
  dimensionLabel: string;
  averageScore: number;
  evaluationCount: number;
}

export interface DashboardClassificationStat {
  dimensionId: string;
  dimensionLabel: string;
  classification: string;
  evaluationCount: number;
}

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:4000"
).replace(/\/+$/, "");

export async function getActiveSurvey(): Promise<SurveyResponse> {
  console.log(API_BASE_URL)
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
      questions: [...(dimension.questions ?? [])]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((question) => {
          const answers = [...(question.answers ?? [])].sort(
            (left, right) => left.sortOrder - right.sortOrder,
          );
          if (answers.length === 0) {
            throw new Error(
              `La pregunta "${question.label}" no tiene opciones de respuesta.`,
            );
          }

          return { ...question, answers };
        }),
    }));

  return { dimensions };
}

export async function submitEvaluation(
  submission: EvaluationSubmissionInput,
): Promise<EvaluationCreatedResponse> {
  const { data } = await request<EvaluationCreatedResponse>({
    baseUrl: API_BASE_URL,
    path: "/api/evaluations",
    method: "POST",
    body: submission,
  });

  if (!data || typeof data.id !== "string" || data.id.trim() === "") {
    throw new Error("La API no devolvió el identificador de la evaluación.");
  }

  return data;
}

export async function getDashboardStats(): Promise<DashboardStat[]> {
  const { data } = await request<DashboardStat[]>({
    baseUrl: API_BASE_URL,
    path: "/api/evaluations/dashboard",
  });

  if (!Array.isArray(data)) {
    throw new Error("Los resultados agregados recibidos no tienen un formato válido.");
  }

  return data;
}

export async function getDashboardClassificationStats(): Promise<
  DashboardClassificationStat[]
> {
  const { data } = await request<DashboardClassificationStat[]>({
    baseUrl: API_BASE_URL,
    path: "/api/evaluations/dashboard/classifications",
  });

  if (!Array.isArray(data)) {
    throw new Error(
      "La distribución de resultados recibida no tiene un formato válido.",
    );
  }

  return data;
}
