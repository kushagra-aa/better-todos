import { TaskStatusEnum, TaskType } from "@/types/entities/Task.type";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

type TaskCardPropsType = {
  task: TaskType;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: TaskCardPropsType) {
  return (
    <div
      className={`bg-white rounded-lg border p-4 transition-all ${
        task.status === TaskStatusEnum.Complete
          ? "border-green-200 bg-green-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={onToggle}
            className={`flex-shrink-0 transition-colors ${
              task.status === TaskStatusEnum.Complete
                ? "text-green-600 hover:text-green-700"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {task.status === TaskStatusEnum.Complete ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <h4
              className={`text-sm font-medium ${
                task.status === TaskStatusEnum.Complete
                  ? "text-gray-500 line-through"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
