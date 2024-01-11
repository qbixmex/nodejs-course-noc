export enum LogSeverityLevel {
  LOW    = 'low',
  MEDIUM = 'medium',
  HIGH   = 'high',
}

class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.level = level;
    this.message = message;
    //* Timestamp
    const date = new Date();
    const options = { timeZone: 'America/Vancouver' };
    this.createdAt = new Date(date.toLocaleString('en-US', options));
  }

  static fromJSON = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json) as LogEntity;
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  }

}

export default LogEntity;