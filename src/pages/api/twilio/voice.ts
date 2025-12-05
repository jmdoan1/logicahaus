import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";
import { sendSmsEmail } from "@/app/_lib/email";

const { VoiceResponse } = twilio.twiml;

const BRANDS: Record<
  string,
  { name: string; number: string; voicemailPrompt: string }
> = {
  "+15304564422": {
    name: "LogicaHaus",
    number: "+15304564422",
    voicemailPrompt:
      "You have reached LogicaHaus. Please leave your name, number, and a brief description of your project. We will get back to you as soon as we can.",
  },
  "+14793468324": {
    name: "Friendly Fintech",
    number: "+14793468324",
    voicemailPrompt:
      "You have reached Friendly Fintech. Please leave your name, number, and how we can help, and we will return your call shortly.",
  },
};

export const config = {
  api: {
    bodyParser: false, // important for Twilio webhooks
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
  const calledNumber = params.To; // Twilio number that was called
  const callerNumber = params.From; // original caller
  const brand = BRANDS[calledNumber];

  if (!brand) {
    console.error("Unknown brand number:", calledNumber);
    const twiml = new VoiceResponse();
    twiml.say("This number is not configured. Goodbye.");
    twiml.hangup();
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(twiml.toString());
    return;
  }

  // Fire off an email→SMS to you about the incoming call
  try {
    await sendSmsEmail({
      subject: `Incoming call for ${brand.name}`,
      text:
        `Incoming call for ${brand.name}\n` +
        `From: ${callerNumber}\n` +
        `To: ${calledNumber}\n` +
        `Time: ${new Date().toISOString()}`,
    });
  } catch (err) {
    console.error("Error sending incoming-call email", err);
  }

  const myCell = process.env.MY_CELL_PHONE_NUMBER;
  if (!myCell) {
    console.error("MY_CELL_PHONE_NUMBER not set");
    const twiml = new VoiceResponse();
    twiml.say("Temporarily unable to connect the call. Goodbye.");
    twiml.hangup();
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(twiml.toString());
    return;
  }

  const twiml = new VoiceResponse();

  // Forward to your cell, using the brand number as callerId
  const dial = twiml.dial({
    callerId: brand.number,
    timeout: 25,
    // If no answer/busy/etc., Twilio will POST here
    action: `/api/twilio/voicemail?brand=${encodeURIComponent(
      brand.name
    )}&brandNumber=${encodeURIComponent(brand.number)}`,
  });

  dial.number(myCell);

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml.toString());
}
