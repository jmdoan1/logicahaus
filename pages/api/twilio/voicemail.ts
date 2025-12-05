import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";

const { VoiceResponse } = twilio.twiml;

const VOICEMAIL_PROMPTS: Record<string, string> = {
  LogicaHaus:
    "You have reached LogicaHaus. Please leave your name, number, and a brief description of your project. We will get back to you as soon as we can.",
  "Friendly Fintech":
    "You have reached Friendly Fintech. Please leave your name, number, and how we can help, and we will return your call shortly.",
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed");
    return;
  }

  const params = await parseTwilioBody(req);
  const brandName =
    (req.query.brand as string) ||
    "Unknown Brand"; /* fallback if query missing */

  const prompt =
    VOICEMAIL_PROMPTS[brandName] ||
    "Please leave a message after the tone, and we will return your call.";

  const twiml = new VoiceResponse();

  twiml.say({ voice: "alice" }, prompt);

  // After recording, Twilio will POST to /api/twilio/recording
  twiml.record({
    maxLength: 300, // up to 5 minutes
    playBeep: true,
    timeout: 5,
    action: `/api/twilio/recording?brand=${encodeURIComponent(brandName)}`,
    method: "POST",
  });

  // If they don't say anything
  twiml.say("We did not receive a recording. Goodbye.");
  twiml.hangup();

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml.toString());
}
