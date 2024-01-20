import { LogModel } from "../../data/mongo";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";
import LogDataSource from "../../domain/data-sources/log.data-source";

class MongoLogDataSource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<boolean> {
    try {
      await LogModel.create(log);
      // console.log({ id: newLog._id });
      return true;
    } catch  {
      return false;
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const logs = await LogModel.find({ level: severityLevel });

    return logs.map(
      mongoLog => LogEntity.fromObject({
        message:   mongoLog.message,
        level:     LogSeverityLevel[mongoLog.level?.toUpperCase() as keyof typeof LogSeverityLevel],
        origin:    mongoLog.origin!,
        createdAt: mongoLog.createdAt,
      })
    );

  }

}

export default MongoLogDataSource;
