"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonPropsType {
  text: string;
  loadingText?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonPropsType> = ({
  text,
  loadingText = "Submitting...",
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
