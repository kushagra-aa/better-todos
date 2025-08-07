import "server-only";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";
import { SESSION_COOKIE_NAME } from "./constants";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createUserSession(email: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ email, expiresAt }, encodedKey);

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function checkUserSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const user = await decrypt(session, encodedKey);
  return user;
}
export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
