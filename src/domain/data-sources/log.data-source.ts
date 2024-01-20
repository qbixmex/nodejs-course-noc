import LogEntity, { LogSeverityLevel } from "../entities/log.entity";

abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<boolean>;
  abstract getLogs(severity: LogSeverityLevel): Promise<LogEntity[]>;
}

export default LogDataSource;
