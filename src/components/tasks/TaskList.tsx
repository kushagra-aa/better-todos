import { TaskStatusEnum, TaskType } from "@/types/entities/Task.type";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

type TaskListPropsType = {
  tasks: TaskType[];
  onToggle: (id: number, status: TaskStatusEnum) => void;
  onClickAdd: () => void;
  onDelete: (id: number) => void;
  loading?: boolean;
};

export default function TaskList({
  tasks,
  onToggle,
  onClickAdd,
  onDelete,
  loading = false,
}: TaskListPropsType) {
  if (loading) {
    return (
      <div className="py-8">
        <Loader size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Add your first task to get started"
        action={
          <Button onClick={onClickAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        }
      />
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatusEnum.Complete
  );
  const pendingTasks = tasks.filter(
    (task) => task.status !== TaskStatusEnum.Complete
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {pendingTasks.length} pending, {completedTasks.length} completed
          </span>
          <span className="text-gray-600">{tasks.length} total tasks</span>
        </div>
        {tasks.length > 0 && (
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{
                width: `${(completedTasks.length / tasks.length) * 100}%`,
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-3">
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() =>
                  onToggle(
                    task.id,
                    task.status === TaskStatusEnum.Complete
                      ? TaskStatusEnum.Pending
                      : TaskStatusEnum.Complete
                  )
                }
                onDelete={() => onDelete(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-3">
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() =>
                  onToggle(
                    task.id,
                    task.status === TaskStatusEnum.Complete
                      ? TaskStatusEnum.Pending
                      : TaskStatusEnum.Complete
                  )
                }
                onDelete={() => onDelete(task.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
