import { NextResponse } from "next/server";

import { request } from "@/lib/api/http/client";
import { toErrorResponse } from "@/lib/api/http/errors.server";
import { readJsonBody, noStoreJson } from "@/lib/api/http/route.server";
import { getApiBaseUrl } from "@/lib/api/config";

export async function POST(requestFromClient: Request): Promise<NextResponse> {
  try {
    const body = await readJsonBody(requestFromClient);
    const { data, status } = await request<unknown>({
      baseUrl: getApiBaseUrl(),
      path: "/api/evaluations",
      method: "POST",
      body,
    });

    return noStoreJson(data, status);
  } catch (error) {
    return toErrorResponse(error);
  }
}
