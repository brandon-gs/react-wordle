import { FC } from "react";
import { boardItemClassesByStatus } from "./BoardItem.helpers";
import type { WordleBoardItem } from "@/context";

export interface BoardItemProps extends Omit<WordleBoardItem, "isRevealed"> {
  isSelected?: boolean;
}

const BoardItem: FC<BoardItemProps> = ({ letter, status, isSelected = false }) => {
  const classes = boardItemClassesByStatus[status];
  const selectedClasses = isSelected ? `border border-lightBorder dark:border-darkBorder` : "";

  return (
    <div className={`grid place-items-center w-boardItem h-boardItem rounded-md ${selectedClasses} ${classes} `}>
      <p className="text-4xl font-extrabold text-white">{letter}</p>
    </div>
  );
};

export default BoardItem;
