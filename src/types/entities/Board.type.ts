export type BoardType = {
  id: number;
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type BoardResponseType = { tasksCount: number } & BoardType;

export type BoardAddPayloadType = Omit<
  BoardType,
  "id" | "createdAt" | "updatedAt"
>;
export type BoardEditPayloadType = Omit<BoardType, "createdAt" | "updatedAt">;
