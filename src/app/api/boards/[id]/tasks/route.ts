import { addTask, getBoardTasks } from "@/services/task.service";
import { ContextType } from "@/types/common";
import { sendAPIError, sendAPIResponse } from "@/utils/backendHelpers";
import { validateTaskAddPayload } from "@/utils/validators/taskPayloadValidators";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: ContextType) {
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
    const tasks = await getBoardTasks(Number(id), user!);
    return sendAPIResponse({
      data: tasks,
      count: tasks.length,
      page: 1,
      pageSize: 10,
      message: tasks?.length ? "User's Tasks Found" : "User's Tasks Not Found",
      status: 200,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}

export async function POST(request: NextRequest, context: ContextType) {
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
    const validation = validateTaskAddPayload(payload);
    if (!validation.success)
      return sendAPIError({
        error: "Validation Error",
        message: "Invalid Input",
        status: 400,
        errors: validation.errors,
      });
    const validatedTask = validation.data;
    const task = await addTask({
      ...validatedTask,
      owner: user!,
      board: Number(id),
    });
    if (task.error)
      return sendAPIError({
        error: task.error.error,
        message: task.error.message,
        status: task.error.status,
      });
    return sendAPIResponse({
      data: task.data,
      message: "Task Successfully Added",
      status: 201,
    });
  } catch (e) {
    const castedError = e as { message: string };
    const err = e as string;
    const error = castedError.message || err || "Something went wrong!";
    return sendAPIError({ error: error, message: "Something went wrong!" });
  }
}
