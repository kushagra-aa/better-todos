"use client";

import Link from "next/link";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { FormState, handleRegister } from "@/lib/actions/auth";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { useActionState, useRef } from "react";

const initialRegisterState: FormState = {
  globalError: undefined,
  fieldErrors: {},
  success: undefined,
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(handleRegister, {});
  const formRef = useRef<HTMLFormElement>(null!);

  return (
    <AuthFormWrapper
      action={handleRegister}
      initialState={initialRegisterState}
      formTitle="Register"
      formRef={formRef}
      formState={state}
      formAction={formAction}
    >
      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        error={state?.fieldErrors?.email}
        autoComplete="email"
      />
      <InputField
        label="Username"
        id="username"
        name="username"
        type="text"
        placeholder="john_doe"
        error={state?.fieldErrors?.username}
        autoComplete="username"
      />
      <InputField
        label="Name"
        id="name"
        name="name"
        type="text"
        placeholder="John Doe"
        error={state?.fieldErrors?.name}
        autoComplete="name"
      />
      <InputField
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="********"
        error={state?.fieldErrors?.password}
        autoComplete="new-password"
      />
      <div className="flex items-center justify-between mt-6">
        <SubmitButton text="Register" />
        <Link
          href="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Already have an account? Login
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
