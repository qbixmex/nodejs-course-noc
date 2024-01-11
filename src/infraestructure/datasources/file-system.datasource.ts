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

  getLogs(severity: LogSeverityLevel): LogEntity[] {
    throw new Error('Method not implemented.');
  }

}

export default FileSystemDataSource;
