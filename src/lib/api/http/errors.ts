import { ApiErrorBody } from "@/types/api/errors";

export const NETWORK_ERROR_MESSAGE = "No se pudo contactar el servicio.";
export const TIMEOUT_ERROR_MESSAGE = "El servicio tardó demasiado en responder.";
export const INVALID_RESPONSE_MESSAGE = "Respuesta inválida del servicio.";
export const INTERNAL_ERROR_MESSAGE = "Error interno.";

const FALLBACK_ERROR_STATUS = 502;
const DEFAULT_ERROR_MESSAGE = "Error desconocido";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ErrorBody = Partial<Pick<ApiErrorBody, "statusCode" | "message">>;

function isValidHttpStatus(status: unknown): status is number {
  return (
    typeof status === "number" &&
    Number.isInteger(status) &&
    status >= 400 &&
    status <= 599
  );
}

function resolveStatus(
  httpStatus: number | undefined,
  body: ErrorBody | null | undefined,
): number {
  if (isValidHttpStatus(httpStatus)) return httpStatus;
  if (isValidHttpStatus(body?.statusCode)) return body.statusCode;
  return FALLBACK_ERROR_STATUS;
}

export function parseApiError(
  body: ErrorBody | null | undefined,
  httpStatus?: number,
): ApiError {
  const status = resolveStatus(httpStatus, body);
  const rawMessage = body?.message;
  const message = Array.isArray(rawMessage) ? rawMessage[0] : rawMessage;
  return new ApiError(status, message ?? DEFAULT_ERROR_MESSAGE);
}
