import {
  ApiError,
  INVALID_RESPONSE_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  TIMEOUT_ERROR_MESSAGE,
  parseApiError,
} from "@/lib/api/http/errors";
import type {
  ApiResult,
  FormDataRequestOptions,
  HttpMethod,
  RequestOptions,
} from "@/lib/api/http/types";
import { ApiErrorBody } from "@/types/api/errors";

const DEFAULT_TIMEOUT_MS = 10_000;
const BAD_GATEWAY_STATUS = 502;

function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export { joinUrl };

function buildJsonHeaders(
  body: unknown,
  headers: HeadersInit | undefined,
): Headers {
  const result = new Headers(headers);
  if (body !== undefined && !result.has("Content-Type")) {
    result.set("Content-Type", "application/json");
  }
  return result;
}

function isTimeoutError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: unknown }).name === "TimeoutError"
  );
}

async function readErrorBody(response: Response): Promise<ApiErrorBody | null> {
  return (await response.json().catch(() => null)) as ApiErrorBody | null;
}

async function readSuccessBody<T>(response: Response): Promise<T> {
  const text = await response.text().catch(() => null);
  if (text === null || text.trim() === "") {
    throw new ApiError(BAD_GATEWAY_STATUS, INVALID_RESPONSE_MESSAGE);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError(BAD_GATEWAY_STATUS, INVALID_RESPONSE_MESSAGE);
  }
}

interface FetchOptions {
  baseUrl: string;
  path: string;
  method: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
  timeoutMs: number;
  redirect?: RequestRedirect;
}

async function fetchWithTimeout({
  baseUrl,
  path,
  method,
  headers,
  body,
  timeoutMs,
  redirect,
}: FetchOptions): Promise<Response> {
  try {
    return await fetch(joinUrl(baseUrl, path), {
      method,
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
      redirect,
    });
  } catch (error) {
    throw new ApiError(
      BAD_GATEWAY_STATUS,
      isTimeoutError(error) ? TIMEOUT_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE,
    );
  }
}

async function toApiResult<T>(response: Response): Promise<ApiResult<T>> {
  if (response.status >= 300 && response.status < 400) {
    throw new ApiError(BAD_GATEWAY_STATUS, INVALID_RESPONSE_MESSAGE);
  }

  if (!response.ok) {
    throw parseApiError(await readErrorBody(response), response.status);
  }

  if (response.status === 204) {
    return { data: undefined, status: response.status };
  }

  return {
    data: await readSuccessBody<T>(response),
    status: response.status,
  };
}

/**
 * Cliente HTTP isomorfo. No conoce sesión, cookies ni auth-store: solo
 * ejecuta la petición y traduce la respuesta a `ApiResult` o `ApiError`.
 */
export async function request<T>({
  baseUrl,
  path,
  method = "GET",
  body,
  headers,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: RequestOptions): Promise<ApiResult<T>> {
  const response = await fetchWithTimeout({
    baseUrl,
    path,
    method,
    headers: buildJsonHeaders(body, headers),
    body: body === undefined ? undefined : JSON.stringify(body),
    timeoutMs,
    redirect: "manual",
  });

  return toApiResult<T>(response);
}

/**
 * Variante multipart: no fija `Content-Type` para que `fetch` agregue el
 * boundary del `FormData`.
 */
export async function requestFormData<T>({
  baseUrl,
  path,
  method = "POST",
  formData,
  headers,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: FormDataRequestOptions): Promise<ApiResult<T>> {
  const response = await fetchWithTimeout({
    baseUrl,
    path,
    method,
    headers,
    body: formData,
    timeoutMs,
    redirect: "manual",
  });

  return toApiResult<T>(response);
}
