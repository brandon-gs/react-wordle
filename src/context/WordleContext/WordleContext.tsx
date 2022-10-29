import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ModalsContext } from "../ModalsContext/ModalsContext";
import { BOARD_SIZE, getIsLetter, getValidWords, initializeBoard, WordlePriorityStatus } from "./WordleContext.helpers";
import type {
  WordleBoardData,
  WordleContextState,
  WordleLetterStatus,
  WordleRevealedLetters,
} from "./WordleContext.types";

const initialState: WordleContextState = {
  isGameOver: false,
  isLost: false,
  board: [],
  solution: "",
  currentWord: "",
  currentLineIdx: 0,
  stats: {
    games: 0,
    victories: 0,
  },
  revealedLetters: {},
  generateSolution: () => null,
  finishGame: () => null,
  setIsGameOver: () => null,
  setIsLost: () => null,
  handlePressBackspace: () => null,
  handlePressLetter: () => null,
  handlePressEnter: () => null,
};

export const WordleContext = createContext<WordleContextState>(initialState);

export const WordleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { modals, openModalByKey } = useContext(ModalsContext);

  const [isLost, setIsLost] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [games, setGames] = useState<number>(0);
  const [victories, setVictories] = useState<number>(0);

  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);

  const [solution, setSolution] = useState<string>("");
  const [board, setBoard] = useState<WordleBoardData>(initializeBoard());

  const [validWords, setValidWords] = useState<string[]>([]);

  const [revealedLetters, setRevealedLetters] = useState<WordleRevealedLetters>({});

  const handleRevealedLetters = useCallback((boardToReveale: WordleBoardData) => {
    const newLetters = boardToReveale.flatMap((row) => row).filter((item) => item.status !== "default");
    setRevealedLetters((prevRevealedLetters) => {
      const newRevealedLetters: Record<string, WordleLetterStatus> = {};
      /**
       * Keep higher priority status if was revealed before on keyboard
       */
      newLetters.forEach((item) => {
        const currentStatus = prevRevealedLetters[item.letter] ?? 0;
        const currentPriorityStatus = WordlePriorityStatus[currentStatus] ?? null;
        const nextPriorityStatus = WordlePriorityStatus[item.status];
        if (currentPriorityStatus < nextPriorityStatus) {
          newRevealedLetters[item.letter] = item.status;
          return;
        }
      });
      return { ...prevRevealedLetters, ...newRevealedLetters };
    });
  }, []);

  const handleSetIsLost = useCallback((newIsLost: boolean) => {
    setIsLost(newIsLost);
  }, []);

  const handleSetIsGameOver = useCallback((newIsGameOver: boolean) => {
    setIsGameOver(newIsGameOver);
  }, []);

  const getRandomSolution = (words: string[]) => {
    if (words.length === 0) alert("Ya no hay más palabras para jugar!");
    const randomIndex = Math.floor(Math.random() * words.length);
    const newSolution = words[randomIndex];
    console.log(`Solucion: ${newSolution}`);
    setSolution(newSolution);
    return randomIndex;
  };

  const handleGenerateNewSolution = useCallback(() => {
    const randomIndex = getRandomSolution(validWords);
    if (randomIndex !== -1) {
      const copyValidWords = [...validWords];
      copyValidWords.splice(randomIndex, 1);
      setValidWords(copyValidWords);
      console.log(`palabras disponibles para jugar: ${copyValidWords.length}`);
    }
  }, [validWords]);

  const finishGame = useCallback(() => {
    setIsGameOver(true);
    setGames((prevGames) => prevGames + 1);
    openModalByKey("showStats");
    setCurrentWord("");
    setCurrentLineIdx(0);
    setBoard(initializeBoard());
    setRevealedLetters({});
  }, [openModalByKey]);

  const handlePressLetter = useCallback(
    (keyPressed: string) => {
      // If the row is fill then dont execute this
      const hasFiveLetters = currentWord.length === 5;
      if (hasFiveLetters) return;

      const keyUppercase = keyPressed.toUpperCase();
      const currentColIdx = currentWord.length;
      setCurrentWord((prevWord) => prevWord + keyUppercase);
      setBoard((prevBoard) => {
        const copyBoard = [...prevBoard];
        copyBoard[currentLineIdx][currentColIdx].letter = keyUppercase;
        return copyBoard;
      });
    },
    [currentLineIdx, currentWord.length],
  );

  const handlePressBackspace = useCallback(() => {
    // Dont delete when word is empty
    const hasWord = currentWord.length > 0;
    if (!hasWord) return;

    const currentColIdx = currentWord.length;
    const prevLetterIdx = currentColIdx - 1;
    setCurrentWord((prevWord) => prevWord.slice(0, prevWord.length - 1));
    setBoard((prevBoard) => {
      const copyBoard = [...prevBoard];
      copyBoard[currentLineIdx][prevLetterIdx].letter = "";
      return copyBoard;
    });
  }, [currentLineIdx, currentWord.length]);

  const handlePressEnter = useCallback(() => {
    // If the row isn't fill then dont execute this
    const hasFiveLetters = currentWord.length === 5;
    if (!hasFiveLetters) return;

    const copyBoard = [...board];
    let correctLetters = 0;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === solution[i]) {
        copyBoard[currentLineIdx][i].status = "correct";
        correctLetters++;
      } else if (solution.includes(currentWord[i])) {
        copyBoard[currentLineIdx][i].status = "present";
      } else {
        copyBoard[currentLineIdx][i].status = "absent";
      }
    }
    // The user guessed the word
    const gameOver = correctLetters === 5;
    if (gameOver) {
      setVictories((prevVictories) => prevVictories + 1);
      finishGame();
      return;
    }
    setCurrentLineIdx((prevLineIdx) => prevLineIdx + 1);
    setCurrentWord("");
    setBoard(copyBoard);
    handleRevealedLetters(copyBoard);
  }, [board, currentLineIdx, currentWord, finishGame, handleRevealedLetters, solution]);

  /**
   * Read all the words at the beggining, assign the solution and remove it from the validWords array
   */
  useLayoutEffect(() => {
    if (validWords.length > 0) return;
    const getInitialWords = async () => {
      const wordsFromDict = await getValidWords();
      const randomIndex = getRandomSolution(wordsFromDict);
      wordsFromDict.splice(randomIndex, 1);
      setValidWords(wordsFromDict);
      console.log(`palabras disponibles para jugar: ${wordsFromDict.length}`);
    };
    getInitialWords();
  }, [validWords.length]);

  /**
   * Listen for the keyboard press event
   */
  useLayoutEffect(() => {
    const handleKeyboardPress = (event: KeyboardEvent) => {
      // Avoid play when a modal is opened
      if (Object.values(modals).includes(true)) {
        return;
      }

      const key = event.key.toUpperCase();
      const isLetter = getIsLetter(key);

      // Handle enter key press
      if (key === "ENTER") {
        handlePressEnter();
        return;
      }

      // Handle delete letter
      if (key === "BACKSPACE") {
        handlePressBackspace();
        return;
      }

      // Update board when press a letter
      if (isLetter) {
        handlePressLetter(key);
        return;
      }
    };
    window.addEventListener("keydown", handleKeyboardPress);
    return () => {
      window.removeEventListener("keydown", handleKeyboardPress);
    };
  }, [currentWord, modals, handlePressLetter, handlePressBackspace, handlePressEnter]);

  /**
   * Allow handle when the user enter all the rows so we can finish the game and show the modal
   */
  useEffect(() => {
    if (currentLineIdx >= BOARD_SIZE) {
      finishGame();
      setIsGameOver(true);
      setIsLost(true);
    }
  }, [currentLineIdx, openModalByKey, finishGame]);

  return (
    <WordleContext.Provider
      value={{
        isLost,
        isGameOver,
        solution,
        board,
        currentWord,
        revealedLetters,
        currentLineIdx,
        stats: { games, victories },
        generateSolution: handleGenerateNewSolution,
        setIsGameOver: handleSetIsGameOver,
        setIsLost: handleSetIsLost,
        finishGame,
        handlePressLetter,
        handlePressEnter,
        handlePressBackspace,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
