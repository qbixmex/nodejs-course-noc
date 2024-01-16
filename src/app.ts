import { PrismaClient } from "@prisma/client";
import Server from "./presentation/server";

const main = async () => {
  Server.start();

  //* Prisma
  const prisma = new PrismaClient();

  //* Create New Log
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Test Message 8',
  //     level: 'MEDIUM',
  //     origin: 'app.ts'
  //   }
  // });

  //* Update Log
  // await prisma.logModel.update({
  //   where: { id: 3 },
  //   data: { message: "Test Message 3", },
  // });

  //* Delete Log
  // await prisma.logModel.delete({
  //   where: { id: 8 }
  // });

  //* Get All Logs
  const logs = await prisma.logModel.findMany({
    where: { level: "HIGH" },
    orderBy: { id: "asc" },
  });

  console.log();
  console.log("=".repeat(20) + " Logs " + "=".repeat(20));
  console.log(logs);

  //* Mongo DB
  // await MongoDatabase.connect({
  //   mongoURL : envs.MONGO_URL,
  //   dbName   : envs.MONGO_DB_NAME,
  // });
}

(() => main())();
