"use client";

import { useRef, useState } from "react";

import {
  submitEvaluation,
  type EvaluationSubmissionInput,
} from "@/lib/api/evaluations";

interface SubmitEvaluationState {
  isSubmitting: boolean;
  error: string | null;
  submit: (submission: EvaluationSubmissionInput) => Promise<string | null>;
}

export function useSubmitEvaluation(): SubmitEvaluationState {
  const submissionInProgress = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    submission: EvaluationSubmissionInput,
  ): Promise<string | null> => {
    if (submissionInProgress.current) {
      return null;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      const evaluation = await submitEvaluation(submission);
      return evaluation.id;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No fue posible enviar tus respuestas.",
      );
      return null;
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, submit };
}
