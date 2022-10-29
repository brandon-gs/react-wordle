import { WordleContext } from "@/context";
import { useContext } from "react";
import BoardItem from "../BoardItem/BoardItem";

const Board = () => {
  const { board, currentWord, currentLineIdx } = useContext(WordleContext);

  return (
    <div className="flex flex-col gap-3 mt-20">
      {board.map((row, idxRow) => (
        <div className="flex gap-3" key={`board-row-${idxRow}`}>
          {row.map((item, idxCol) => (
            <BoardItem
              key={`board-row-${idxRow}-col-${idxCol}`}
              {...item}
              isSelected={idxRow === currentLineIdx && idxCol === currentWord.length}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
