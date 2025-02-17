import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const token = process.env.SLACK_BOT_TOKEN;
    const channelId = process.env.SLACK_CHANNEL_ID;

    if (!token || !channelId) {
      res.status(500).json({ message: "Slack token or channel ID is missing" });
      return;
    }

    const slackMessage = {
      channel: channelId,
      text: `<!channel>: New contact form submission:\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
    };

    try {
      const response = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(slackMessage),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(`Error with status ${response.status}: ${data.error}`);
      }

      res.status(200).json({ message: "Message sent to Slack successfully" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error sending message to Slack:", error);
      res.status(500).json({
        message: "Failed to send message to Slack",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
