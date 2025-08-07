import { validateRegisterPayload } from "@/utils/validators/userPayloadValidators";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { addUsers, getUserByEmail, getUsers } from "@/services/user.service";
import { UserRoles } from "@/types/User.type";

export async function POST(request: Request) {
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
    const isEmailUsed = await getUserByEmail(validatedUser.email);
    if (isEmailUsed)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: [{ email: "Email is being used by another account" }],
      });
    const newUser = await addUsers({
      ...validatedUser,
      role: UserRoles.Employ,
    });
    return sendAPIResponse({
      data: newUser,
      count: 1,
      page: 1,
      pageSize: 10,
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

export async function GET(request: Request) {
  try {
    const USERS = await getUsers();
    return sendAPIResponse({
      data: USERS,
      count: USERS.length,
      page: 1,
      pageSize: 100,
      message: "User Successfully Fetched",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
