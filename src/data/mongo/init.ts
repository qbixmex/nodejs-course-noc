import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoURL: string;
  dbName: string;
}

class MongoDatabase {

  static async connect(options: ConnectionOptions) {

    try {

      await mongoose.connect(options.mongoURL, {
        dbName: options.dbName,
      });

      return true;

    } catch (error) {
      throw error;
    }

  }

}

export default MongoDatabase;
