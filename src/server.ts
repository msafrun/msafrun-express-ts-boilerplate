import dotenv from 'dotenv';
import app from './app';
import mongoDbConfiguration from './configs/mongo.config';
import Logger from './utils/logger.util';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const { mongoDbConnection } = mongoDbConfiguration;

mongoDbConnection().catch((error) => {
  Logger.error(error.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
