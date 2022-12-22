import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels } from "../constants.ts";

const generateRandomName = () => {
const LETTERTYPE_CONSONANT = 'consonant';
const LETTERTYPE_VOWEL = 'vowel';
type LETTER_TYPES = typeof LETTERTYPE_CONSONANT | typeof LETTERTYPE_VOWEL;

const getRandomLetter = (letterType: LETTER_TYPES) => {
  switch (letterType) {
    case LETTERTYPE_CONSONANT:
      return consonants[randomNumber({min: 0, max: consonants.length - 1})]
    default:
      return vowels[randomNumber({min: 0, max: vowels.length - 1})]
  }
}

interface WeightedRange {
  start: number;
  end: number;
}

interface Weights {
 [LETTERTYPE_CONSONANT]: WeightedRange;
 [LETTERTYPE_VOWEL]: WeightedRange
}

const getInitialLetter = () => {
  const weights: Weights =  {
    [LETTERTYPE_CONSONANT]: { start: 1, end: 75 },
    [LETTERTYPE_VOWEL]: { start: 76, end: 100 }
  };
  const random = randomNumber();
  let letterType!: LETTER_TYPES;
  for (const weightName in weights) {
    const weightType = weightName as LETTER_TYPES;
    const weight = weights[weightType];
    const { start, end } = weight;
    if (random >= start && random <= end) {
      letterType = weightType;
      break;
    }
  }

  const randomInitialLetter = getRandomLetter(letterType).toUpperCase()
  return randomInitialLetter;
}

const nameLength = randomNumber({ min: 2, max: 10});
const letters: string[] = [];
letters[0] = getInitialLetter();
for(let i = 1; i < nameLength; i++) {
  const randomLetterTypeValue = Math.round(randomNumber({min: 0, max: 1, integer: false}));
  const randomLetterType= randomLetterTypeValue === 1 ? LETTERTYPE_CONSONANT : LETTERTYPE_VOWEL;

  const randomLetter = getRandomLetter(randomLetterType);
  letters.push(randomLetter);
}
const randomName = letters.join('');
return randomName;
}


export default generateRandomName;

