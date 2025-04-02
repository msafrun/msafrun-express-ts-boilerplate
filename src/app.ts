import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import errorHandleMiddleware from './middlewares/error-handler.middleware';
import { httpError } from './utils/http.util';
// import apiV1Router from './apis/v1/routes/index.route';
import healthRouter from './apis/global/health/health.route';
import authRouter from './apis/global/auth/auth.route';
import userRouter from './apis/global/user/user.route';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// app.use(`/api/v1`, apiV1Router);

app.all(/(.*)/, () => {
  throw new httpError.NotFound('Route not found!');
});

app.use(errorHandleMiddleware);

export default app;
