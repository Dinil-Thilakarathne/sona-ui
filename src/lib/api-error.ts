import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

type ApiErrorOptions = {
  code: ApiErrorCode;
  message: string;
  resolution: string;
  status: number;
};

export function apiErrorBody({ code, message, resolution }: ApiErrorOptions) {
  return {
    error: {
      code,
      message,
      resolution,
    },
  };
}

export function apiError(options: ApiErrorOptions) {
  return NextResponse.json(apiErrorBody(options), { status: options.status });
}
