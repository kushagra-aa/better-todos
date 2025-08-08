import { ErrorResponseType, SuccessResponseType } from "@/types/Response.type";
import { makeAPICall } from "@/lib/api";

export const loginUser = async (
  formData: FormData
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPICall("/api/auth/login", formData);

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Login failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Login successful",
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

export const registerUser = async (
  formData: FormData
): Promise<SuccessResponseType | ErrorResponseType> => {
  try {
    const res = await makeAPICall("/api/auth/register", formData);

    const data = await res.json();

    if (!res.ok) {
      return {
        status: res.status,
        message: data.message || "Registration failed",
        error: data.error || "Unknown error",
        errors: data.errors,
      };
    }

    return {
      status: res.status,
      message: data.message || "Registration successful",
      data: data.data,
    };
  } catch (err: unknown) {
    console.error(err);
    const error = err as { message: string };
    return {
      status: 500,
      message: "Network Error",
      error: error.message || "An unexpected error occurred",
    };
  }
};
