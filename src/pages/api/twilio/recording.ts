import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";
import { logger } from "@/app/_lib/logger";
import { sendPushover } from "@/app/_lib/pushover";

const { VoiceResponse } = twilio.twiml;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.info("Recording endpoint called", { method: req.method, url: req.url });
  
  if (req.method !== "POST") {
    logger.warn("Invalid method for recording endpoint", { method: req.method });
    res.status(405).end("Method not allowed");
    return;
  }

  const params = await parseTwilioBody(req);
  logger.debug("Parsed Twilio body", { params });

  const brandName = (req.query.brand as string) || "Unknown Brand";
  const from = params.From || "Unknown";
  const recordingUrl = params.RecordingUrl || "";
  const duration = params.RecordingDuration || "0";
  
  logger.info("Recording details", { brandName, from, recordingUrl, duration });

  // Twilio returns a URL without extension; adding .mp3 is often nicer but optional
  const recordingMp3Url = recordingUrl ? `${recordingUrl}.mp3` : recordingUrl;

  try {
    logger.info("Sending voicemail notification", { brandName, from, duration });
    await sendPushover(
      `New voicemail for ${brandName}\n` +
        `From: ${from}\n` +
        `Duration: ${duration} seconds\n` +
        `Listen: ${recordingMp3Url}`,
      recordingMp3Url
    );
    logger.info("Voicemail notification sent successfully");
  } catch (err) {
    logger.error("Error sending voicemail notification", { error: err });
  }

  const twiml = new VoiceResponse();
  // Caller has usually hung up already, but Twilio still expects valid TwiML
  twiml.hangup();

  const twimlResponse = twiml.toString();
  logger.debug("Sending TwiML response", { twiml: twimlResponse });
  
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twimlResponse);
  
  logger.info("Recording endpoint completed successfully");
}
