import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels, LetterTypes } from "../constants.ts";
import type { TLetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, IFullLetterTypeWeights } from "../interfaces.ts";

const generateRandomName = () => {
  const { consonant, vowel } = LetterTypes;

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

  const simpleLetterTypeWeightedTowardConsonant: ISimpleLetterTypeWeights = {
    [consonant]: { length: 95 },
    [vowel]: { length: 5 },
  };
  const letterTypeWeightedTowardConsonant: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardConsonant);

  const simpleLetterTypeWeightedTowardVowel: ISimpleLetterTypeWeights = {
    [consonant]: { length: 5 },
    [vowel]: { length: 95 },
  }
  const letterTypeWeightedTowardVowel: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardVowel);

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

  const getInitialLetterFromLetterType = () => {
    const randomInitialLetter = generateWeightedLetterFromLetterTypeWeights(letterTypeWeightedTowardConsonant).toUpperCase()
    return randomInitialLetter;
  }

  const nameLength = randomNumber({ min: 2, max: 10});
  const letters: string[] = [];
  letters[0] = getInitialLetterFromLetterType();
  let nextLetterTypeWeights: IFullLetterTypeWeights = letterTypeWeightedTowardVowel;
  for(let i = 1; i < nameLength; i++) {
    const randomLetter = generateWeightedLetterFromLetterTypeWeights(nextLetterTypeWeights);
    letters.push(randomLetter);
    const isLetterAVowel = vowels.includes(randomLetter);
    nextLetterTypeWeights = isLetterAVowel ? letterTypeWeightedTowardConsonant : letterTypeWeightedTowardVowel;
    console.info(`Next letter should be weighted toward ${isLetterAVowel ? 'consonant' : 'vowel'}`, nextLetterTypeWeights)
  }
  const randomName = letters.join('');
  return randomName;
}

export default generateRandomName;
