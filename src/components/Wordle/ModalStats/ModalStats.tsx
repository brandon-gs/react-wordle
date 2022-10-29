import { ModalsContext, TimerContext, WordleContext } from "@/context";
import { FC, useCallback, useContext, useEffect } from "react";
import Button from "../Button/Button";
import GameStats from "../GameStats/GameStats";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

const ModalStats: FC = () => {
  const { modals, openModalByKey, closeModalByKey } = useContext(ModalsContext);
  const { timeForNextWord } = useContext(TimerContext);
  const { solution, stats, isLost, isGameOver, setIsLost, setIsGameOver, generateSolution } = useContext(WordleContext);

  const handleClose = useCallback(() => {
    closeModalByKey("showStats");
    if (isGameOver) {
      setIsGameOver(false);
      setIsLost(false);
      generateSolution();
    }
  }, [isGameOver, setIsGameOver, closeModalByKey, generateSolution, setIsLost]);

  useModal(modals.showStats, handleClose);

  /**
   * Open modal on game over
   */
  useEffect(() => {
    if (isGameOver) {
      openModalByKey("showStats");
    }
  }, [openModalByKey, isGameOver]);

  return (
    <Modal className="pl-20 pr-20 text-xl" isOpen={modals.showStats} onClose={handleClose}>
      <h1 className="text-4xl font-extrabold text-center mb-12">Estadísticas</h1>
      <div className="flex justify-between mb-12">
        <GameStats games={stats.games} text="Jugadas" />
        <GameStats games={stats.victories} text="Ganadas" />
      </div>
      {isLost && (
        <p className="text-center mb-8">
          La palabra era: <span className="font-bold uppercase">{solution}</span>
        </p>
      )}
      <p className="uppercase text-center">siguiente palabra</p>
      <p className="text-center font-bold text-2xl mb-8">
        {new Date(timeForNextWord * 1000).toISOString().slice(14, 19)}
      </p>
      <Button className="uppercase" onClick={handleClose}>
        Aceptar
      </Button>
    </Modal>
  );
};

export default ModalStats;
