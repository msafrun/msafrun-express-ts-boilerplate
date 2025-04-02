import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env;

interface Config {
  port: number;
  node_env: string;
  db: {
    mongo_uri?: string;
  };
  jwt: {
    jwt_secret: string;
    jwt_secret_refresh: string;
    access_token_expiry: string;
    refresh_token_expiry: string;
  };
}

const config: Config = {
  port: Number(ENV.PORT),
  node_env: ENV.NODE_ENV!,
  db: {
    mongo_uri: ENV.MONGO_URI,
  },
  jwt: {
    jwt_secret: ENV.JWT_SECRET!,
    jwt_secret_refresh: ENV.JWT_SECRET_REFRESH!,
    access_token_expiry: ENV.ACCESS_TOKEN_EXPIRY!,
    refresh_token_expiry: ENV.REFRESH_TOKEN_EXPIRY!,
  },
};

export default config;
