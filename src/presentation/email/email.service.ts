import nodemailer from "nodemailer";
import { envs } from '../../config/plugins/envs.plugin';
import LogRepository from "../../domain/repository/log.repository";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";

type SendMailOptions = {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
};

interface Attachment {
  filename: string;
  path: string;
}

class EmailService {

  constructor(
    private readonly logRepository: LogRepository
  ) {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmailWithFileSystemLogs(to: string | string[]) {

    const subject = "Server Logs";

    const htmlBody = `
      <h1>Test Email</h1>
      <p>Do do et tempor minim ipsum sint tempor incididunt ex Lorem voluptate. Aute pariatur dolore quis voluptate anim consequat aliquip. Duis magna eu cupidatat ut ut consequat veniam fugiat non sit eu elit. Nisi laborum id labore adipisicing ad sunt sint anim non. Minim voluptate magna reprehenderit qui enim laborum officia irure sint sit eiusmod eiusmod.</p>
      <p><strong>Check Attachments:</strong></p>
    `;

    const attachments: Attachment[] = [
      { filename: "all-logs.log", path: "./logs/all-logs.log" },
      { filename: "high-logs.log", path: "./logs/high-logs.log" },
      { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });

  }

  private async sendEmail(options: SendMailOptions): Promise<boolean> {

    try {

      const sentInformation = await this.transporter.sendMail({
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
        attachments: options.attachments ?? [],
      });

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: `Email sent to ${options.to}`,
        origin: 'email.service.ts',
      });
      
      this.logRepository.saveLog(log);

      return true;

    } catch {

      const log = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: 'Email not sent !',
        origin: 'email.service.ts',
      });
      
      this.logRepository.saveLog(log);

      return false;

    }
  }

}

export default EmailService;
