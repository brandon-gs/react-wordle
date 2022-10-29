import Board from "./Board/Board";
import Header from "./Header/Header";
import Keyboard from "./Keyboard/Keyboard";
import ModalInstructions from "./ModalInstructions/ModalInstructions";
import ModalStats from "./ModalStats/ModalStats";

const Wordle = () => {
  return (
    <main className="min-w-screen min-h-screen flex flex-col items-center">
      <Header />
      <Board />
      <Keyboard className="mt-16 mb-10" />
      <ModalInstructions />
      <ModalStats />
    </main>
  );
};

export default Wordle;
