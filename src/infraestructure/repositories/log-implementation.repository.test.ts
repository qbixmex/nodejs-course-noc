import LogEntity, { LogSeverityLevel } from '../../domain/entities/log.entity';
import LogRepositoryImplementation from './log-implementation.repository';

describe('Tests on Log Implementation Repository', () => {

  const mockDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockLog = {
    message: 'Test Message 1',
    level: LogSeverityLevel.LOW,
    origin: 'log-implementation.repository.test.ts',
    createdAt: new Date('2022-01-01T00:00:00.000Z'),
  } as LogEntity;

  const LogRepository = new LogRepositoryImplementation(mockDataSource);

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('saveLog() should call the datasource with arguments', async () => {

    await LogRepository.saveLog(mockLog);

    expect(mockDataSource.saveLog).toHaveBeenCalled();
    expect(mockDataSource.saveLog).toHaveBeenCalledWith(mockLog);

  });

  test('getLogs() should call the datasource with arguments', async () => {
    const severityLog = LogSeverityLevel.LOW;

    await LogRepository.getLogs(severityLog);

    expect(mockDataSource.getLogs).toHaveBeenCalledWith(severityLog);
  });
});