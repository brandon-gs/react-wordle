import { FC } from "react";
import { boardItemClassesByStatus } from "./BoardItem.helpers";
import type { WordleBoardItem } from "@/context";

export interface BoardItemProps extends Omit<WordleBoardItem, "isRevealed"> {
  isSelected?: boolean;
  className?: string;
}

const BoardItem: FC<BoardItemProps> = ({ letter, status, className = "", isSelected = false }) => {
  const classes = boardItemClassesByStatus[status];
  const selectedClasses = isSelected ? `border border-lightBorder dark:border-darkBorder` : "";

  return (
    <div
      className={`grid place-items-center w-boardItem h-boardItem rounded-md ${selectedClasses} ${className} ${classes}`}
    >
      <p className="text-4xl font-extrabold ">{letter}</p>
    </div>
  );
};

export default BoardItem;
