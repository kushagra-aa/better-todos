import { ToastType } from "@/hooks/useToast";
import cn from "@/lib/cn";

export default function ToastList({ toasts }: { toasts: ToastType[] }) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "px-4 py-2 rounded shadow-md text-white animate-fade-in-up",
            toast.type === "success" && "bg-green-500",
            toast.type === "error" && "bg-red-500",
            toast.type === "info" && "bg-blue-500"
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
