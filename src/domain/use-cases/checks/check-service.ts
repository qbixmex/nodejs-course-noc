import LogEntity, { LogSeverityLevel } from '../../entities/log.entity';
import LogRepository from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | null;
type ErrorCallback = ((error: string) => void) | null;

class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {

      await fetch( url );

      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogSeverityLevel.LOW,
        origin: 'check-service.ts',
      });

      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;

    } catch (error) {

      let errorMessage = '';
      errorMessage += `${url} is not working.\n`;
      errorMessage += `Error: ${(error as Error).message} !`;

      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.HIGH,
        origin: 'check-service.ts',
      });

      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false

    }
  }
}

export default CheckService;