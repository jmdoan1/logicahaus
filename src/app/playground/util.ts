export const playgroundSlugs = [
  {
    name: "Easy Password Generator",
    hash: "#easy-password-generator",
    link: "/easy-password-generator",
  },
  {
    name: "Cute Password Maker",
    hash: "#cute-password-maker",
    link: "/cute-password-maker",
  },
  { name: "My Ip Address", hash: "#my-ip-address", link: "/my-ip-address" },
  {
    name: "Qr Code Generator",
    hash: "#qr-code-generator",
    link: "/qr-code-generator",
  },
];

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const cuteSpecialCharacters = ["a", "s", "i"];
export const specialCharacters = [...cuteSpecialCharacters, "g", "p"];
export function swapSpecialCharacter(txt: string) {
  return txt
    .replace("A", "@")
    .replace("S", "$")
    .replace("I", "!")
    .replace("G", "&")
    .replace("P", "?");
}

export function getRandomItem<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const cuteAdjectives: string[] = [
  // 3 letters
  "big",
  "coy",
  "fun",
  "icy",
  "shy",
  "new",
  // 4 letters
  "blue",
  "calm",
  "cool",
  "cozy",
  "cute",
  "fair",
  "fine",
  "gold",
  "good",
  "kind",
  "mild",
  "mini",
  "nice",
  "pink",
  "pure",
  "rosy",
  "soft",
  "snug",
  "tidy",
  "tiny",
  "warm",
  "wavy",
  "wild",
  "dear",
  "glad",
  "neat",
  "safe",
  "zany",
  // 5 letters
  "fuzzy",
  "happy",
  "jolly",
  "merry",
  "peppy",
  "silly",
  "sunny",
  "sweet",
  "yummy",
];

export const cuteNouns: string[] = [
  // 3 letters
  "air",
  "ant",
  "ape",
  "bed",
  "bee",
  "bow",
  "boy",
  "bug",
  "car",
  "cat",
  "cow",
  "dad",
  "day",
  "dog",
  "ear",
  "egg",
  "elf",
  "fan",
  "fin",
  "fig",
  "fox",
  "gem",
  "hat",
  "hen",
  "hug",
  "jam",
  "joy",
  "key",
  "kid",
  "kit",
  "lip",
  "map",
  "mom",
  "owl",
  "pea",
  "pen",
  "pet",
  "pie",
  "pig",
  "pin",
  "pop",
  "pup",
  "rat",
  "row",
  "sea",
  "sky",
  "sun",
  "tea",
  "toy",
  "tub",
  "van",
  // 4 letters
  "baby",
  "ball",
  "bear",
  "bean",
  "bird",
  "book",
  "cake",
  "corn",
  "dish",
  "doll",
  "duck",
  "fish",
  "frog",
  "game",
  "gift",
  "goat",
  "hero",
  "home",
  "love",
  "milk",
  "moon",
  "play",
  "pony",
  "seed",
  "star",
  "swan",
  "wolf",
  "yard",
  "beep",
  "boop",
  "boba",
  // 5 letters
  "berry",
  "bunny",
  "cloud",
  "fairy",
  "heart",
  "kitty",
  "magic",
  "puppy",
  "smile",
  "sugar",
  "apple",
  "corgi",
  "grape",
  "horse",
  "koala",
  "mouse",
  "otter",
  "panda",
  "peach",
  "pixie",
  "sheep",
  "tiger",
  "zebra",
];

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCuteAdjectives(specialCharacter?: boolean): string[] {
  const result: string[] = [getRandomItem(cuteAdjectives)];

  const options = cuteAdjectives.filter(
    (adj) =>
      !result.includes(adj) &&
      (!specialCharacter || cuteSpecialCharacters.includes(adj[0]))
  );

  const capped = capitalize(getRandomItem(options));

  const nextAdj = specialCharacter ? swapSpecialCharacter(capped) : capped;
  result.push(nextAdj);

  return result;
}

function getCuteNoun(specialCharacter?: boolean) {
  const options = specialCharacter
    ? cuteNouns.filter((noun) => cuteSpecialCharacters.includes(noun[0]))
    : cuteNouns;
  const result = capitalize(getRandomItem(options));

  return specialCharacter ? swapSpecialCharacter(result) : result;
}

export function generateCutePassword(): string {
  const capitalizeAdj = Math.random() < 0.5;
  const adjectives = getCuteAdjectives(capitalizeAdj);
  const noun = getCuteNoun(!capitalizeAdj);
  const digits = Math.floor(Math.random() * 99)
    .toString()
    .padStart(2, "0");
  return `${adjectives[0]}${adjectives[1]}${noun}${digits}`;
}
