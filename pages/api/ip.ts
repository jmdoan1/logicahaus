// pages/api/ip.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip =
    typeof forwardedFor === "string"
      ? forwardedFor.split(",")[0].trim()
      : req.socket.remoteAddress || "Unknown IP";

  try {
    const geoData = await fetch(`https://ipapi.co/${ip}/json/`).then((r) =>
      r.json()
    );
    res.status(200).json({ ip, geoData });
  } catch {
    res.status(500).json({ ip, error: "Failed to fetch geolocation data" });
  }
}
