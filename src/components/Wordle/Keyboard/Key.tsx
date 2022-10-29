import { WordleLetterStatus } from "@/context";
import { FC, PropsWithChildren } from "react";
import { boardItemClassesByStatus } from "../BoardItem/BoardItem.helpers";

interface KeyProps extends PropsWithChildren {
  letter: string;
  status?: WordleLetterStatus;
  onClick: () => void;
}

const Key: FC<KeyProps> = ({ letter, status, children, onClick }) => {
  const classes = status ? `${boardItemClassesByStatus[status]} text-light` : `bg-lightKey dark:bg-darkKey `;

  return (
    <div
      className={`min-w-key h-12 grid place-items-center rounded-md cursor-pointer select-none text-lightKeyText dark:text-darkKeyText ${classes}`}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <p className={`${letter.length === 1 ? "text-lg" : "text-sm px-4"} font-semibold uppercase`}>{letter}</p>
      )}
    </div>
  );
};

export default Key;
