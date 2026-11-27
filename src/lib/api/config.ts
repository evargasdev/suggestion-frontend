const DEFAULT_API_BASE_URL = "http://localhost:4000";

export function getApiBaseUrl(): string {
  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/+$/, "");
}

export function getApiRequestBaseUrl(): string {
  return typeof window === "undefined" ? getApiBaseUrl() : "";
}
