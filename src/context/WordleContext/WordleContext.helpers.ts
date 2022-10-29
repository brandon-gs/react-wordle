import wordsDict from "@/assets/words.txt";
import type { WordleBoardData, WordleBoardItem, WordleLetterStatus } from "./WordleContext.types";

const regexLetters = /^[A-Za-z]$/;

export const BOARD_SIZE = 5;

const DEFAULT_BOARD_ITEM: WordleBoardItem = {
  letter: "",
  status: "default",
};

export async function getValidWords() {
  const wordsText = await (await fetch(wordsDict)).text();
  const wordsArray = wordsText.split("\n");
  const filteredWords = wordsArray.filter((word) => word.length === 5);
  const normalizeWords = filteredWords.map((word) => {
    return word
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  });
  return normalizeWords;
}

export function initializeBoard(): WordleBoardData {
  const initialBoard: WordleBoardData = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const row: WordleBoardItem[] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      row[col] = { ...DEFAULT_BOARD_ITEM };
    }
    initialBoard.push(row);
  }
  return initialBoard;
}

export function getIsLetter(keyCode: string) {
  return regexLetters.test(keyCode);
}

export const WordlePriorityStatus: Record<WordleLetterStatus, number> = {
  correct: 5,
  present: 4,
  absent: 3,
  default: 2,
  example: 1,
};
