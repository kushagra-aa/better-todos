"use client";

import { FormState } from "@/lib/actions/auth";
import { ReactNode, RefObject } from "react";
import FormError from "@/components/form/FormError";

interface AuthFormWrapperProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialState: FormState;
  children: ReactNode;
  formTitle: string;
  formRef: RefObject<HTMLFormElement>;
  formState: FormState;
  formAction: (payload: FormData) => void;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  children,
  formTitle,
  formAction,
  formRef,
  formState,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{formTitle}</h2>
      <form
        ref={formRef}
        action={formAction}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <FormError error={formState?.globalError} />
        {children}
      </form>
    </div>
  );
};

export default AuthFormWrapper;
