import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import Server from "./presentation/server";

const main = async () => {
  await MongoDatabase.connect({
    mongoURL : envs.MONGO_URL,
    dbName   : envs.MONGO_DB_NAME,
  });

  //* Create Data

  // const newLog = await LogModel.create({
  //   message: 'Test Message 4 from Mongo',
  //   origin : 'index.ts',
  //   level  : 'LOW',
  // });
  // await newLog.save();
  // console.log('New Log:', newLog);

  //* Read Data
  // const logs = await LogModel.find();
  // console.log(logs);

  //* Find by ID
  // const log = await LogModel.findById('65a41bffbefd69126d887f22');
  // console.log(log);

  //* Filter Data
  // const highLogs = await LogModel.find({ level: 'HIGH' });
  // console.log("Count:", highLogs.length);
  // console.log(highLogs);

  // Server.start();
}

(() => main())();
