import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { WordleContext } from "../WordleContext/WordleContext";

const DEFAULT_TIME = 300;

export const TimerContext = createContext({
  timeForNextWord: DEFAULT_TIME,
});

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { finishGame, isGameOver, setIsGameOver, setIsLost } = useContext(WordleContext);

  const [timeForNextWord, setTimeForNextWord] = useState<number>(DEFAULT_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeForNextWord((prevTime) => {
        if (prevTime === 0 || isGameOver) {
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isGameOver, setIsGameOver]);

  useEffect(() => {
    if (!isGameOver) {
      setTimeForNextWord(DEFAULT_TIME);
    }
  }, [isGameOver]);

  /**
   * enable game over and islost when time reached 0
   */
  useEffect(() => {
    if (timeForNextWord === 0) {
      finishGame();
      setIsGameOver(true);
      setIsLost(true);
    }
  }, [timeForNextWord, setIsGameOver, setIsLost, finishGame]);

  return <TimerContext.Provider value={{ timeForNextWord }}>{children}</TimerContext.Provider>;
};
