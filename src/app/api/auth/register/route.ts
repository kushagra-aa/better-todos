import { validateRegisterPayload } from "@/utils/validators/userPayloadValidators";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { addUser, getUserByEmail } from "@/services/user.service";
import { UserRoles } from "@/types/entities/User.type";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const validation = validateRegisterPayload(payload);
    if (!validation.success)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: validation.errors,
      });
    const validatedUser = validation.data;
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    const isEmailUsed = await getUserByEmail(validatedUser.email);
    if (isEmailUsed)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: [{ email: "Email is being used by another account" }],
      });
    const newUser = await addUser({
      ...validatedUser,
      password: hashedPassword,
      role: UserRoles.Employ,
    });
    return sendAPIResponse({
      data: newUser,
      message: "User Successfully Added",
      status: 201,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
