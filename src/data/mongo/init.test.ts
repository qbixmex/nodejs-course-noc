import mongose from 'mongoose';
import MongoDatabase from './init';

describe('Tests on Mongo Init', () => {

  afterAll(async () => {
    mongose.connection.close();
  });

  test('Should connect to mongo', async () => {

    const connection = await MongoDatabase.connect({
      mongoURL: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connection).toBe(true);
  });

  test('Should connect to mongo', async () => {

    try {
      const connection = await MongoDatabase.connect({
        mongoURL: "postgres://wrong_user:wrong_password@localhost:5432/wrong_db_name",
        dbName: "WRONG_DB_NAME",
      });
  
      expect(connection).toBe(false);
    } catch (error) {
      
    }
  });

});
