import FileSystemDataSource from "../infraestructure/datasources/file-system.datasource";
import LogRepositoryImplementation from "../infraestructure/repositories/log-implementation.repository";
import EmailService from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

class Server {
  public static start(): void {
    console.log('Server started ...');

    //* Send Email
    // const emailService = new EmailService(fileSystemLogRepository);

    // emailService.sendEmailWithFileSystemLogs([
    //   'sonusbeat@gmail.com',
    //   'bclancan@gmail.com'
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const URL = `${envs.HOST}:3005`;
    //   new CheckService(
    //     fileSystemLogRepository,
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
