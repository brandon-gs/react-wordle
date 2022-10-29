import { ReactComponent as Delete } from "@/assets/Delete.svg";
import { WordleContext } from "@/context";
import { FC, useContext } from "react";
import Key from "./Key";

interface KeyboardProps {
  className?: string;
}

const Keyboard: FC<KeyboardProps> = ({ className }) => {
  const { revealedLetters, handlePressBackspace, handlePressEnter, handlePressLetter } = useContext(WordleContext);

  const handlePressKey = (key: string) => () => {
    handlePressLetter(key);
  };

  return (
    <div
      className={`${className} flex flex-col py-8 px-9 gap-2.5 w-keyboard bg-lightHeaderBg dark:bg-darkHeaderBg rounded-2xl`}
    >
      <div className="flex gap-2.5 justify-center">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key key={`keyboard-${key}`} letter={key} status={revealedLetters[key]} onClick={handlePressKey(key)} />
        ))}
      </div>
      <div className="flex gap-2.5 justify-end">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"].map((key) => (
          <Key key={`keyboard-${key}`} letter={key} status={revealedLetters[key]} onClick={handlePressKey(key)} />
        ))}
      </div>
      <div className="flex gap-2.5 justify-start">
        <Key letter={"Enter"} onClick={handlePressEnter} />
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key key={`keyboard-${key}`} letter={key} status={revealedLetters[key]} onClick={handlePressKey(key)} />
        ))}
        <Key letter={"Delete"} onClick={handlePressBackspace}>
          <div className="px-6">
            <Delete />
          </div>
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;
