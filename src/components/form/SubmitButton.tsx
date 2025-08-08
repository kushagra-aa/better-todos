"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Loader from "@/components/ui/Loader";

interface SubmitButtonPropsType {
  text: string;
  loadingText?: ReactNode;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonPropsType> = ({
  text,
  loadingText = <Loader size="xs" />,
  className,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className} ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? loadingText : text}
    </button>
  );
};

export default SubmitButton;
