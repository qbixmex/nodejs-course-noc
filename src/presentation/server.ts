import CronService from "./cron/cron-service";
import CheckService from "../domain/use-cases/checks/check-service";

class Server {
  public static start(): void {
    console.log('Server started ...');

    CronService.createJob('*/30 * * * * *', () => {
      new CheckService().execute('http://localhost:3005');
    });
  }
}

export default Server;
