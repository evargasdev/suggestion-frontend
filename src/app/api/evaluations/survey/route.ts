import { NextResponse } from "next/server";

import { request } from "@/lib/api/http/client";
import { toErrorResponse } from "@/lib/api/http/errors.server";
import { noStoreJson } from "@/lib/api/http/route.server";
import { getApiBaseUrl } from "@/lib/api/config";

export async function GET(): Promise<NextResponse> {
  try {
    const { data, status } = await request<unknown>({
      baseUrl: getApiBaseUrl(),
      path: "/api/evaluations/survey",
    });

    return noStoreJson(data, status);
  } catch (error) {
    return toErrorResponse(error);
  }
}
