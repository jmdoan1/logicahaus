import type { NextApiRequest, NextApiResponse } from "next";
import WordPOS from "wordpos";
const wordpos = new WordPOS();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  function isValidDictionaryWord(word: string): boolean {
    const testWord = word.toLowerCase();

    // no numbers or special characters
    if (!/^[a-z]+$/.test(testWord)) return false;

    // at least one vowel
    if (!/[aeiou]/i.test(testWord)) return false;

    // at least one consonant
    if (!/[bcdfghjklmnpqrstvwxyz]/i.test(testWord)) return false;

    if (testWord.length < 3) return false;
    if (testWord.length > 6) return false;

    return hasNonRomanLetter(testWord);
  }

  // Avoid getting roman numerals in adjective slots
  function hasNonRomanLetter(word: string): boolean {
    // Remove all Roman-numeral letters (case-insensitive)
    const stripped = word.replace(/[ivxlcdm]/gi, "");

    // If there's still at least one letter left, it means the word had
    // at least one letter that wasn't I/V/X/L/C/D/M.
    return /[a-zA-Z]/.test(stripped);
  }

  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function randomNumber(): string {
    const result = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");

    // If digits are the same, recurse to try again
    if (result[0] === result[1]) {
      return randomNumber();
    }
    return result;
  }

  async function getRandomAdjective(startsWith?: string): Promise<string> {
    const options = { count: 1 } as { count: number; startsWith?: string };
    if (startsWith) {
      options.startsWith = startsWith.toLowerCase();
    }
    const words = await wordpos.randAdjective(options);

    const result = words[0];
    return isValidDictionaryWord(result)
      ? result
      : getRandomAdjective(startsWith);
  }

  async function getRandomNoun(startsWith?: string): Promise<string> {
    const options = { count: 1 } as { count: number; startsWith?: string };
    if (startsWith) {
      options.startsWith = startsWith.toLowerCase();
    }
    const words = await wordpos.randNoun(options);

    const result = words[0];
    return isValidDictionaryWord(result) ? result : getRandomNoun(startsWith);
  }

  function swapSpecialCharacter(txt: string) {
    return txt
      .replace("A", "@")
      .replace("S", "$")
      .replace("I", "!")
      .replace("G", "&")
      .replace("P", "?");
  }

  async function generatePhrase(): Promise<string> {
    const specialCharacters = ["a", "s", "i", "g", "p"];
    const randomLetter =
      specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    const specialWord = Math.random() < 0.5 ? "adj" : "noun";

    const adjective1 = (await getRandomAdjective()).toLowerCase();
    const adjective2 =
      specialWord === "adj"
        ? swapSpecialCharacter(
            capitalizeFirstLetter(await getRandomAdjective(randomLetter))
          )
        : capitalizeFirstLetter(await getRandomAdjective());
    const noun =
      specialWord === "noun"
        ? swapSpecialCharacter(
            capitalizeFirstLetter(await getRandomNoun(randomLetter))
          )
        : capitalizeFirstLetter(await getRandomNoun());

    const number = randomNumber();
    const phrase = `${adjective1}${adjective2}${noun}${number}`;

    return phrase;
  }

  const phrase = await generatePhrase();
  res.status(200).json({ phrase });
}
