import mongoose from 'mongoose';
import Logger from '../utils/logger.util';
import { httpError } from '../utils/http.util';
import { HttpError } from 'http-errors';

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () => {
  Logger.info('MongoDB connection established');
});

mongoose.connection.on('reconnected', () => {
  Logger.warn('MongoDB reconnected');
});

mongoose.connection.on('disconnected', () => {
  Logger.warn('MongoDB disconnected');
});

mongoose.connection.on('close', () => {
  Logger.warn('MongoDB connection closed');
});

mongoose.connection.on('error', (error: string) => {
  Logger.error(`🤦🏻 MongoDB ERROR: ${error}`);

  process.exit(1);
});

export default {
  mongoDbConnection: async () => {
    try {
      await mongoose.connect(<string>process.env.MONGO_URI);
      Logger.info(`Connected to db: ${mongoose.connection.name}`);
    } catch (error) {
      Logger.error(`MongoDB connection error. ${error}`);
      if (error instanceof HttpError) {
        throw httpError.InternalServerError(error.message);
      }
    }
  },
};
