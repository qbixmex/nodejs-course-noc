import { PrismaClient } from "@prisma/client";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";
import PostgresLogDataSource, { severityEnum } from './postgres-log.datasource';

describe('Test on Postgres Log Data Source', () => {

  const prisma = new PrismaClient();

  afterEach(async () => {
    await prisma.logModel.deleteMany();
  });

  test('Should create a log', async () => {
    const postgresLog = new PostgresLogDataSource();
    const log = new LogEntity({
      message: 'Test log message',
      level: LogSeverityLevel.LOW,
      origin: 'postgres-log.datasource.test.ts',
    });
    const result = await postgresLog.saveLog(log);
    expect(result).toBe(true);
  });

  test('Should get logs', async () => {

    const postgresLog = new PostgresLogDataSource();

    const log1 = new LogEntity({
      message: 'Test log message 1',
      level: LogSeverityLevel.LOW,
      origin: 'postgres-log.datasource.test.ts',
    });

    await postgresLog.saveLog(log1);

    const log2 = new LogEntity({
      message: 'Test log message 2',
      level: LogSeverityLevel.LOW,
      origin: 'mongo-log.datasource.test.ts',
    });

    await postgresLog.saveLog(log2);

    const logs = await postgresLog.getLogs(LogSeverityLevel.LOW);

    expect(logs).toHaveLength(2);

    expect(logs).toEqual([
      {
        message: log1.message,
        level: LogSeverityLevel.LOW.toUpperCase(),
        origin: log1.origin,
        createdAt: expect.any(Date),
      },
      {
        message: log2.message,
        level: LogSeverityLevel.LOW.toUpperCase(),
        origin: log2.origin,
        createdAt: expect.any(Date),
      },
    ]);
  });

});