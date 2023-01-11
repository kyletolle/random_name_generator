const CONSONANT = 'consonant';
const VOWEL = 'vowel';
type TConsonant = typeof CONSONANT;
type TVowel = typeof VOWEL;
type TLetterTypes = TConsonant | TVowel;

const LetterTypes: { [CONSONANT]: TConsonant, [VOWEL]: TVowel } = {
  [CONSONANT]: CONSONANT as TConsonant,
  [VOWEL]: VOWEL as TVowel,
}

const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'z',
];

const vowels = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'y',
];

export { consonants, vowels, LetterTypes, CONSONANT, VOWEL };
export type { TLetterTypes, TConsonant, TVowel };
