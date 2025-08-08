import { ErrorResponseType, SuccessResponseType } from "@/types/Response.type";
import {
  makeAPIDeleteCall,
  makeAPIGetCall,
  makeAPIPatchCall,
  makeAPIPostCall,
  objectToFormData,
} from ".";
import {
  TaskAddPayloadType,
  TaskStatusUpdatePayloadType,
} from "@/types/entities/Task.type";

export const fetchTasks = async (
  board_id: number
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIGetCall(`/api/boards/${board_id}/tasks`);

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Fetch failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Fetch successful",
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as { message: string };
    return {
      status: 500,
      message: "Network Error",
      error: error.message || "An unexpected error occurred",
    };
  }
};

export const deleteTask = async (
  id: number,
  board_id: number
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIDeleteCall(`/api/boards/${board_id}/tasks/${id}`);

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Delete failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Delete successful",
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as { message: string };
    return {
      status: 500,
      message: "Network Error",
      error: error.message || "An unexpected error occurred",
    };
  }
};

export const addTask = async (
  payload: Omit<TaskAddPayloadType, "owner" | "board">,
  board_id: number
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIPostCall(
      `/api/boards/${board_id}/tasks`,
      objectToFormData(payload)
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Add failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Add successful",
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as { message: string };
    return {
      status: 500,
      message: "Network Error",
      error: error.message || "An unexpected error occurred",
    };
  }
};

export const updateTaskStatus = async (
  payload: Omit<TaskStatusUpdatePayloadType, "owner" | "board" | "id">,
  id: number,
  board_id: number
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIPatchCall(
      `/api/boards/${board_id}/tasks/${id}/status`,
      objectToFormData(payload)
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Add failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Add successful",
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as { message: string };
    return {
      status: 500,
      message: "Network Error",
      error: error.message || "An unexpected error occurred",
    };
  }
};
