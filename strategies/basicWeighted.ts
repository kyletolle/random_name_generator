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

interface IWeightedRange {
  start: number;
  end: number;
}

interface Weights {
 [LETTERTYPE_CONSONANT]: IWeightedRange;
 [LETTERTYPE_VOWEL]: IWeightedRange
}

const weightedTowardConsonant: Weights = {
  [LETTERTYPE_CONSONANT]: { start: 1, end: 95 },
  [LETTERTYPE_VOWEL]: { start: 96, end: 100 }
};

const weightedTowardVowel: Weights = {
  [LETTERTYPE_CONSONANT]: { start: 1, end: 5 },
  [LETTERTYPE_VOWEL]: { start: 6, end: 100 }
}

// TODO: Create a simple weighted range, where you can specify the name as a key
// and the value is how long the range should be, then make a weighted range
// factory that can take in one of the simple ranges and make a weighted range
// from that with the appropriate start and ends.

const generateWeightedLetter = (letterTypeWeights: Weights) => {
  const random = randomNumber({ min: 1, max: 100 });
  console.info('What is random number?', random);
  let letterType!: LETTER_TYPES;
  for (const weightName in letterTypeWeights) {
    const weightType = weightName as LETTER_TYPES;
    const weight = letterTypeWeights[weightType];
    const { start, end } = weight;
    console.info("random >= start", random, start, random >= start);
    console.info("random <= end", random, end, random <= end);
    if (random >= start && random <= end) {
      letterType = weightType;
      console.info(`generating a letter that is a ${weightType}`)
      break;
    }
  }

  const randomLetter = getRandomLetter(letterType);
  return randomLetter;
}

const getInitialLetter = () => {
  const randomInitialLetter = generateWeightedLetter(weightedTowardConsonant).toUpperCase()
  return randomInitialLetter;
}

const nameLength = randomNumber({ min: 2, max: 10});
const letters: string[] = [];
letters[0] = getInitialLetter();
let nextLetterTypeWeights: Weights = weightedTowardVowel;
for(let i = 1; i < nameLength; i++) {
  const randomLetter = generateWeightedLetter(nextLetterTypeWeights);
  letters.push(randomLetter);
  const isLetterAVowel = vowels.includes(randomLetter);
  nextLetterTypeWeights = isLetterAVowel ? weightedTowardConsonant : weightedTowardVowel;
  console.info(`Next letter should be weighted toward ${isLetterAVowel ? 'consonant' : 'vowel'}`, nextLetterTypeWeights)
}
const randomName = letters.join('');
return randomName;
}


export default generateRandomName;
