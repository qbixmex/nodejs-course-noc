import fs from 'node:fs';
import path from 'node:path';
import FileSystemDataSource from './file-system.datasource';
import LogEntity, { LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Test on File System Datasource', () => {

  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test('Should create log files if they do not already exist.', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual([
      'all-logs.log',
      'high-logs.log',
      'medium-logs.log',
    ]);
  });

  test('Should save a log in "all-logs.log"', () => {
    const logDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.LOW,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    logDataSource.saveLog(log);

    //* Read file
    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, 'utf-8');

    //* Split string by new line
    const [logsArray] = allLogs.split('\n');

    //* Convert string to object
    const logObject = JSON.parse(logsArray);

    //* Convert createdAt to Date object
    logObject.createdAt = new Date(logObject.createdAt);

    expect(logObject).toEqual(log);

  });

  test('Should save a log in "all-logs.log" and "medium-logs.log"', () => {
    const logDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.MEDIUM,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    //* Save log
    logDataSource.saveLog(log);

    //* Read file
    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/medium-logs.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));

  });

  test('Should save a log in "all-logs.log" and "high-logs.log"', () => {
    const logDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.HIGH,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    //* Save log
    logDataSource.saveLog(log);

    //* Read file
    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/high-logs.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));

  });

  test('Should return all logs', async () => {
    const logDataSource = new FileSystemDataSource();

    const lowLog = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.LOW,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    const mediumLog = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.MEDIUM,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    const highLog = new LogEntity({
      message: 'Test Message',
      level: LogSeverityLevel.HIGH,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    //* Save logs
    await logDataSource.saveLog(lowLog);
    await logDataSource.saveLog(mediumLog);
    await logDataSource.saveLog(highLog);

    //* Read files
    const lowLogs = await logDataSource.getLogs(LogSeverityLevel.LOW);
    const mediumLogs = await logDataSource.getLogs(LogSeverityLevel.MEDIUM);
    const highLogs = await logDataSource.getLogs(LogSeverityLevel.HIGH);

    expect(lowLogs).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]));
    expect(mediumLogs).toHaveLength(1);
    expect(highLogs).toHaveLength(1);

  });

  test('Should throw error if severity level does not exist', async () => {

    const logDataSource = new FileSystemDataSource();

    try {
      await logDataSource.getLogs("INFO" as LogSeverityLevel);
    } catch (error) {
      expect((error as Error).message).toBe('INFO invalid severity level');
    }

  });
});