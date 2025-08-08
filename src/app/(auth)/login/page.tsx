"use client";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";
import { handleLogin } from "@/lib/actions/auth";
import InputField from "@/components/form/Input";
import { useRef, useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(handleLogin, {});
  const formRef = useRef<HTMLFormElement>(null!);

  return (
    <AuthFormWrapper
      action={handleLogin}
      initialState={{}}
      formTitle="Login"
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
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="********"
        error={state?.fieldErrors?.password}
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between mt-6">
        <SubmitButton text="Login" loadingText="Logging in..." />
        <Link
          href="/register"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Don&apos;t have an account? Register
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
