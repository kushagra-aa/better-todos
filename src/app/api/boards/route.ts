import { addBoard, getUserBoards } from "@/services/board.service";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { validateBoardAddPayload } from "@/utils/validators/boardPayloadValidators";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = request.headers.get("x-user-email");
    const boards = await getUserBoards(user!);
    return sendAPIResponse({
      data: boards,
      count: boards.length,
      page: 1,
      pageSize: 10,
      message: boards?.length
        ? "User's Boards Found"
        : "User's Boards Not Found",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = request.headers.get("x-user-email");
    const payload = await request.json();
    const validation = validateBoardAddPayload(payload);
    if (!validation.success)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: validation.errors,
      });
    const validatedBoard = validation.data;
    const board = await addBoard({ ...validatedBoard, owner: user! });
    return sendAPIResponse({
      data: board,
      message: "Board Successfully Added",
      status: 201,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
