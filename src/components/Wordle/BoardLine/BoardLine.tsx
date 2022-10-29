import { BoardItem } from "@/components";
import type { WordleBoardItem } from "@/context";
import { FC, useId } from "react";

interface BoardLineProps {
  items: WordleBoardItem[];
  className?: string;
}

const BoardLine: FC<BoardLineProps> = ({ items, className = "" }) => {
  const key = useId();
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex gap-x-3">
        {items.map((item, idx) => {
          return <BoardItem key={`board-line-${key}-item-${idx}`} {...item} />;
        })}
      </div>
    </div>
  );
};

export default BoardLine;
