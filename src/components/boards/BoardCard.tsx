import { BoardResponseType } from "@/types/entities/Board.type";
import { Trash2, Users } from "lucide-react";
import Button from "@/components/ui/Button";

interface BoardCardPropsType {
  board: BoardResponseType;
  onDelete: () => void;
  onSelect: () => void;
}

export default function BoardCard({
  board,
  onDelete,
  onSelect,
}: BoardCardPropsType) {
  return (
    <div className="h-50 bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {board.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{board.description}</p>
          <div className="flex items-center text-xs text-gray-500 space-x-4">
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {board.tasksCount || 0} tasks
            </span>
            <span>
              Created {new Date(board.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <Button onClick={onSelect} className="w-full">
        View Board
      </Button>
    </div>
  );
}
