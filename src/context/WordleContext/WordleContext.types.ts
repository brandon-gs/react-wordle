export type WordleLetterStatus = "absent" | "present" | "correct" | "example" | "default";

export interface WordleBoardItem {
  letter: string;
  status: WordleLetterStatus;
}

export interface WordleStats {
  victories: number;
  games: number;
}

export type WordleBoardData = Array<WordleBoardItem[]>;

export type WordleRevealedLetters = Record<string, WordleLetterStatus>;

export interface WordleContextState {
  solution: string;
  currentWord: string;
  currentLineIdx: number;
  stats: WordleStats;
  board: WordleBoardData;
  isLost: boolean;
  isGameOver: boolean;
  revealedLetters: WordleRevealedLetters;
  generateSolution: () => void;
  setIsLost: (newIsLost: boolean) => void;
  setIsGameOver: (newIsGameOver: boolean) => void;
  finishGame: () => void;
  handlePressLetter: (letter: string) => void;
  handlePressEnter: () => void;
  handlePressBackspace: () => void;
}
