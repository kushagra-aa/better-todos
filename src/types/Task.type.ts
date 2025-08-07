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
