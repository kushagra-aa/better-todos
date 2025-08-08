import { updateTaskStatus } from "@/services/task.service";
import { ContextType } from "@/types/common";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { validateTaskStatusUpdatePayload } from "@/utils/validators/taskPayloadValidators";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, context: ContextType) {
  try {
    const { task_id: id, id: board_id } = await context.params;
    if (!id || Number.isNaN(Number(id)))
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid URL",
        status: 400,
        errors: [{ id: `Invalid 'id' ${id}` }],
      });
    if (!board_id || Number.isNaN(Number(board_id)))
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid URL",
        status: 400,
        errors: [{ board_id: `Invalid 'board_id' ${board_id}` }],
      });
    const user = request.headers.get("x-user-email");
    const payload = await request.json();
    const validation = validateTaskStatusUpdatePayload({
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
    const validatedTask = validation.data;
    const task = await updateTaskStatus({
      ...validatedTask,
      board: Number(board_id),
    });
    if (task.error)
      return sendAPIError({
        error: task.error.error,
        message: task.error.message,
        status: task.error.status,
      });
    return sendAPIResponse({
      data: task.data,
      message: "Task Successfully Edited",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
