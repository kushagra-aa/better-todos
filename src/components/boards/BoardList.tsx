import { BoardResponseType } from "@/types/entities/Board.type";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import BoardCard from "./BoardCard";

type BoardListPropsType = {
  boards: BoardResponseType[];
  onDelete: (id: number) => void;
  onClickAdd: () => void;
  onSelect: (id: number) => void;
  loading?: boolean;
};

export default function BoardList({
  boards,
  onDelete,
  onSelect,
  onClickAdd,
  loading = false,
}: BoardListPropsType) {
  if (loading) {
    return (
      <div className="py-8">
        <Loader size="lg" />
      </div>
    );
  }

  if (boards.length === 0) {
    return (
      <EmptyState
        title="No boards yet"
        description="Create your first board to start organizing your tasks"
        action={
          <Button onClick={onClickAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Create Board
          </Button>
        }
      />
    );
  }

  return (
    <div className="py-12 px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onDelete={() => onDelete(board.id)}
          onSelect={() => onSelect(board.id)}
        />
      ))}
    </div>
  );
}
