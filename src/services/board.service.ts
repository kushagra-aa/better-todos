import {
  BoardAddPayloadType,
  BoardEditPayloadType,
  BoardType,
} from "@/types/entities/Board.type";
import { generateBase36NumericId } from "@/utils/generateID";
import fs from "fs/promises";

const boardDBPath = "database/boards.json";

export const getAllBoards = async (): Promise<BoardType[]> => {
  const boards: BoardType[] = [];
  await fs
    .readFile(boardDBPath, "utf8")
    .then((b) => JSON.parse(b) as BoardType[])
    .then((b) => boards.push(...b));
  return boards;
};
export const getUserBoards = async (email?: string): Promise<BoardType[]> => {
  if (!email) return [];
  const boards: BoardType[] = [];
  await fs
    .readFile(boardDBPath, "utf8")
    .then((b) => JSON.parse(b) as BoardType[])
    .then((b) => boards.push(...b.filter((u) => u.owner === email)));
  return boards;
};

export const getBoardByID = async (
  id: number
): Promise<BoardType | undefined> => {
  const BOARDS = await getAllBoards();
  const board = BOARDS.find((u) => u.id === id);
  return board;
};

const addBoardsDB = async (board: BoardType[]) => {
  const BOARDS = await getAllBoards();
  BOARDS.push(...board);
  await fs.writeFile(boardDBPath, JSON.stringify(BOARDS), { encoding: "utf8" });
};
const updateBoardsDB = async (boards: BoardType[]) => {
  await fs.writeFile(boardDBPath, JSON.stringify(boards), { encoding: "utf8" });
};

const removeBoardDB = async (board: number) => {
  const BOARDS = await getAllBoards();
  await fs.writeFile(
    boardDBPath,
    JSON.stringify(BOARDS.filter((b) => b.id !== board)),
    { encoding: "utf8" }
  );
};

export const addBoard = async (board: BoardAddPayloadType) => {
  const now = new Date().toISOString();
  const newBoard = {
    ...board,
    id: generateBase36NumericId(),
    createdAt: now,
    updatedAt: now,
  };
  await addBoardsDB([newBoard]);
  return await getBoardByID(newBoard.id);
};

export const editBoard = async (board: BoardEditPayloadType) => {
  const BOARDS = await getAllBoards();
  const oldBoard = await getBoardByID(board.id);
  if (!oldBoard)
    return {
      error: {
        error: "Board Not Found",
        message: `Board with ID:${board.id} not found`,
        status: 404,
      },
    };
  if (oldBoard.owner !== board.owner)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Board:${board.id}`,
        status: 403,
      },
    };
  const now = new Date().toISOString();
  const newBoard = {
    ...oldBoard,
    ...board,
    updatedAt: now,
  };
  await updateBoardsDB(
    BOARDS.map((b) => (b.id === newBoard.id ? newBoard : b))
  );
  return { data: newBoard };
};

export const deleteBoard = async (id: number, email: string) => {
  const oldBoard = await getBoardByID(id);

  if (!oldBoard)
    return {
      error: {
        error: "Board Not Found",
        message: `Board with ID:${id} not found`,
        status: 404,
      },
    };
  if (oldBoard.owner !== email)
    return {
      error: {
        error: "Unauthorized",
        message: `Unauthorized access to Board:${id}`,
        status: 403,
      },
    };
  await removeBoardDB(id);
  return { success: true };
};
