import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { LetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, IFullLetterTypeWeights } from "../interfaces.ts";
import { convertSimpleToFullLetterTypeWeightedRange, generateWeightedLetterFromLetterTypeWeights } from "../weights/index.ts";

const generateRandomName = () => {
  const { consonant, vowel } = LetterTypes;

  const simpleLetterTypeEqualWeights : ISimpleLetterTypeWeights = {
    [consonant]: { length: 50 },
    [vowel]: { length: 50 },
  };
  const letterTypeWeightedEqually: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeEqualWeights);

  const nameLength = randomNumber({ min: 2, max: 10});
  const letters: string[] = [];

  for(let i = 0; i < nameLength; i++) {
    const randomLetter = generateWeightedLetterFromLetterTypeWeights(letterTypeWeightedEqually);
    letters.push(randomLetter);
  }

  letters[0] = letters[0].toUpperCase();
  const randomName = letters.join('');

  return randomName;
}


export default generateRandomName;
