import fs from 'node:fs';
import LogDataSource from "../../domain/data-sources/log.data-source";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";

class FileSystemDataSource implements LogDataSource {

  private readonly logPath = 'logs/';
  private readonly filePaths = [
    'logs/low-logs.log',
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

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}

export default FileSystemDataSource;
