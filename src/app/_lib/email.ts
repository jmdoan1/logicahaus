import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendSmsEmail(options: { subject: string; text: string }) {
  const to = process.env.MY_SMS_EMAIL;
  if (!to) {
    console.error("MY_SMS_EMAIL not set, skipping email");
    return;
  }

  await mailer.sendMail({
    to,
    from: `"Call Alerts" <${process.env.GMAIL_USER}>`,
    subject: options.subject,
    text: options.text,
  });
}
