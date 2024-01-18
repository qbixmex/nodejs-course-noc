import { envs } from "../config/plugins/envs.plugin";
import CheckServiceMultiple from "../domain/use-cases/checks/check-service-multiple";
// import SendEmailLogs from "../domain/use-cases/email/send-email-logs";
import FileSystemDataSource from "../infraestructure/datasources/file-system.datasource";
import MongoLogDataSource from "../infraestructure/datasources/mongo-log.datasource";
import PostgresLogDataSource from "../infraestructure/datasources/postgres-log.datasource";
import LogRepositoryImplementation from "../infraestructure/repositories/log-implementation.repository";
import CronService from "./cron/cron-service";
// import EmailService from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);

const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
);

// const emailService = new EmailService();

class Server {
  public static async start(): Promise<void> {

    console.log('\nServer Started');

    CronService.createJob('*/5 * * * * *', () => {
      const URL = `${envs.HOST}:3005`;
      new CheckServiceMultiple(
        [
          fileSystemLogRepository,
          mongoLogRepository,
          postgresLogRepository,
        ],
        () => {
          const date = new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' });
          console.log(`[${date}] - (${URL}) is ok!`);
        },
        (error: string) => console.log(error)
      ).execute(URL);
    });

    //* Sending Email
    // new SendEmailLogs(
    //   new EmailService(),
    //   fileSystemLogRepository
    // ).execute([
    //   'sonusbeat@gmail.com',
    //   'bclancan@gmail.com',
    // ]);
  }

}

export default Server;
