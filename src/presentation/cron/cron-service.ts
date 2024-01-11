import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(
      cronTime, // cronTime
      onTick, // onTick
      null, // onComplete
      true, // start
      'America/Vancouver' // timeZone
    );

    job.start();

    return job;
  }
}

export default CronService;
