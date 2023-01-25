import { randomNumber } from 'https://deno.land/x/random_number@2.0.0/mod.ts';
import { IGenericFullWeights, ISimpleLetterWeights } from '../interfaces.ts';
import {
  convertSimpleLetterWeightsToGenericFullWeights,
  generateRandomLetterFromLetterWeights,
} from '../weights/index.ts';

const blankSimpleLetterWeights: ISimpleLetterWeights = {
  'a': 0,
  'b': 0,
  'c': 0,
  'd': 0,
  'e': 0,
  'f': 0,
  'g': 0,
  'h': 0,
  'i': 0,
  'j': 0,
  'k': 0,
  'l': 0,
  'm': 0,
  'n': 0,
  'o': 0,
  'p': 0,
  'q': 0,
  'r': 0,
  's': 0,
  't': 0,
  'u': 0,
  'v': 0,
  'w': 0,
  'x': 0,
  'y': 0,
  'z': 0,
};
console.info(typeof blankSimpleLetterWeights);

const initialSimpleLetterWeights: ISimpleLetterWeights = {
  'a': 25,
  'b': 25,
  'c': 25,
  'd': 0,
  'e': 0,
  'f': 0,
  'g': 0,
  'h': 0,
  'i': 0,
  'j': 0,
  'k': 0,
  'l': 0,
  'm': 0,
  'n': 0,
  'o': 0,
  'p': 0,
  'q': 0,
  'r': 0,
  's': 0,
  't': 25,
  'u': 0,
  'v': 0,
  'w': 0,
  'x': 0,
  'y': 0,
  'z': 0,
};
const initialFullLetterWeights: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights(initialSimpleLetterWeights);

const lettersToFollowA: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 0,
    'b': 17,
    'c': 17,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 17,
    'i': 0,
    'j': 0,
    'k': 17,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 16,
    'q': 0,
    'r': 0,
    's': 0,
    't': 16,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowB: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 50,
    'b': 1,
    'c': 15,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 25,
    'i': 0,
    'j': 0,
    'k': 5,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 2,
    'q': 0,
    'r': 0,
    's': 0,
    't': 2,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowC: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 45,
    'b': 1,
    'c': 1,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 50,
    'i': 0,
    'j': 0,
    'k': 1,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 1,
    'q': 0,
    'r': 0,
    's': 0,
    't': 1,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowH: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 85,
    'b': 5,
    'c': 5,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 0,
    'i': 0,
    'j': 0,
    'k': 1,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 1,
    'q': 0,
    'r': 0,
    's': 0,
    't': 3,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowK: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 75,
    'b': 5,
    'c': 5,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 0,
    'i': 0,
    'j': 0,
    'k': 5,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 5,
    'q': 0,
    'r': 0,
    's': 0,
    't': 5,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowP: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 50,
    'b': 1,
    'c': 1,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 45,
    'i': 0,
    'j': 0,
    'k': 1,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 1,
    'q': 0,
    'r': 0,
    's': 0,
    't': 1,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

const lettersToFollowT: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights({
    'a': 50,
    'b': 1,
    'c': 1,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 45,
    'i': 0,
    'j': 0,
    'k': 1,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 1,
    'q': 0,
    'r': 0,
    's': 0,
    't': 1,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  });

// Not truly equal, but close enough given weights that are 1-100 instead of 1-1000
const equalSimpleLetterWeights: ISimpleLetterWeights = {
  'a': 4,
  'b': 4,
  'c': 4,
  'd': 4,
  'e': 4,
  'f': 4,
  'g': 4,
  'h': 4,
  'i': 4,
  'j': 4,
  'k': 4,
  'l': 4,
  'm': 4,
  'n': 4,
  'o': 4,
  'p': 4,
  'q': 3,
  'r': 4,
  's': 4,
  't': 4,
  'u': 3,
  'v': 4,
  'w': 4,
  'x': 3,
  'y': 4,
  'z': 3,
};
const lettersToFollowGeneric: IGenericFullWeights =
  convertSimpleLetterWeightsToGenericFullWeights(equalSimpleLetterWeights);
console.info(typeof lettersToFollowGeneric);

const getCurrentLetterWeights = (previousLetter: string) => {
  let currentLetterWeights;
  switch (previousLetter.toLocaleLowerCase()) {
    case 'a':
      currentLetterWeights = lettersToFollowA;
      break;

    case 'b':
      currentLetterWeights = lettersToFollowB;
      break;

    case 'c':
      currentLetterWeights = lettersToFollowC;
      break;

    case 'h':
      currentLetterWeights = lettersToFollowH;
      break;

    case 'k':
      currentLetterWeights = lettersToFollowK;
      break;

    case 'p':
      currentLetterWeights = lettersToFollowP;
      break;

    default:
      currentLetterWeights = lettersToFollowT;
      break;
      // TODO: Maybe later add a small chance for using generic letters?
      // default:
      //   currentLetterWeights = lettersToFollowGeneric;
      //   break;
  }

  return currentLetterWeights;
};

const generateInitialLetter = () => {
  const randomLetter = generateRandomLetterFromLetterWeights(
    initialFullLetterWeights,
  );
  return randomLetter.toUpperCase();
};

const generateRandomLetter = (previousLetter: string) => {
  const nextLetterWeights: IGenericFullWeights = getCurrentLetterWeights(
    previousLetter,
  );
  const randomLetter = generateRandomLetterFromLetterWeights(nextLetterWeights);

  return randomLetter;
};

const generateRandomName = () => {
  const nameLength = randomNumber({ min: 2, max: 10 });
  const letters: string[] = [];

  letters.push(generateInitialLetter());
  for (let i = 1; i < nameLength; i++) {
    const previousLetter = letters[i - 1];
    const randomLeter = generateRandomLetter(previousLetter);
    letters.push(randomLeter);
  }

  const randomName = letters.join('');
  return randomName;
};

export default generateRandomName;
