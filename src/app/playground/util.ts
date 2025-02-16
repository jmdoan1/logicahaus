export function randomTwoDigitNumberString(): string {
  let result = Math.floor(Math.random() * 100).toString();
  if (result.length < 2) result = `0${result}`;

  if (result[0] === result[1]) return randomTwoDigitNumberString();

  return result;
}

export async function generateEasyPassword(): Promise<string> {
  const specialCharacters = ["a", "s", "i", "g", "p"];
  const url1 = "https://random-word-api.vercel.app/api?words=1&length=3";
  const url2 =
    "https://random-word-api.vercel.app/api?words=1&&type=capitalized";
  const url3 = `https://random-word-api.vercel.app/api?words=1&letter=${
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
  }&type=capitalized`;

  const [res1, res2, res3] = await Promise.all([
    fetch(url1).then((r) => r.json()),
    fetch(url2).then((r) => r.json()),
    fetch(url3).then((r) => r.json()),
  ]);

  const word1 = res1[0];
  const word2 = res2[0];
  const word3 = (res3[0] as string)
    .replace("A", "@")
    .replace("S", "$")
    .replace("I", "!")
    .replace("G", "&")
    .replace("P", "?");

  const combined =
    Math.random() < Math.random()
      ? `${word1}${word2}${word3}`
      : `${word1}${word3}${word2}`;

  const result = `${combined}${randomTwoDigitNumberString()}`;
  return result;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
