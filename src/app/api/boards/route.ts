import { sendAPIResponse } from "@/utils/backendHelpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = request.headers.get("x-user-email");
  return sendAPIResponse({
    data: user,
    count: 1,
    page: 1,
    pageSize: 10,
    message: "User Successfully Added",
    status: 201,
  });
}
