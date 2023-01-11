import { randomNumber } from "https://deno.land/x/random_number@2.0.0/mod.ts";
import { consonants, vowels, LetterTypes } from "../constants.ts";

const generateRandomName = () => {
const { consonant, vowel } = LetterTypes;

const nameLength = randomNumber({ min: 2, max: 10});
const letters: string[] = [];
for(let i = 0; i < nameLength; i++) {
  const randomLetterTypeValue = Math.round(randomNumber({min: 0, max: 1, integer: false}));
  const randomLetterType= randomLetterTypeValue === 1 ? consonant: vowel;

  let randomLetter: string;
  switch (randomLetterType) {
    case consonant:
      randomLetter = consonants[randomNumber({min: 0, max: consonants.length - 1})]
      break;
    case vowel:
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
