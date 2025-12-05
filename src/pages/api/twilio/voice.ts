import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { parseTwilioBody } from "@/app/_lib/twilio-helper";
import { logger } from "@/app/_lib/logger";
import { sendPushover } from "@/app/_lib/pushover";

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
  logger.info("Voice endpoint called", { method: req.method, url: req.url });
  
  if (req.method !== "POST") {
    logger.warn("Invalid method for voice endpoint", { method: req.method });
    res.status(405).end("Method not allowed");
    return;
  }

  const params = await parseTwilioBody(req);
  logger.debug("Parsed Twilio body", { params });
  
  const calledNumber = params.To; // Twilio number that was called
  const callerNumber = params.From; // original caller
  
  logger.info("Incoming call", { calledNumber, callerNumber });
  
  const brand = BRANDS[calledNumber];
  logger.debug("Brand lookup", { calledNumber, brandFound: !!brand, brandName: brand?.name });

  if (!brand) {
    logger.error("Unknown brand number", { calledNumber, availableBrands: Object.keys(BRANDS) });
    const twiml = new VoiceResponse();
    twiml.say("This number is not configured. Goodbye.");
    twiml.hangup();
    const twimlResponse = twiml.toString();
    logger.debug("Sending error TwiML", { twiml: twimlResponse });
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(twimlResponse);
    return;
  }

  // Fire off an email→SMS to you about the incoming call
  try {
    logger.info("Sending incoming call notification", { brandName: brand.name, callerNumber, calledNumber });
    await sendPushover(
      `Incoming call for ${brand.name}\n` +
        `From: ${callerNumber}\n` +
        `To: ${calledNumber}\n` +
        `Time: ${new Date().toISOString()}`,
    );  
    logger.info("Incoming call notification sent successfully");
  } catch (err) {
    logger.error("Error sending incoming-call notification", { error: err });
  }

  const myCell = process.env.MY_CELL_PHONE_NUMBER;
  if (!myCell) {
    logger.error("MY_CELL_PHONE_NUMBER environment variable not set");
    const twiml = new VoiceResponse();
    twiml.say("Temporarily unable to connect the call. Goodbye.");
    twiml.hangup();
    const twimlResponse = twiml.toString();
    logger.debug("Sending error TwiML for missing cell number", { twiml: twimlResponse });
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(twimlResponse);
    return;
  }

  const twiml = new VoiceResponse();

  // Forward to your cell, using the brand number as callerId
  const voicemailAction = `/api/twilio/voicemail?brand=${encodeURIComponent(
    brand.name
  )}&brandNumber=${encodeURIComponent(brand.number)}`;
  
  logger.info("Forwarding call to cell", { 
    brandName: brand.name, 
    brandNumber: brand.number,
    forwardTo: myCell, 
    callerId: brand.number,
    voicemailAction 
  });
  
  const dial = twiml.dial({
    callerId: brand.number,
    timeout: 25,
    // If no answer/busy/etc., Twilio will POST here
    action: voicemailAction,
  });

  dial.number(myCell);

  const twimlResponse = twiml.toString();
  logger.debug("Sending dial TwiML response", { twiml: twimlResponse });
  
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twimlResponse);
  
  logger.info("Voice endpoint completed successfully");
}
