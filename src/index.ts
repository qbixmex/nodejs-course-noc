import { CronJob } from 'cron';
import Server from "./presentation/server";

const main = () => {
  Server.start();

  const job = new CronJob(
    '*/60 * * * * *', // cronTime
    () => {
      const date = new Date();
      console.log('Every minute', date);
    }, // onTick
    null, // onComplete
    true, // start
    'America/Vancouver' // timeZone
  );

  job.start();
}

(() => main())();
