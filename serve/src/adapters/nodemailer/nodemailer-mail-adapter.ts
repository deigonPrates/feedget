import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a53b068c0776ef",
    pass: "06c69679c179fa",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <naoresponder@feedget.com>",
      to: "Deigon Prates <deigonprates@gmail.com>",
      subject,
      html: body,
    });
  }
}
