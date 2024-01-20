import LogEntity from '../../entities/log.entity';
import CheckServiceMultiple from './check-service-multiple';

describe('Test on Check Service Multiple', () => {
  const mockFileRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockMongoRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockPostgresRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [
      mockFileRepository,
      mockMongoRepository,
      mockPostgresRepository,
    ],
    mockSuccessCallback,
    mockErrorCallback,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should runs happy path callback when fetch returns true', async () => {
    const HOST = 'http://localhost:3005';
    const result = await checkServiceMultiple.execute(HOST);

    expect(result).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockFileRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  test('Should runs error path callback when fetch returns false', async () => {
    const HOST = 'http://localhost:4250';
    const result = await checkServiceMultiple.execute(HOST);

    expect(result).toBe(false);
    expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockFileRepository.saveLog).toHaveBeenCalledWith({
      level: "high",
      message: `${HOST} is not working.\nError: fetch failed !`,
      origin: "check-service.ts",
      createdAt: expect.any(Date),
    });

    expect(mockFileRepository.getLogs).not.toHaveBeenCalled();
  });
});