import LogEntity, { LogSeverityLevel } from '../entities/log.entity';
import LogDataSource from './log.data-source';

describe('Test on Log Data Source Abstract Class', () => {

  const newLog = new LogEntity({
    message: 'Test message',
    level: LogSeverityLevel.LOW,
    origin: 'log.data-source.test.ts',
  });

  class MockDataSource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }

    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
      return new Promise((resolve) => resolve([ newLog ]));
    }

  }

  const mockLogDataSource = new MockDataSource();

  test('Should implement abstract class', () => {
    expect(mockLogDataSource).toBeInstanceOf(MockDataSource);
  });

  test('Should have saveLog() method', () => {
    expect(typeof mockLogDataSource.saveLog).toBe('function');
  });

  test('Should have getLogs() method', () => {
    expect(typeof mockLogDataSource.getLogs).toBe('function');
  });

  test('Should save a new log', async () => {
    expect(await mockLogDataSource.saveLog(newLog)).toBe(true);
  });

  test('Should show logs', async () => {
    const logs = await mockLogDataSource.getLogs(LogSeverityLevel.LOW);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});