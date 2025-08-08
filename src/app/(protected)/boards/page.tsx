"use client";

import BoardForm from "@/components/boards/BoardForm";
import BoardList from "@/components/boards/BoardList";
import Button from "@/components/ui/Button";
import ToastList from "@/components/ui/Toast";
import useQuery from "@/hooks/useQuery";
import { useToast } from "@/hooks/useToast";
import { deleteBoard, fetchBoards, addBoard } from "@/lib/api/boards.api";
import {
  BoardAddPayloadType,
  BoardResponseType,
} from "@/types/entities/Board.type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum BoardScreensEnum {
  list = "LIST",
  form = "FORM",
}

function BoardsPage() {
  const [currentScreen, setCurrentScreen] = useState(BoardScreensEnum.list);

  const router = useRouter();

  const { toasts, addToast } = useToast();
  const {
    isLoading,
    setIsLoading,
    data: boards,
    setData: setBoards,
    error,
    setError,
  } = useQuery<BoardResponseType[]>([]);

  const handleSwitchScreen = (screen: BoardScreensEnum) =>
    setCurrentScreen(screen);

  const handleBoardAdd = async (data: Omit<BoardAddPayloadType, "owner">) => {
    setIsLoading(true);
    try {
      const resp = await addBoard(data);

      if (resp.error || !resp.data) setError(error);
      else addToast(resp.message || "Success!", "success");
      setIsLoading(false);
      setCurrentScreen(BoardScreensEnum.list);
      getBoards();
    } catch {}
  };

  const handleBoardDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const resp = await deleteBoard(id);

      if (resp.error || !resp.data) setError(error);
      else addToast(resp.message || "Success!", "success");
      setIsLoading(false);
      getBoards();
    } catch {}
  };

  const handleBoardSelect = (id: number) => {
    router.push(`/boards/${id}/tasks`);
  };

  const getBoards = async () => {
    setIsLoading(true);
    try {
      const resp = await fetchBoards().then((r) => {
        setIsLoading(false);
        return r;
      });

      if (resp.error || !resp.data) setError(error);
      setBoards(resp.data as BoardResponseType[]);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (error) addToast(error?.message || "Something Went Wrong", "error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <main className="h-[100vh] w-[100vw] flex flex-col items-center gap-10">
      <div className="w-full py-4 px-8 flex justify-around gap-6 items-center bg-blue-50">
        <h1 className="text-2xl font-bold text-black">Boards:</h1>
        {currentScreen === BoardScreensEnum.form ? (
          <Button
            variant="secondary"
            onClick={() => handleSwitchScreen(BoardScreensEnum.list)}
          >
            ← Back to Boards
          </Button>
        ) : (
          <Button onClick={() => handleSwitchScreen(BoardScreensEnum.form)}>
            <Plus className="w-4 h-4 mr-2" />
            New Board
          </Button>
        )}
      </div>
      {currentScreen === BoardScreensEnum.form ? (
        <BoardForm
          onSubmit={handleBoardAdd}
          loading={isLoading}
          handleCancel={() => handleSwitchScreen(BoardScreensEnum.list)}
        />
      ) : (
        <BoardList
          boards={boards}
          loading={isLoading}
          onDelete={handleBoardDelete}
          onSelect={handleBoardSelect}
          onClickAdd={() => handleSwitchScreen(BoardScreensEnum.form)}
        />
      )}
      <ToastList toasts={toasts} />
    </main>
  );
}

export default BoardsPage;
