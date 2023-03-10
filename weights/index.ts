import { randomNumber } from 'https://deno.land/x/random_number@2.0.0/mod.ts';
import { consonants, LetterTypes, vowels } from '../constants.ts';
import type { TLetterTypes } from '../constants.ts';
import type {
  IFullLetterTypeWeights,
  IFullWeightedRange,
  IGenericFullWeights,
  ISimpleLetterTypeWeights,
  ISimpleLetterWeights,
} from '../interfaces.ts';

const { consonant, vowel } = LetterTypes;

interface INamedWeightedRange {
  name: string;
  range: IFullWeightedRange;
}

const generateWeightedRangeFromWeights = (
  weights: IGenericFullWeights,
): INamedWeightedRange => {
  const random = randomNumber({ min: 1, max: 100 });

  // console.info('What is random number?', random);
  let chosenName!: string;
  let chosenRange!: IFullWeightedRange;

  for (const weightName in weights) {
    const weight = weights[weightName];
    const { start, end } = weight;
    // console.info('weightName', weightName, 'random', random, 'start', start, 'random >= start', random >= start);
    // console.info('weightName', weightName, 'random', random, 'end', end, 'random <= end', random <= end);
    if (random >= start && random <= end) {
      chosenName = weightName;
      chosenRange = weight;
      console.info(`using a value that is a '${weightName}'`);

      break;
    }
  }

  return { name: chosenName, range: chosenRange };
};

const generateRandomEquallyWeightedLetterFromLetterTypeWeights = (
  letterTypeWeights: IFullLetterTypeWeights,
) => {
  const namedWeightedRange = generateWeightedRangeFromWeights(
    letterTypeWeights as unknown as IGenericFullWeights,
  );

  const letterType = namedWeightedRange.name as TLetterTypes;

  const randomLetter = getRandomEquallyWeightedLetterFromLetterType(letterType);
  return randomLetter;
};

const generateRandomLetterFromLetterWeights = (
  letterWeights: IGenericFullWeights,
): string => {
  const namedWeightedRange = generateWeightedRangeFromWeights(letterWeights);

  const randomLetter = namedWeightedRange.name;
  return randomLetter;
};

const getRandomEquallyWeightedLetterFromLetterType = (
  letterType: TLetterTypes,
) => {
  switch (letterType) {
    case consonant:
      return consonants[randomNumber({ min: 0, max: consonants.length - 1 })];
    default:
      return vowels[randomNumber({ min: 0, max: vowels.length - 1 })];
  }
};

const convertSimpleLetterWeightsToGenericFullWeights = (
  simpleWeights: ISimpleLetterWeights,
): IGenericFullWeights => {
  // Check that the weights all sum up to 100 exactly
  const weightsSum = Object.keys(simpleWeights).map((letter) =>
    simpleWeights[letter]
  ).reduce((accumulator, weightValue) => (accumulator + weightValue), 0);
  if (weightsSum !== 100) {
    throw new Error(
      `Simple Weights do not sum up to 100. Sum is ${weightsSum}: ${simpleWeights}`,
    );
  }

  const fullWeights: IGenericFullWeights = {};

  let lastLength = 0;

  for (const simpleLetterWeightKey in simpleWeights) {
    const simpleLetterWeightLength =
      simpleWeights[simpleLetterWeightKey as TLetterTypes];
    if (simpleLetterWeightLength === 0) continue;

    const start = lastLength + 1;
    const end = lastLength + simpleLetterWeightLength;
    lastLength = end;
    const fullRange = { start, end };
    fullWeights[simpleLetterWeightKey] = fullRange;
  }

  return fullWeights;
};

const convertSimpleToFullLetterTypeWeightedRange = (
  simpleWeights: ISimpleLetterTypeWeights,
): IFullLetterTypeWeights => {
  let lastLength = 0;
  const fullWeights: IFullLetterTypeWeights = {
    [consonant]: { start: 0, end: 0 },
    [vowel]: { start: 0, end: 0 },
  };

  for (const simpleWeightKey in simpleWeights) {
    const simpleWeightLength = simpleWeights[simpleWeightKey as TLetterTypes];
    const start = lastLength + 1;
    const end = lastLength + simpleWeightLength;
    lastLength = end;
    const fullRange = { start, end };
    fullWeights[simpleWeightKey as TLetterTypes] = fullRange;
  }

  return fullWeights;
};

export {
  convertSimpleLetterWeightsToGenericFullWeights,
  convertSimpleToFullLetterTypeWeightedRange,
  generateRandomEquallyWeightedLetterFromLetterTypeWeights,
  generateRandomLetterFromLetterWeights,
  generateWeightedRangeFromWeights,
  getRandomEquallyWeightedLetterFromLetterType,
};
