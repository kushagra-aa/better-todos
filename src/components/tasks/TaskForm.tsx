import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { Plus } from "lucide-react";

type TaskFormPropsType = {
  onSubmit: (data: { title: string }) => void;
  loading?: boolean;
};

export default function TaskForm({
  onSubmit,
  loading = false,
}: TaskFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setError("");
    onSubmit({ title: title.trim() });
    setTitle(""); // Reset form after successful submission
  };

  return (
    <div className="space-y-4">
      <Input
        label="Task Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter task title"
        required
        error={error}
      />

      <Button onClick={handleSubmit} disabled={loading || !title.trim()}>
        {loading ? (
          <Loader size="sm" />
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </>
        )}
      </Button>
    </div>
  );
}
