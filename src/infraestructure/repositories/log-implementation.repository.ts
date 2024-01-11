import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";
import LogRepository from "../../domain/repository/log.repository";

class LogRepositoryImplementation implements LogRepository {

  constructor(
    private readonly logDataSource: LogRepository,
  ) {}

  saveLog(log: LogEntity): void {
    this.logDataSource.saveLog(log);
  }

  getLogs(severityLevel: LogSeverityLevel): LogEntity[] {
    return this.logDataSource.getLogs(severityLevel);
  }

}

export default LogRepositoryImplementation;
