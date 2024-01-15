import { LogModel } from "../../data/mongo";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";
import LogDataSource from "../../domain/data-sources/log.data-source";

class MongoLogDataSource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('Mongo Log Created:');
    console.log(newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const logs = await LogModel.find({ level: severityLevel });

    return logs.map(
      mongoLog => LogEntity.fromObject({
        message:   mongoLog.message,
        level:     LogSeverityLevel[mongoLog.level!],
        origin:    mongoLog.origin!,
        createdAt: mongoLog.createdAt,
      })
    );

  }

}

export default MongoLogDataSource;