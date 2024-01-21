import CronService from './cron-service';

describe('Test on Cron Service', () => {

  test('Should create a job', (done) => {

    const mockTick = jest.fn();

    const job = CronService.createJob('* * * * * *', mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(1);
      job.stop();
      done();
    }, 1000);

  });

});