import { deleteBoard, editBoard } from "@/services/board.service";
import { ContextType } from "@/types/common";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { validateBoardEditPayload } from "@/utils/validators/boardPayloadValidators";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, context: ContextType) {
  try {
    const { id } = await context.params;
    if (!id || Number.isNaN(Number(id)))
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid URL",
        status: 400,
        errors: [{ id: `Invalid 'id' ${id}` }],
      });
    const user = request.headers.get("x-user-email");
    const payload = await request.json();
    const validation = validateBoardEditPayload({
      ...payload,
      id: Number(id),
      owner: user,
    });
    if (!validation.success)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: validation.errors,
      });
    const validatedBoard = validation.data;
    const board = await editBoard({ ...validatedBoard });
    if (board.error)
      return sendAPIError({
        error: board.error.error,
        message: board.error.message,
        status: board.error.status,
      });
    return sendAPIResponse({
      data: board.data,
      message: "Board Successfully Edited",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}

export async function DELETE(request: NextRequest, context: ContextType) {
  try {
    const { id } = await context.params;
    if (!id || Number.isNaN(Number(id)))
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid URL",
        status: 400,
        errors: [{ id: `Invalid 'id' ${id}` }],
      });
    const user = request.headers.get("x-user-email");
    const board = await deleteBoard(Number(id), user!);
    if (board.error)
      return sendAPIError({
        error: board.error.error,
        message: board.error.message,
        status: board.error.status,
      });
    return sendAPIResponse({
      data: board,
      message: "Board Successfully Deleted",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
