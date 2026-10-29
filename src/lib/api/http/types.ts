export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Resultado exitoso con body parseado. */
export interface ApiSuccess<T> {
  data: T;
  status: number;
}

/** Resultado exitoso; `data` es `undefined` en respuestas 204. */
export interface ApiResult<T> {
  data: T | undefined;
  status: number;
}

export interface RequestOptions {
  baseUrl: string;
  path: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
}

export interface FormDataRequestOptions {
  baseUrl: string;
  path: string;
  method?: HttpMethod;
  formData: FormData;
  headers?: HeadersInit;
  timeoutMs?: number;
}
