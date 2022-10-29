import type { WordleLetterStatus } from "@/context";

const BoardItemAbsentClasses = `bg-boardItemAbsent`;
const BoardItemCorrectClasses = `bg-boardItemCorrect`;
const BoardItemPresentClasses = `bg-boardItemPresent`;
const BoardItemExampleClasses = `bg-white dark:bg-dark  border-lightBorderItem dark:border-darkBorderItem border`;
export const BoardItemDefaultClasses = `bg-boardItemDefault text-lightKeyText dark:text-darkText`;

export const boardItemClassesByStatus: Record<WordleLetterStatus, string> = {
  absent: BoardItemAbsentClasses,
  correct: BoardItemCorrectClasses,
  present: BoardItemPresentClasses,
  example: BoardItemExampleClasses,
  default: BoardItemDefaultClasses,
};
