import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels, LetterTypes } from "../constants.ts";
import type { TLetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, IFullLetterTypeWeights } from "../interfaces.ts";

const { consonant, vowel } = LetterTypes;

const generateWeightedLetterFromLetterTypeWeights = (letterTypeWeights: IFullLetterTypeWeights) => {
  const random = randomNumber({ min: 1, max: 100 });
  console.info('What is random number?', random);
  let letterType!: TLetterTypes;
  for (const weightName in letterTypeWeights) {
    const weightType = weightName as TLetterTypes;
    const weight = letterTypeWeights[weightType];
    const { start, end } = weight;
    console.info('random', random, 'start', start, 'random >= start', random >= start);
    console.info( 'random', random, 'end', end, 'random <= end', random <= end);
    if (random >= start && random <= end) {
      letterType = weightType;
      console.info(`generating a letter that is a ${weightType}`)
      break;
    }
  }

  const randomLetter = getRandomLetterFromLetterType(letterType);
  return randomLetter;
}

const getRandomLetterFromLetterType = (letterType: TLetterTypes) => {

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


export { generateWeightedLetterFromLetterTypeWeights, getRandomLetterFromLetterType, convertSimpleToFullLetterTypeWeightedRange };
