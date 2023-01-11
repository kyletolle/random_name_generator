import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels } from "../constants.ts";

const generateRandomName = () => {
  const LETTERTYPE_CONSONANT = 'consonant';
  const LETTERTYPE_VOWEL = 'vowel';
  type LETTER_TYPES = typeof LETTERTYPE_CONSONANT | typeof LETTERTYPE_VOWEL;

  const getRandomLetterFromLetterType = (letterType: LETTER_TYPES) => {
    switch (letterType) {
      case LETTERTYPE_CONSONANT:
        return consonants[randomNumber({min: 0, max: consonants.length - 1})]
      default:
        return vowels[randomNumber({min: 0, max: vowels.length - 1})]
    }
  }

  interface ISimpleWeightedRange {
    length: number;
  }

  interface ISimpleLetterTypeWeights {
    [LETTERTYPE_CONSONANT]: ISimpleWeightedRange;
    [LETTERTYPE_VOWEL]: ISimpleWeightedRange;
  }

  const simpleLetterTypeWeightedTowardConsonant: ISimpleLetterTypeWeights = {
    [LETTERTYPE_CONSONANT]: { length: 95 },
    [LETTERTYPE_VOWEL]: { length: 5 },
  };

  const simpleLetterTypeWeightedTowardVowel: ISimpleLetterTypeWeights = {
    [LETTERTYPE_CONSONANT]: { length: 5 },
    [LETTERTYPE_VOWEL]: { length: 95 },
  }

  const convertSimpleToFullLetterTypeWeightedRange = (simpleWeights: ISimpleLetterTypeWeights): IFullLetterTypeWeights => {
    let lastLength = 0;
    const fullWeights: IFullLetterTypeWeights = {
      [LETTERTYPE_CONSONANT]: { start: 0, end: 0 },
      [LETTERTYPE_VOWEL]: { start: 0, end: 0 },
    };
    for (const simpleWeightKey in simpleWeights) {
      const simpleWeight = simpleWeights[simpleWeightKey as LETTER_TYPES];
      const start = lastLength + 1;
      const end = lastLength + simpleWeight.length;
      lastLength = end;
      const fullRange = { start, end };
      fullWeights[simpleWeightKey as LETTER_TYPES] = fullRange;
    }

    return fullWeights;
  }

  interface IFullWeightedRange {
    start: number;
    end: number;
  }

  interface IFullLetterTypeWeights {
  [LETTERTYPE_CONSONANT]: IFullWeightedRange;
  [LETTERTYPE_VOWEL]: IFullWeightedRange
  }

  const letterTypeWeightedTowardConsonant: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardConsonant);

  const letterTypeWeightedTowardVowel: IFullLetterTypeWeights = convertSimpleToFullLetterTypeWeightedRange(simpleLetterTypeWeightedTowardVowel);

  const generateWeightedLetterFromLetterType = (letterTypeWeights: IFullLetterTypeWeights) => {
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

    const randomLetter = getRandomLetterFromLetterType(letterType);
    return randomLetter;
  }

  const getInitialLetterFromLetterType = () => {
    const randomInitialLetter = generateWeightedLetterFromLetterType(letterTypeWeightedTowardConsonant).toUpperCase()
    return randomInitialLetter;
  }

  const nameLength = randomNumber({ min: 2, max: 10});
  const letters: string[] = [];
  letters[0] = getInitialLetterFromLetterType();
  let nextLetterTypeWeights: IFullLetterTypeWeights = letterTypeWeightedTowardVowel;
  for(let i = 1; i < nameLength; i++) {
    const randomLetter = generateWeightedLetterFromLetterType(nextLetterTypeWeights);
    letters.push(randomLetter);
    const isLetterAVowel = vowels.includes(randomLetter);
    nextLetterTypeWeights = isLetterAVowel ? letterTypeWeightedTowardConsonant : letterTypeWeightedTowardVowel;
    console.info(`Next letter should be weighted toward ${isLetterAVowel ? 'consonant' : 'vowel'}`, nextLetterTypeWeights)
  }
  const randomName = letters.join('');
  return randomName;
}


export default generateRandomName;
