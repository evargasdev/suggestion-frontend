import "server-only";

import { NextResponse } from "next/server";

import { ApiError, INTERNAL_ERROR_MESSAGE } from "@/lib/api/http/errors";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

const INTERNAL_ERROR_STATUS = 500;

export function toErrorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { statusCode: error.status, message: error.message },
      { status: error.status, headers: NO_STORE_HEADERS },
    );
  }

  console.error(error);

  return NextResponse.json(
    { statusCode: INTERNAL_ERROR_STATUS, message: INTERNAL_ERROR_MESSAGE },
    { status: INTERNAL_ERROR_STATUS, headers: NO_STORE_HEADERS },
  );
}
