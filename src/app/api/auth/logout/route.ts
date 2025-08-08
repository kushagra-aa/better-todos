import { deleteUserSession } from "@/lib/session";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";

export async function POST() {
  try {
    await deleteUserSession();
    return sendAPIResponse({
      data: {
        logout: "Success",
      },
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
