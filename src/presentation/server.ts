import LogRepositoryImplementation from "../infraestructure/repositories/log-implementation.repository";
import FileSystemDataSource from "../infraestructure/datasources/file-system.datasource";
import EmailService from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

class Server {
  public static start(): void {
    console.log('Server started ...');

    //* Send Email
    const emailService = new EmailService();

    emailService.sendEmail({
      to: 'sonusbeat@gmail.com',
      subject: 'This is a test mail from NodeMailer',
      htmlBody: `
        <h1>Test Email</h1>
        <p>Do do et tempor minim ipsum sint tempor incididunt ex Lorem voluptate. Aute pariatur dolore quis voluptate anim consequat aliquip. Duis magna eu cupidatat ut ut consequat veniam fugiat non sit eu elit. Nisi laborum id labore adipisicing ad sunt sint anim non. Minim voluptate magna reprehenderit qui enim laborum officia irure sint sit eiusmod eiusmod.</p>
        <p>Attachments: <a href="#">Some Attachments</a></p>
      `,
    });

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
