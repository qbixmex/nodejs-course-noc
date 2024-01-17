import LogEntity, { LogSeverityLevel } from '../../entities/log.entity';
import LogRepository from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | null;
type ErrorCallback = ((error: string) => void) | null;

class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity): void {
    this.logRepositories.forEach(logRepository => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {

      const request = await fetch( url );

      if (!request.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogSeverityLevel.LOW,
        origin: 'check-service.ts',
      });

      this.callLogs(log);

      this.successCallback && this.successCallback();

      return true;

    } catch (error) {

      const errorMessage = `${url} is not working. ${error}`;

      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.HIGH,
        origin: 'check-service.ts',
      });

      this.callLogs(log);

      this.errorCallback && this.errorCallback(errorMessage);

      return false

    }
  }
}

export default CheckServiceMultiple;