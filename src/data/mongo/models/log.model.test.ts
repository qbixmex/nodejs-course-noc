import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugin';
import { LogOptions, LogSeverityLevel } from '../../../domain/entities/log.entity';
import MongoDatabase from '../init';
import LogModel from './log.model';

describe('Test on Log Model', () => {

  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoURL: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should return the schema object', async () => {

    const schema = LogModel.schema.obj;

    expect(schema).toEqual(expect.objectContaining({
      message: {
        type: expect.any(Function),
        required: true,
      },
      origin: {
        type: expect.any(Function),
        default: 'unknown',
      },
      level: {
        type: expect.any(Function),
        enum: [ 'low', 'medium', 'high' ],
        default: 'low',
      },
      createdAt: {
        type: expect.any(Function),
        default: expect.any(Date)
      }
    }));

  });

  test('Should return LogModel', async () => {

    const logData: LogOptions = {
      message: 'test-message',
      level: LogSeverityLevel.LOW,
      origin: 'log.model.test.ts'
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(expect.objectContaining({
      _id: expect.any(mongoose.Types.ObjectId),
      ...logData,
      createdAt: expect.any(Date),
    }));

    await LogModel.findByIdAndDelete(log._id);

  });

});