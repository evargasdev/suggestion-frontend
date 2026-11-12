import { Tooltip } from "flowbite-react/components/Tooltip";

export interface AnswerOption {
  id: string;
  label: string;
  isNotApplicable?: boolean;
}

export interface Question {
  id: string;
  label: string;
  isRequired?: boolean;
  helperText?: string;
  answers: AnswerOption[];
}

export interface Dimension {
  label: string;
  questions: Question[];
}

interface DimensionQuestionsSectionProps {
  currentDimension: Dimension;
  answers: Record<string, string>;
  invalidQuestionId: string | null;
  onSelectAnswer: (questionId: string, answerId: string) => void;
}

export function QuestionsSection({
  currentDimension,
  answers,
  invalidQuestionId,
  onSelectAnswer,
}: DimensionQuestionsSectionProps) {
  return (
    <>
      <section className="mb-4 mt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
          Sección actual
        </span>
        <h2 className="text-xl font-bold text-gray-900">
          {currentDimension.label}
        </h2>
      </section>

      <ol className="space-y-6">
        {currentDimension.questions.map((question, questionIndex) => (
          <li
            key={question.id}
            id={`question-${question.id}`}
            className={`space-y-3 rounded-xl border p-4 transition-all duration-200 ${
              answers[question.id]
                ? "border-purple-200 bg-purple-50/30"
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
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    i
                  </button>
                </Tooltip>
              )}
            </div>

            <div
              aria-label={`Respuesta para la pregunta ${questionIndex + 1}`}
              className={`grid w-full gap-2 pt-1 ${
                question.answers.length > 4
                  ? "grid-cols-2 sm:grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-4"
              }`}
              aria-describedby={
                invalidQuestionId === question.id
                  ? `question-${question.id}-error`
                  : undefined
              }
              aria-invalid={invalidQuestionId === question.id}
              role="group"
            >
              {question.answers.map((answer) => {
                const isSelected = answers[question.id] === answer.id;

                return (
                  <button
                    key={answer.id}
                    type="button"
                    aria-label={answer.label}
                    aria-pressed={isSelected}
                    onClick={() => onSelectAnswer(question.id, answer.id)}
                    className={`min-h-11 w-full rounded-lg px-2 py-2.5 text-xs font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 ${
                      answer.isNotApplicable
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        : "bg-purple-100 text-purple-950 hover:bg-purple-200"
                    } ${
                      isSelected
                        ? "scale-[1.02] ring-2 ring-purple-800 ring-offset-2"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    {answer.label}
                  </button>
                );
              })}
            </div>
            {invalidQuestionId === question.id && (
              <p
                id={`question-${question.id}-error`}
                className="text-sm font-medium text-red-700"
                role="alert"
              >
                Responde esta pregunta obligatoria para continuar.
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}