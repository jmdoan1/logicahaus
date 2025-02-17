import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { name, email, testimony } = req.body;

  // Validate request body
  if (!name || !email || !testimony) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: "HomeSight Mobile",
      to: ["kiana@homesightwa.org"],
      bcc: ["jay@logica.haus"],
      subject: `New App Testimonial From ${name}`,
      text: `A new testimonial has been submitted:
      - Name: ${name}
      - Email: ${email}
      - Testimony: ${testimony}`,
      html: `<p>A new testimonial has been submitted:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Testimony:</strong> ${testimony}</li>
      </ul>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return res.status(200).json({ message: "Email sent successfully!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
}
