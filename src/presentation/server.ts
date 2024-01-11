import CronService from "./cron/cron-service";


class Server {
  public static start(): void {
    console.log('Server started ...');

    CronService.createJob('*/30 * * * * *', () => {
      const date = new Date()
        .toLocaleString('en-US', {
          timeZone: 'America/Vancouver'
        });
      console.log(date, 'every 30 seconds');
    });

    CronService.createJob('*/15 * * * * *', () => {
      const date = new Date()
        .toLocaleString('en-US', {
          timeZone: 'America/Vancouver'
        });
      console.log(date, 'every 15 seconds');
    });
  }
}

export default Server;
