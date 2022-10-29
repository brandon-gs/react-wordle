import { WordleBoardItem } from "@/context";
import { InstructionsExampleProps } from "./InstructionsExample";

const defaultItemProps = {
  isSelected: false,
};

const firstExample: WordleBoardItem[] = [
  {
    letter: "G",
    status: "correct",
    ...defaultItemProps,
  },
  {
    letter: "A",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "T",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "O",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "S",
    status: "example",
    ...defaultItemProps,
  },
];

const secondExample: WordleBoardItem[] = [
  {
    letter: "V",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "O",
    status: "example",

    ...defaultItemProps,
  },
  {
    letter: "C",
    status: "present",

    ...defaultItemProps,
  },
  {
    letter: "A",
    status: "example",

    ...defaultItemProps,
  },
  {
    letter: "L",
    status: "example",
    ...defaultItemProps,
  },
];

const thirdExample: WordleBoardItem[] = [
  {
    letter: "C",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "A",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "N",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "T",
    status: "example",
    ...defaultItemProps,
  },
  {
    letter: "O",
    status: "absent",
    ...defaultItemProps,
  },
];

export const examples: InstructionsExampleProps[] = [
  {
    items: firstExample,
    letter: "G",
    text: "está en la palabra y en la posición correcta",
  },
  {
    items: secondExample,
    letter: "C",
    text: "está en la palabra pero en la posición incorrecta",
  },
  {
    items: thirdExample,
    letter: "O",
    text: "no está en la palabra",
  },
];
