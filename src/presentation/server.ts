import { LogSeverityLevel } from "../domain/entities/log.entity";
import FileSystemDataSource from "../infraestructure/datasources/file-system.datasource";
import LogRepositoryImplementation from "../infraestructure/repositories/log-implementation.repository";

// const logRepository = new LogRepositoryImplementation(
  // new FileSystemDataSource()
  // new MongoLogDataSource()
// );

// const emailService = new EmailService();

class Server {
  public static async start(): Promise<void> {

    console.log('\nServer Started');

    // const logs = await logRepository.getLogs(LogSeverityLevel.HIGH);

    //* Sending Email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([
    //   'sonusbeat@gmail.com',
    //   'bclancan@gmail.com',
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const URL = `${envs.HOST}:3005`;
    //   new CheckService(
    //     logRepository,
    //     () => {
    //       const date = new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' });
    //       console.log(`[${date}] - (${URL}) is ok!`);
    //     },
    //     (error: string) => console.log(error)
    //   ).execute(URL);
    // });
  }

}

export default Server;
