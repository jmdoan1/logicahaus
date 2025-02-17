export const playgroundSlugs = [
  { name: "Cute Password Maker", link: "/cute-password-maker" },
  {
    name: "Easy Password Generator",
    hash: "#easy-password-generator",
    link: "/easy-password-generator",
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
