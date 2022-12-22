import { randomNumber } from "https://deno.land/x/random_number/mod.ts";

const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z",
];

const vowels = [
  "a",
  "e",
  "i",
  "o",
  "u",
  "y",
];

const generateRandomName = () => {
const LETTERTYPE_CONSONANT = 'consonant';
const LETTERTYPE_VOWEL = 'vowel';

const nameLength = randomNumber({ min: 2, max: 10});
const letters: string[] = [];
for(let i = 0; i < nameLength; i++) {
  const randomLetterTypeValue = Math.round(randomNumber({min: 0, max: 1, integer: false}));
  const randomLetterType= randomLetterTypeValue === 1 ? LETTERTYPE_CONSONANT : LETTERTYPE_VOWEL;

  let randomLetter: string;
  switch (randomLetterType) {
    case LETTERTYPE_CONSONANT:
      randomLetter = consonants[randomNumber({min: 0, max: consonants.length - 1})]
      break;
    case LETTERTYPE_VOWEL:
      randomLetter = vowels[randomNumber({min: 0, max: vowels.length - 1})]
      break;
  }
  letters.push(randomLetter);
}
letters[0] = letters[0].toUpperCase();
const randomName = letters.join('');
return randomName;
}


export default generateRandomName;

