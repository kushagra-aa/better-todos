import { ValidationResultType } from "@/types/common";
import {
  TaskAddPayloadType,
  TaskEditPayloadType,
  TaskStatusEnum,
  TaskStatusUpdatePayloadType,
} from "@/types/entities/Task.type";

export const validateTaskAddPayload = (
  payload: Partial<TaskAddPayloadType>
): ValidationResultType<TaskAddPayloadType> => {
  const errors: Record<string, string>[] = [];

  if (!payload.title || payload.title === "") {
    errors.push({ title: "Title is a required field" });
  }
  // ? If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // ? Return validated data
  return {
    success: true,
    data: {
      title: payload.title!.trim(),
      owner: payload.owner!,
      board: payload.board!,
    },
  };
};

export const validateTaskEditPayload = (
  payload: Partial<TaskEditPayloadType>
): ValidationResultType<TaskEditPayloadType> => {
  const errors: Record<string, string>[] = [];

  if (!payload.id) {
    errors.push({ id: "Task ID is a required field" });
  }
  if (!payload.title?.trim()) {
    errors.push({ title: "Title is a required field" });
  }
  // ? If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // ? Return validated data
  return {
    success: true,
    data: {
      id: payload.id!,
      title: payload.title!.trim(),
      owner: payload.owner!,
      board: payload.board!,
    },
  };
};

export const validateTaskStatusUpdatePayload = (
  payload: Partial<TaskStatusUpdatePayloadType>
): ValidationResultType<TaskStatusUpdatePayloadType> => {
  const errors: Record<string, string>[] = [];

  if (!payload.id) {
    errors.push({ id: "Task ID is a required field" });
  }
  if (!payload.status?.trim()) {
    errors.push({ status: "Status is a required field" });
  } else {
    const taskStatusOptions = Object.values(TaskStatusEnum);
    if (!taskStatusOptions.includes(payload.status))
      errors.push({
        status: `Invalid task status: "${
          payload.status
        }". Valid options are: ${taskStatusOptions.join(", ")}`,
      });
  }
  // ? If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // ? Return validated data
  return {
    success: true,
    data: {
      id: payload.id!,
      status: payload.status!,
      owner: payload.owner!,
      board: payload.board!,
    },
  };
};
