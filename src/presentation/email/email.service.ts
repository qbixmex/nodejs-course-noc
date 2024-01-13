import nodemailer from "nodemailer";
import { envs } from '../../config/plugins/envs.plugin';

type SendMailOptions = {
  to: string;
  subject: string;
  htmlBody: string;
  // TODO: attachments
};

// TODO: Attachment

class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {

    try {

      const sentInformation = await this.transporter.sendMail({
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
      });

      console.log(sentInformation);

      return true;

    } catch {

      return false;

    }
  }

}

export default EmailService;
