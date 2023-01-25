import { randomNumber } from 'https://deno.land/x/random_number@2.0.0/mod.ts';
import { LetterTypes, vowels } from '../constants.ts';
import type {
  IFullLetterTypeWeights,
  IGenericFullWeights,
  ISimpleLetterTypeWeights,
  ISimpleLetterWeights,
} from '../interfaces.ts';
import {
  convertSimpleLetterWeightsToGenericFullWeights,
  convertSimpleToFullLetterTypeWeightedRange,
  generateRandomLetterFromLetterWeights,
  generateWeightedRangeFromWeights,
} from '../weights/index.ts';

const simpleConsonantLetterWeights: ISimpleLetterWeights = {
  'b': 21,
  'c': 21,
  'd': 1,
  'f': 1,
  'g': 0,
  'h': 21,
  'j': 0,
  'k': 1,
  'l': 0,
  'm': 1,
  'n': 1,
  'p': 12,
  'q': 0,
  'r': 18,
  's': 0,
  't': 1,
  'v': 0,
  'w': 0,
  'x': 0,
  'z': 1,
};

const simpleVowelLetterWeights: ISimpleLetterWeights = {
  'a': 48,
  'e': 1,
  'i': 1,
  'o': 48,
  'u': 1,
  'y': 1,
};

const { consonant, vowel } = LetterTypes;
const simpleLetterTypeWeightedTowardConsonant: ISimpleLetterTypeWeights = {
  [consonant]: 95,
  [vowel]: 5,
};
const letterTypeWeightedTowardConsonant: IFullLetterTypeWeights =
  convertSimpleToFullLetterTypeWeightedRange(
    simpleLetterTypeWeightedTowardConsonant,
  );

const simpleLetterTypeWeightedTowardVowel: ISimpleLetterTypeWeights = {
  [consonant]: 5,
  [vowel]: 95,
};
const letterTypeWeightedTowardVowel: IFullLetterTypeWeights =
  convertSimpleToFullLetterTypeWeightedRange(
    simpleLetterTypeWeightedTowardVowel,
  );

const consonantWeights: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights(simpleConsonantLetterWeights);
const vowelWeights: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights(simpleVowelLetterWeights);

const generateRandomConsonant = (): string => {
  const randomLetter = generateRandomLetterFromLetterWeights(consonantWeights);
  return randomLetter;
};

const generateInitialLetter = () => {
  return generateRandomConsonant().toUpperCase();
};

const generateRandomVowel = (): string => {
  const randomLetter = generateRandomLetterFromLetterWeights(vowelWeights);
  return randomLetter;
};

const generateRandomName = () => {
  const nameLength = randomNumber({ min: 2, max: 10 });
  const letters: string[] = [];
  letters[0] = generateInitialLetter();
  let nextLetterTypeWeights: IFullLetterTypeWeights =
    letterTypeWeightedTowardVowel;
  for (let i = 1; i < nameLength; i++) {
    const namedWeightedRange = generateWeightedRangeFromWeights(
      nextLetterTypeWeights as unknown as IGenericFullWeights,
    );
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
    nextLetterTypeWeights = isLetterAVowel
      ? letterTypeWeightedTowardConsonant
      : letterTypeWeightedTowardVowel;
    console.info(
      `Next letter should be weighted toward ${
        isLetterAVowel ? 'consonant' : 'vowel'
      }`,
      nextLetterTypeWeights,
    );
  }
  const randomName = letters.join('');
  return randomName;
};

export default generateRandomName;
