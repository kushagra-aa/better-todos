import { checkUserSession } from "@/lib/session";
import { sendAPIError } from "@/utils/backendHelpers";
import { NextResponse } from "next/server";

export default async function middleware() {
  const response = NextResponse.next();
  const user = await checkUserSession();
  if (user) {
    response.headers.set("x-user-email", user.email);
    return response;
  }
  return sendAPIError({
    error: "Unauthorized",
    status: 401,
    message: "User is Unauthorized",
  });
}

export const config = {
  matcher: "/api/boards/:path*",
};
