import nodemailer from "nodemailer";
import { APP_EMAIL_PASS, EMAIL_SENDER } from "../utils/emv.js";
import { errorFormat } from "../utils/errorFormat.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_SENDER,
    pass: APP_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
) {
  const mailOptions = {
    from: `"Freelaflow" <${EMAIL_SENDER}>`,
    to,
    subject,
    html,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log(error);
    throw errorFormat("email sending error", 500);
  }
}
