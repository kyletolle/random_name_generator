import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels, LetterTypes } from "../constants.ts";
import type { TLetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, IFullLetterTypeWeights, IGenericWeights, IFullWeightedRange } from "../interfaces.ts";

const { consonant, vowel } = LetterTypes;

interface INamedWeightedRange {
  name: string;
  range: IFullWeightedRange;
}

const generateWeightedRangeFromWeights = (weights: IGenericWeights): INamedWeightedRange => {
  const random = randomNumber({ min: 1, max: 100 });

  console.info('What is random number?', random);
  let chosenName!: string;
  let chosenRange!: IFullWeightedRange;


  for (const weightName in weights) {
    const weight = weights[weightName];
    const { start, end } = weight;
    console.info('random', random, 'start', start, 'random >= start', random >= start);
    console.info( 'random', random, 'end', end, 'random <= end', random <= end);
    if (random >= start && random <= end) {
      chosenName = weightName;
      chosenRange = weight;
      console.info(`using a value that is a ${weight}`)

      break;
    }
  }

  return { name: chosenName, range: chosenRange };
}

const generateRandomEquallyWeightedLetterFromLetterTypeWeights = (letterTypeWeights: IFullLetterTypeWeights) => {
  const namedWeightedRange = generateWeightedRangeFromWeights(letterTypeWeights as unknown as IGenericWeights);

  const letterType = namedWeightedRange.name as TLetterTypes;

  const randomLetter = getRandomEquallyWeightedLetterFromLetterType(letterType);
  return randomLetter;
}

const getRandomEquallyWeightedLetterFromLetterType = (letterType: TLetterTypes) => {
  switch (letterType) {
    case consonant:
      return consonants[randomNumber({min: 0, max: consonants.length - 1})]
    default:
      return vowels[randomNumber({min: 0, max: vowels.length - 1})]
  }
}

const convertSimpleToFullLetterTypeWeightedRange = (simpleWeights: ISimpleLetterTypeWeights): IFullLetterTypeWeights => {
  let lastLength = 0;
  const fullWeights: IFullLetterTypeWeights = {
    [consonant]: { start: 0, end: 0 },
    [vowel]: { start: 0, end: 0 },
  };

  for (const simpleWeightKey in simpleWeights) {
    const simpleWeight = simpleWeights[simpleWeightKey as TLetterTypes];
    const start = lastLength + 1;
    const end = lastLength + simpleWeight.length;
    lastLength = end;
    const fullRange = { start, end };
    fullWeights[simpleWeightKey as TLetterTypes] = fullRange;
  }

  return fullWeights;
}


export { generateRandomEquallyWeightedLetterFromLetterTypeWeights, getRandomEquallyWeightedLetterFromLetterType, convertSimpleToFullLetterTypeWeightedRange };
