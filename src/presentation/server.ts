import { envs } from "../config/plugins/envs.plugin";
import CronService from "./cron/cron-service";
import CheckService from "../domain/use-cases/checks/check-service";
import LogRepositoryImplementation from "../infraestructure/repositories/log-implementation.repository";
import FileSystemDataSource from "../infraestructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

class Server {
  public static start(): void {
    console.log('Server started ...');

    CronService.createJob('*/5 * * * * *', () => {
      const URL = `${envs.HOST}:3005`;
      new CheckService(
        fileSystemLogRepository,
        () => {
          const date = new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' });
          console.log(`[${date}] - (${URL}) is ok!`);
        },
        (error: string) => console.log(error)
      ).execute(URL);
    });
  }
}

export default Server;
