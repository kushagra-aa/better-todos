export enum TaskStatusEnum {
  Pending = "PENDING",
  Complete = "COMPLETE",
}

export type TaskType = {
  id: number;
  title: string;
  status: TaskStatusEnum;
  board: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskAddPayloadType = Omit<
  TaskType,
  "id" | "createdAt" | "updatedAt" | "status"
>;
export type TaskEditPayloadType = Omit<
  TaskType,
  "createdAt" | "updatedAt" | "status"
>;
export type TaskStatusUpdatePayloadType = Pick<
  TaskType,
  "id" | "board" | "status" | "owner"
>;
