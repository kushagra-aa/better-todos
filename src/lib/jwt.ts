import "server-only";

import { SessionPayload } from "@/types/common";
import { jwtVerify, SignJWT } from "jose";

export async function encrypt(
  payload: SessionPayload,
  encodedKey: Uint8Array<ArrayBufferLike>
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = "",
  encodedKey: Uint8Array<ArrayBufferLike>
) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.error("Failed to verify session");
  }
}
