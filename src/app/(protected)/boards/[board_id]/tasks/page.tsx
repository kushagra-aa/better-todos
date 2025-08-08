"use client";

import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import Button from "@/components/ui/Button";
import ToastList from "@/components/ui/Toast";
import useQuery from "@/hooks/useQuery";
import { useToast } from "@/hooks/useToast";
import {
  deleteTask,
  fetchTasks,
  updateTaskStatus,
  addTask,
} from "@/lib/api/tasks.api";
import {
  TaskAddPayloadType,
  TaskStatusEnum,
  TaskType,
} from "@/types/entities/Task.type";
import { Plus } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

enum TaskScreensEnum {
  list = "LIST",
  form = "FORM",
}
function TasksPage() {
  const [currentScreen, setCurrentScreen] = useState(TaskScreensEnum.list);
  const [isNotFound, setIsNotFound] = useState(false);

  const { board_id } = useParams();

  const { toasts, addToast } = useToast();
  const {
    isLoading,
    setIsLoading,
    data: tasks,
    setData: setTasks,
    error,
    setError,
  } = useQuery<TaskType[]>([]);

  const handleSwitchScreen = (screen: TaskScreensEnum) =>
    setCurrentScreen(screen);

  const getTasks = async () => {
    setIsLoading(true);
    try {
      if (!board_id) return;
      const resp = await fetchTasks(Number(board_id));

      if (resp.error || !resp.data) setError(error);
      setIsLoading(false);
      setTasks(resp.data as TaskType[]);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskAdd = async (
    data: Omit<TaskAddPayloadType, "owner" | "board">
  ) => {
    setIsLoading(true);
    try {
      const resp = await addTask(data, Number(board_id));

      if (resp.error || !resp.data) setError(error);
      else addToast(resp.message || "Success!", "success");
      setIsLoading(false);
      setCurrentScreen(TaskScreensEnum.list);
      getTasks();
    } catch {}
  };

  const handleTaskDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const resp = await deleteTask(id, Number(board_id));

      if (resp.error || !resp.data) setError(error);
      else addToast(resp.message || "Success!", "success");
      setIsLoading(false);
      getTasks();
    } catch {}
  };

  const handleTaskStatusChange = async (id: number, status: TaskStatusEnum) => {
    setIsLoading(true);
    try {
      const resp = await updateTaskStatus({ status }, id, Number(board_id));

      if (resp.error || !resp.data) setError(error);
      else addToast(resp.message || "Success!", "success");
      setIsLoading(false);
      getTasks();
    } catch {}
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (error) addToast(error?.message || "Something Went Wrong", "error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isNotFound || !board_id) notFound();
  return (
    <main className="h-[100vh] w-[100vw] flex flex-col items-center gap-10">
      <div className="w-full py-4 px-8 flex justify-around gap-6 items-center bg-blue-50">
        <h1 className="text-2xl font-bold text-black">Tasks:</h1>
        {currentScreen === TaskScreensEnum.form ? (
          <Button
            variant="secondary"
            onClick={() => handleSwitchScreen(TaskScreensEnum.list)}
          >
            ← Back to Tasks
          </Button>
        ) : (
          <Button onClick={() => handleSwitchScreen(TaskScreensEnum.form)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        )}
      </div>
      {currentScreen === TaskScreensEnum.form ? (
        <TaskForm onSubmit={handleTaskAdd} loading={isLoading} />
      ) : (
        <TaskList
          tasks={tasks}
          loading={isLoading}
          onDelete={handleTaskDelete}
          onToggle={handleTaskStatusChange}
        />
      )}
      <ToastList toasts={toasts} />
    </main>
  );
}

export default TasksPage;
