import LogEntity, { LogSeverityLevel } from "../entities/log.entity";

abstract class LogRepository {
  abstract saveLog(log: LogEntity): void;
  abstract getLogs(severity: LogSeverityLevel): LogEntity[];
}

export default LogRepository;
