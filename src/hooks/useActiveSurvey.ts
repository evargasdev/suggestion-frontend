"use client";

import { useEffect, useState } from "react";

import { getActiveSurvey } from "@/lib/api/evaluations";
import type { SurveyResponse } from "@/lib/api/evaluations";

interface ActiveSurveyState {
  survey: SurveyResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useActiveSurvey(): ActiveSurveyState {
  const [state, setState] = useState<ActiveSurveyState>({
    survey: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getActiveSurvey()
      .then((survey) => {
        if (active) {
          setState({ survey, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            survey: null,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "No fue posible cargar la encuesta.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
