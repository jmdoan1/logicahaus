import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";
import { logger } from "@/app/_lib/logger";

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
  logger.info("Voicemail endpoint called", { method: req.method, url: req.url, query: req.query });
  
  if (req.method !== "POST") {
    logger.warn("Invalid method for voicemail endpoint", { method: req.method });
    res.status(405).end("Method not allowed");
    return;
  }

  //   const params = await parseTwilioBody(req);
  const brandName =
    (req.query.brand as string) ||
    "Unknown Brand"; /* fallback if query missing */

  logger.info("Voicemail setup", { 
    brandName, 
    brandNumber: req.query.brandNumber,
    hasCustomPrompt: !!VOICEMAIL_PROMPTS[brandName] 
  });

  const prompt =
    VOICEMAIL_PROMPTS[brandName] ||
    "Please leave a message after the tone, and we will return your call.";
  
  logger.debug("Selected voicemail prompt", { brandName, prompt });

  const twiml = new VoiceResponse();

  twiml.say({ voice: "alice" }, prompt);

  const recordingAction = `/api/twilio/recording?brand=${encodeURIComponent(brandName)}`;
  logger.info("Setting up voicemail recording", { brandName, recordingAction });
  
  // After recording, Twilio will POST to /api/twilio/recording
  twiml.record({
    maxLength: 300, // up to 5 minutes
    playBeep: true,
    timeout: 5,
    action: recordingAction,
    method: "POST",
  });

  // If they don't say anything
  twiml.say("We did not receive a recording. Goodbye.");
  twiml.hangup();

  const twimlResponse = twiml.toString();
  logger.debug("Sending voicemail TwiML response", { twiml: twimlResponse });
  
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twimlResponse);
  
  logger.info("Voicemail endpoint completed successfully");
}
