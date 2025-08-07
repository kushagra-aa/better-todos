import { checkUserSession } from "@/lib/session";
import { sendAPIResponse } from "@/utils/backendHelpers";

export async function GET() {
  const user = await checkUserSession();
  return sendAPIResponse({
    data: user,
    count: 1,
    page: 1,
    pageSize: 10,
    message: "User Successfully Added",
    status: 201,
  });
}
