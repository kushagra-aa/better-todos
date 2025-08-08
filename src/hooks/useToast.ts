import { useCallback, useState } from "react";

export type ToastTypeEnum = "success" | "error" | "info";

export interface ToastType {
  id: number;
  message: string;
  type: ToastTypeEnum;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastTypeEnum = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      // Auto remove after 3s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return { toasts, addToast };
}
