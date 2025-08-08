import { checkUserSession, deleteUserSession } from "@/lib/session";
import { sendAPIError } from "@/utils/backendHelpers";
import { NextRequest, NextResponse } from "next/server";

const apiMiddleware = async (
  req: NextRequest,
  next: NextResponse<unknown>,
  user?: { email: string }
) => {
  if (user) {
    next.headers.set("x-user-email", user.email);
    return next;
  }
  await deleteUserSession();
  return sendAPIError({
    error: "Unauthorized",
    status: 401,
    message: "User is Unauthorized",
  });
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const next = NextResponse.next();
  const user = await checkUserSession();
  const isPublicRoute =
    path.startsWith("/login") || path.startsWith("/register");

  if (path.startsWith("/api")) return await apiMiddleware(req, next, user);

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL("/boards", req.url));
  }

  return next;
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/boards/:path*",
    "/boards/:path*/tasks",
    "/api/boards/:path*",
  ],
};
