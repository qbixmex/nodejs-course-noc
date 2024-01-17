import EmailService from "../../../presentation/email/email.service";
import LogEntity, { LogSeverityLevel } from "../../entities/log.entity";
import LogRepository from "../../repository/log.repository";

interface SendLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

class SendEmailLogs implements SendLogsUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {

    try {

      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error('Email not sent!');
      }

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: 'Log email sent',
        origin: 'send-email-logs.ts',
      });

      this.logRepository.saveLog(log);

      console.log('Email Sent Successfully');

      return true;

    } catch (error) {

      if (error instanceof Error) {
        const log = new LogEntity({
          level: LogSeverityLevel.HIGH,
          message: `Error sending email: ${error.message}`,
          origin: 'send-email-logs.ts',
        });
  
        this.logRepository.saveLog(log);

        console.log('Error: email Not Sent');

        return false;
      }

      const log = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: 'Unknown error!',
        origin: 'send-email-logs.ts',
      });

      this.logRepository.saveLog(log);

      return false;

    }

  }

}

export default SendEmailLogs;
