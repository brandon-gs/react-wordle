import type { WordleBoardItem } from "@/context";
import type { FC } from "react";
import BoardLine from "../BoardLine/BoardLine";

export interface InstructionsExampleProps {
  items: WordleBoardItem[];
  text: string;
  letter: string;
}

const InstructionsExample: FC<InstructionsExampleProps> = ({ items, letter, text }) => {
  return (
    <div>
      <BoardLine items={items} className="mb-4" />
      <p className="text-lg">
        La letra <span className="font-bold">{letter}</span> {text}.
      </p>
    </div>
  );
};

export default InstructionsExample;
