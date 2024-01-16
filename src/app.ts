import Server from "./presentation/server";

const main = async () => {
  Server.start();

  //* Mongo DB
  // await MongoDatabase.connect({
  //   mongoURL : envs.MONGO_URL,
  //   dbName   : envs.MONGO_DB_NAME,
  // });
}

(() => main())();
