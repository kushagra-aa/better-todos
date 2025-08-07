import { PartialBy } from "@/types/helpertypes";
import { ErrorResponseType, SuccessResponseType } from "@/types/Response.type";
import { NextResponse } from "next/server";

export const sendAPIError = (error: PartialBy<ErrorResponseType, "status">) => {
  const status = error.status || 500;
  const resp = {
    ...error,
    status,
  };
  return new NextResponse(JSON.stringify(resp), { status });
};
export const sendAPIResponse = (
  data: PartialBy<SuccessResponseType, "status">
) => {
  const status = data.status || 200;
  const resp = {
    ...data,
    status,
  };
  return new NextResponse(JSON.stringify(resp), { status });
};
