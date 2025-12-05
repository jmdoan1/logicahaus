const PUSHOVER_USER = process.env.PUSHOVER_USER!;
const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN!;

export async function sendPushover(message: string, url?: string) {
  const body = new URLSearchParams({
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    message,
  });

  if (url) {
    body.append("url", url);
  }

  const res = await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    body,
  });

  if (!res.ok) {
    throw new Error(`Pushover failed with ${res.status}`);
  }
}