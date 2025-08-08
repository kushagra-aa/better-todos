import { redirect } from "next/navigation";
import { loginUser, registerUser } from "../api/auth";
import { ErrorResponseType } from "@/types/Response.type";

export type FormState = {
  globalError?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

export const handleLogin = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const result = await loginUser(formData);

  if ("error" in result) {
    const errorResult = result as ErrorResponseType;
    return {
      globalError: errorResult.error || "An unexpected error occurred.",
      fieldErrors: errorResult.errors
        ? errorResult.errors.reduce((acc, err) => ({ ...acc, ...err }), {})
        : {},
    };
  }

  redirect("/boards");
};

export const handleRegister = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const result = await registerUser(formData);

  if ("error" in result) {
    const errorResult = result as ErrorResponseType;

    const fieldErrors: Record<string, string> = {};
    if (errorResult.errors) {
      errorResult.errors.forEach((err) => {
        const [key, value] = Object.entries(err)[0];
        fieldErrors[key] = value;
      });
    }

    return {
      globalError: errorResult.error || "An unexpected error occurred.",
      fieldErrors: fieldErrors,
    };
  }

  redirect("/login");
};
