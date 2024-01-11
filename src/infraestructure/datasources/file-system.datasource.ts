import fs from 'node:fs';
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";
import LogRepository from '../../domain/repository/log.repository';

class FileSystemDataSource implements LogRepository {

  private readonly logPath = 'logs/';
  private readonly filePaths = [
    'logs/all-logs.log',
    'logs/medium-logs.log',
    'logs/high-logs.log'
  ];
  private readonly allLogsPath = this.filePaths[0];
  private readonly mediumLogsPath = this.filePaths[1];
  private readonly highLogsPath = this.filePaths[2];

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    //* Check if logs folder exists
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    this.filePaths.forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    });

  }

  saveLog(newLog: LogEntity): void {

    const logAsJSON = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJSON);

    if (newLog.level === LogSeverityLevel.LOW) return;

    if (newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, logAsJSON);
      return;
    }

    if (newLog.level === LogSeverityLevel.HIGH) {
      fs.appendFileSync(this.highLogsPath, logAsJSON);
    }

  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    return content.split('\n').map(LogEntity.fromJSON);
  }

  getLogs(severityLevel: LogSeverityLevel): LogEntity[] {
    switch (severityLevel) {
      case LogSeverityLevel.LOW:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} invalid severity level`);
    }
  }

}

export default FileSystemDataSource;
