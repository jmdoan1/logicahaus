import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";
import { sendSmsEmail } from "@/app/_lib/email";

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
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed");
    return;
  }

  const params = await parseTwilioBody(req);

  const brandName = (req.query.brand as string) || "Unknown Brand";
  const from = params.From || "Unknown";
  const recordingUrl = params.RecordingUrl || "";
  const duration = params.RecordingDuration || "0";

  // Twilio returns a URL without extension; adding .mp3 is often nicer but optional
  const recordingMp3Url = recordingUrl ? `${recordingUrl}.mp3` : recordingUrl;

  try {
    await sendSmsEmail({
      subject: `Voicemail for ${brandName}`,
      text:
        `New voicemail for ${brandName}\n` +
        `From: ${from}\n` +
        `Duration: ${duration} seconds\n` +
        `Listen: ${recordingMp3Url}`,
    });
  } catch (err) {
    console.error("Error sending voicemail email", err);
  }

  const twiml = new VoiceResponse();
  // Caller has usually hung up already, but Twilio still expects valid TwiML
  twiml.hangup();

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml.toString());
}
