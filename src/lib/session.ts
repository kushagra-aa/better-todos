import "server-only";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";
import { SESSION_COOKIE_NAME } from "./constants";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createUserSession(email: string) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 7;
  const expiresAt = new Date(Date.now() + maxAge);
  const session = await encrypt({ email, expiresAt }, encodedKey);

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true, // so JS can't read it
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // available to all routes
    maxAge: maxAge, // 1 week
    expires: expiresAt,
  });
}

export async function checkUserSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return;
  const user = await decrypt(session, encodedKey);
  return user as { email: string };
}
export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
