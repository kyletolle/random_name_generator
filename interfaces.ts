import { LetterTypes } from "./constants.ts";

const { consonant, vowel } = LetterTypes;

interface ISimpleWeightedRange {
  length: number;
}

interface ISimpleLetterTypeWeights {
  [consonant]: ISimpleWeightedRange;
  [vowel]: ISimpleWeightedRange;
}

interface IFullWeightedRange {
  start: number;
  end: number;
}

interface IFullLetterTypeWeights {
  [consonant]: IFullWeightedRange;
  [vowel]: IFullWeightedRange
}

export type { ISimpleWeightedRange, ISimpleLetterTypeWeights, IFullWeightedRange, IFullLetterTypeWeights };
