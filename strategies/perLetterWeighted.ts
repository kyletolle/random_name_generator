import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { vowels, LetterTypes } from "../constants.ts";
import type { ISimpleLetterTypeWeights, ISimpleLetterWeights, IFullLetterTypeWeights, IGenericFullWeights } from "../interfaces.ts";
import { convertSimpleLetterWeightsToGenericFullWeights, convertSimpleToFullLetterTypeWeightedRange, generateRandomEquallyWeightedLetterFromLetterTypeWeights, generateRandomLetterFromLetterWeights, generateWeightedRangeFromWeights } from "../weights/index.ts";

const simpleConsonantLetterWeights: ISimpleLetterWeights = {
  'b': 12,
  'c': 11,
  'd': 5,
  'f': 5,
  'g': 5,
  'h': 11,
  'j': 1,
  'k': 2,
  'l': 1,
  'm': 2,
  'n': 5,
  'p': 5,
  'q': 5,
  'r': 10,
  's': 2,
  't': 2,
  'v': 2,
  'w': 2,
  'x': 2,
  'z': 10,
};

const simpleVowelLetterWeights: ISimpleLetterWeights = {
  'a': 30,
  'e': 10,
  'i': 10,
  'o': 30,
  'u': 10,
  'y': 10,
};


const generateRandomName = () => {
  const { consonant, vowel } = LetterTypes;

  const simpleLetterTypeWeightedTowardConsonant: ISimpleLetterTypeWeights = {
    [consonant]: 95,
    [vowel]: 5,
  };
  const letterTypeWeightedTowardConsonant: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardConsonant);

  const simpleLetterTypeWeightedTowardVowel: ISimpleLetterTypeWeights = {
    [consonant]: 5,
    [vowel]: 95,
  }
  const letterTypeWeightedTowardVowel: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardVowel);

  const consonantWeights: IGenericFullWeights = convertSimpleLetterWeightsToGenericFullWeights(simpleConsonantLetterWeights);
  const vowelWeights: IGenericFullWeights = convertSimpleLetterWeightsToGenericFullWeights(simpleVowelLetterWeights);

  const generateRandomConsonant = (): string => {
    const randomLetter = generateRandomLetterFromLetterWeights(consonantWeights);
    return randomLetter
  }

  const getInitialLetter = () => {
    return generateRandomConsonant().toUpperCase();
  }

  const generateRandomVowel = (): string => {
    const randomLetter = generateRandomLetterFromLetterWeights(vowelWeights);
    return randomLetter
  }

  const nameLength = randomNumber({ min: 2, max: 10});
  const letters: string[] = [];
  letters[0] = getInitialLetter();
  let nextLetterTypeWeights: IFullLetterTypeWeights = letterTypeWeightedTowardVowel;
  for(let i = 1; i < nameLength; i++) {
    const namedWeightedRange = generateWeightedRangeFromWeights(nextLetterTypeWeights as unknown as IGenericFullWeights);
    let randomLetter: string;
    switch (namedWeightedRange.name) {
      case consonant:
        randomLetter = generateRandomConsonant();
        break;

      default:
        randomLetter = generateRandomVowel();
        break;
    }
    letters.push(randomLetter);
    const isLetterAVowel = vowels.includes(randomLetter);
    nextLetterTypeWeights = isLetterAVowel ? letterTypeWeightedTowardConsonant : letterTypeWeightedTowardVowel;
    console.info(`Next letter should be weighted toward ${isLetterAVowel ? 'consonant' : 'vowel'}`, nextLetterTypeWeights)
  }
  const randomName = letters.join('');
  return randomName;
}

export default generateRandomName;
