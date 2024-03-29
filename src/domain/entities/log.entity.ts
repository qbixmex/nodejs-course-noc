export enum LogSeverityLevel {
  LOW    = 'low',
  MEDIUM = 'medium',
  HIGH   = 'high',
}

export interface LogOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createdAt?: Date;

  constructor(options: LogOptions) {
    this.level     = options.level;
    this.message   = options.message;
    this.origin    = options.origin;
    this.createdAt = options.createdAt ?? this.generateDate('America/Vancouver');
  }

  static fromJSON = (json: string): LogEntity => {

    const jsonOptions = JSON.parse(json) as LogEntity;
  
    const log = new LogEntity({
      message:   jsonOptions.message,
      level:     jsonOptions.level,
      origin:    jsonOptions.origin,
      createdAt: jsonOptions.createdAt ? new Date(jsonOptions.createdAt) : new Date(),
    });

    return log;

  }

  static fromObject = (object: LogOptions): LogEntity => {
    return new LogEntity(object);
  };

  protected generateDate(timeZone = 'Europe/London'): Date {
    const date = new Date();
    return new Date(date.toLocaleString('en-US', { timeZone }));
  }

}

export default LogEntity;