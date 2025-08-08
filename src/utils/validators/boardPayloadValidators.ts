import { ValidationResultType } from "@/types/common";
import {
  BoardAddPayloadType,
  BoardEditPayloadType,
} from "@/types/entities/Board.type";

export const validateBoardAddPayload = (
  payload: Partial<BoardAddPayloadType>
): ValidationResultType<BoardAddPayloadType> => {
  const errors: Record<string, string>[] = [];

  if (!payload.description || payload.description === "") {
    errors.push({ description: "Description is a required field" });
  }
  if (!payload.name || payload.name === "") {
    errors.push({ name: "Name is a required field" });
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
      description: payload.description!.trim(),
      name: payload.name!.trim(),
      owner: payload.owner!,
    },
  };
};

export const validateBoardEditPayload = (
  payload: Partial<BoardEditPayloadType>
): ValidationResultType<BoardEditPayloadType> => {
  const errors: Record<string, string>[] = [];

  if (!payload.id) {
    errors.push({ id: "Board ID is a required field" });
  }
  if (!payload.description || payload.description === "") {
    errors.push({ description: "Description is a required field" });
  }
  if (!payload.name?.trim()) {
    errors.push({ name: "Name is a required field" });
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
      description: payload.description!.trim(),
      name: payload.name!.trim(),
      owner: payload.owner!,
    },
  };
};
