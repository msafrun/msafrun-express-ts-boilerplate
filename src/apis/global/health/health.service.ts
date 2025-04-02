import { responseJson } from '../../../utils/response.util';
import dotenv from 'dotenv';

dotenv.config();

const checkHealth = async () => {
  const result = responseJson({
    uptime: process.uptime(), // Server uptime in seconds
    memoryUsage: process.memoryUsage(), // Memory usage details
  });

  return result;
};

export { checkHealth };
