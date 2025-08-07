import { validateRegisterPayload } from "@/utils/validators/userPayloadValidators";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { addUsers, getUsers } from "@/services/user.service";
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
    await addUsers({ ...validatedUser, role: UserRoles.Employ });
    const USERS = await getUsers();
    return sendAPIResponse({
      data: USERS,
      count: USERS.length,
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
