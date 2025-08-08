import { ErrorResponseType, SuccessResponseType } from "@/types/Response.type";
import {
  makeAPIDeleteCall,
  makeAPIGetCall,
  makeAPIPostCall,
  objectToFormData,
} from ".";
import { BoardAddPayloadType } from "@/types/entities/Board.type";

export const fetchBoards = async (): Promise<
  SuccessResponseType | ErrorResponseType
> => {
  try {
    const res = await makeAPIGetCall("/api/boards");

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

export const deleteBoard = async (
  id: number
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIDeleteCall(`/api/boards/${id}`);

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

export const addBoard = async (
  payload: Omit<BoardAddPayloadType, "owner">
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPIPostCall(`/api/boards`, objectToFormData(payload));

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
