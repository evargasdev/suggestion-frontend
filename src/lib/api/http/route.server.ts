import "server-only";

import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/http/errors";

const MAX_JSON_BODY_BYTES = 16 * 1024;

// Utilidades compartidas por los route handlers de /api/*.

export async function readJsonBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_JSON_BODY_BYTES) {
    throw new ApiError(413, "Cuerpo demasiado grande.");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError(400, "Cuerpo inválido.");
  }
}

export function noStoreJson(data: unknown, status: number): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function getClientMeta(request: Request): {
  ipAddress: string;
  userAgent: string;
} {
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return { ipAddress, userAgent };
}
