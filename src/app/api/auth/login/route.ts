import { validateLoginPayload } from "@/utils/validators/userPayloadValidators";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { getUserForLogin } from "@/services/user.service";
import bcrypt from "bcrypt";
import { createUserSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const validation = validateLoginPayload(payload);
    if (!validation.success)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: validation.errors,
      });
    const validatedUser = validation.data;
    const user = await getUserForLogin(validatedUser.email);
    if (!user)
      return sendAPIError({
        error: "Invalid User Credentials",
        message: "Invalid Input",
        status: 400,
      });
    const isPasswordCorrect = await bcrypt.compare(
      validatedUser.password,
      user.password
    );
    if (!isPasswordCorrect)
      return sendAPIError({
        error: "Invalid User Credentials",
        message: "Invalid Input",
        status: 400,
      });
    await createUserSession(user.email);
    return sendAPIResponse({
      data: user,
      count: 1,
      page: 1,
      pageSize: 10,
      message: "User Logged In Successfully",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
