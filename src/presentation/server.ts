import CronService from "./cron/cron-service";
import CheckService from "../domain/use-cases/checks/check-service";

class Server {
  public static start(): void {
    console.log('Server started ...');

    CronService.createJob('*/30 * * * * *', () => {
      const URL = 'http://localhost:3005';
      new CheckService(
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
