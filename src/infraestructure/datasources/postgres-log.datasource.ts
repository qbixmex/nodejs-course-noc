import { PrismaClient, SeverityLevel } from "@prisma/client";
import LogDataSource from "../../domain/data-sources/log.data-source";
import LogEntity, { LogSeverityLevel } from "../../domain/entities/log.entity";

export const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

class PostgresLogDataSource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<boolean> {

    const prisma = new PrismaClient();
    const severityLevel = severityEnum[log.level];

    try {
      const newLog = await prisma.logModel.create({
        data: {
          message: log.message,
          level: severityLevel,
          origin: log.origin
        }
      });
      return true;
    } catch(error) {
      return false;
    }

  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const prisma = new PrismaClient();

    const dbLogs = await prisma.logModel.findMany({
      orderBy: { createdAt: 'asc' },
      where: { level: severityEnum[severityLevel] },
    });

    return dbLogs.map(log => LogEntity.fromObject({
      message: log.message,
      level: log.level as LogSeverityLevel,
      origin: log.origin,
      createdAt: log.createdAt,
    }));
  }

}

export default PostgresLogDataSource;
