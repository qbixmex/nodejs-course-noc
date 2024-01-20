import LogEntity from '../../entities/log.entity';
import CheckService from './check-service';

describe('Test on Check Service', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    mockSuccessCallback,
    mockErrorCallback,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should runs happy path callback when fetch returns true', async () => {
    const result = await checkService.execute('http://localhost:3005');

    expect(result).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );

    expect(mockRepository.getLogs).not.toHaveBeenCalled();
  });

  test('Should runs error path callback when fetch returns false', async () => {
    const HOST = 'http://localhost:4250';
    const result = await checkService.execute(HOST);

    expect(result).toBe(false);
    expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      level: "high",
      message: `${HOST} is not working.\nError: fetch failed !`,
      origin: "check-service.ts",
      createdAt: expect.any(Date),
    });

    expect(mockRepository.getLogs).not.toHaveBeenCalled();
  });
});