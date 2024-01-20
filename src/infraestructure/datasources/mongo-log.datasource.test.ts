import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { LogModel } from '../../data/mongo';
import MongoDatabase from '../../data/mongo/init';
import LogEntity, { LogSeverityLevel } from '../../domain/entities/log.entity';
import MongoLogDataSource from './mongo-log.datasource';

describe('Test on Mongo Log Data Source', () => {

  const logDataSource = new MongoLogDataSource();

  const log = new LogEntity({
    message: 'Test log message',
    level: LogSeverityLevel.LOW,
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoURL: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should create a log', async () => {
    // const logSpy = jest.spyOn(console, 'log');

    const result = await logDataSource.saveLog(log);

    expect(result).toBe(true);

    // expect(logSpy).toHaveBeenCalled();
    // expect(logSpy).toHaveBeenCalledWith({
    //   id: expect.any(mongoose.Types.ObjectId),
    // });

  });

  test('Should get logs', async () => {
    
    await logDataSource.saveLog(log);

    const log2 = new LogEntity({
      message: 'Test log message 2',
      level: LogSeverityLevel.LOW,
      origin: 'mongo-log.datasource.test.ts',
    });
    await logDataSource.saveLog(log2);

    const logs = await logDataSource.getLogs(LogSeverityLevel.LOW);
    expect(logs).toHaveLength(2);
    expect(logs).toEqual([
      {
        message: log.message,
        level: LogSeverityLevel.LOW,
        origin: log.origin,
        createdAt: expect.any(Date),
      },
      {
        message: log2.message,
        level: LogSeverityLevel.LOW,
        origin: log2.origin,
        createdAt: expect.any(Date),
      }
    ]);
  });

});