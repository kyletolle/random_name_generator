import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { vowels, LetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, IFullLetterTypeWeights } from "../interfaces.ts";
import { convertSimpleToFullLetterTypeWeightedRange, generateWeightedLetterFromLetterTypeWeights } from "../weights/index.ts";

const generateRandomName = () => {
  const { consonant, vowel } = LetterTypes;

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
