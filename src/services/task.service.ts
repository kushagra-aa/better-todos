import {
  TaskAddPayloadType,
  TaskEditPayloadType,
  TaskStatusEnum,
  TaskStatusUpdatePayloadType,
  TaskType,
} from "@/types/entities/Task.type";
import fs from "fs/promises";
import { getBoardByID } from "./board.service";
import { generateBase36NumericId } from "@/utils/generateID";

const taskDBPath = "database/board_tasks.json";

export const getAllTasks = async (): Promise<TaskType[]> => {
  const tasks: TaskType[] = [];
  await fs
    .readFile(taskDBPath, "utf8")
    .then((b) => JSON.parse(b) as TaskType[])
    .then((b) => tasks.push(...b));
  return tasks;
};

export const getUserTasks = async (email?: string): Promise<TaskType[]> => {
  if (!email) return [];
  const tasks: TaskType[] = [];
  await fs
    .readFile(taskDBPath, "utf8")
    .then((b) => JSON.parse(b) as TaskType[])
    .then((b) => tasks.push(...b.filter((u) => u.owner === email)));
  return tasks;
};

export const getBoardTasks = async (
  board: number,
  email?: string
): Promise<TaskType[]> => {
  if (!email) return [];
  const tasks: TaskType[] = [];
  await fs
    .readFile(taskDBPath, "utf8")
    .then((b) => JSON.parse(b) as TaskType[])
    .then((b) =>
      tasks.push(...b.filter((u) => u.owner === email && u.board === board))
    );
  return tasks;
};

export const getTaskByID = async (
  id: number,
  board_id: number
): Promise<TaskType | undefined> => {
  const TASKS = await getAllTasks();
  const task = TASKS.find((u) => u.id === id && u.board === board_id);
  return task;
};

const addTasksDB = async (task: TaskType[]) => {
  const TASKS = await getAllTasks();
  TASKS.push(...task);
  await fs.writeFile(taskDBPath, JSON.stringify(TASKS), { encoding: "utf8" });
};

const updateTasksDB = async (tasks: TaskType[]) => {
  await fs.writeFile(taskDBPath, JSON.stringify(tasks), { encoding: "utf8" });
};

const removeTaskDB = async (task: number) => {
  const TASKS = await getAllTasks();
  await fs.writeFile(
    taskDBPath,
    JSON.stringify(TASKS.filter((b) => b.id !== task)),
    { encoding: "utf8" }
  );
};

export const addTask = async (task: TaskAddPayloadType) => {
  const board = await getBoardByID(task.board);
  if (board?.owner !== task.owner)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Board:${board?.id}`,
        status: 403,
      },
    };
  const now = new Date().toISOString();
  const newTask = {
    ...task,
    id: generateBase36NumericId(),
    status: TaskStatusEnum.Pending,
    createdAt: now,
    updatedAt: now,
  };
  await addTasksDB([newTask]);
  return { data: await getTaskByID(newTask.id, task.board) };
};

export const editTask = async (task: TaskEditPayloadType) => {
  const TASKS = await getAllTasks();
  const oldTask = await getTaskByID(task.id, task.board);
  if (!oldTask)
    return {
      error: {
        error: "Task Not Found",
        message: `Task with ID:${task.id} not found`,
        status: 404,
      },
    };
  const board = await getBoardByID(task.board);
  if (board?.owner !== task.owner)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Board:${board?.id}`,
        status: 403,
      },
    };
  const now = new Date().toISOString();
  const newTask = {
    ...oldTask,
    ...task,
    updatedAt: now,
  };
  await updateTasksDB(TASKS.map((t) => (t.id === newTask.id ? newTask : t)));
  return { data: newTask };
};

export const updateTaskStatus = async (task: TaskStatusUpdatePayloadType) => {
  const TASKS = await getAllTasks();
  const oldTask = await getTaskByID(task.id, task.board);
  if (!oldTask)
    return {
      error: {
        error: "Task Not Found",
        message: `Task with ID:${task.id} not found`,
        status: 404,
      },
    };
  const board = await getBoardByID(task.board);
  if (board?.owner !== task.owner)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Board:${board?.id}`,
        status: 403,
      },
    };
  const now = new Date().toISOString();
  const newTask = {
    ...oldTask,
    ...task,
    updatedAt: now,
  };
  await updateTasksDB(TASKS.map((t) => (t.id === newTask.id ? newTask : t)));
  return { data: newTask };
};

export const deleteTask = async (
  id: number,
  board_id: number,
  email: string
) => {
  const oldTask = await getTaskByID(id, board_id);

  if (!oldTask)
    return {
      error: {
        error: "Task Not Found",
        message: `Task with ID:${id} not found`,
        status: 404,
      },
    };
  if (oldTask.owner !== email)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Task:${id}`,
        status: 403,
      },
    };
  await removeTaskDB(id);
  return { success: true };
};
