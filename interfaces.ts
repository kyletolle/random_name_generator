import { LetterTypes } from './constants.ts';

const { consonant, vowel } = LetterTypes;

interface ISimpleLetterWeights {
  [letter: string]: number;
}

interface ISimpleLetterTypeWeights {
  [consonant]: number;
  [vowel]: number;
}

interface IFullWeightedRange {
  start: number;
  end: number;
}

interface IFullLetterTypeWeights {
  [consonant]: IFullWeightedRange;
  [vowel]: IFullWeightedRange;
}

interface IGenericFullWeights {
  [name: string]: IFullWeightedRange;
}

export type {
  IFullLetterTypeWeights,
  IFullWeightedRange,
  IGenericFullWeights,
  ISimpleLetterTypeWeights,
  ISimpleLetterWeights,
};
