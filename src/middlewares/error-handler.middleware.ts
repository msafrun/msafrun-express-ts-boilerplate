import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import Logger from '../utils/logger.util';
import httpStatus from 'http-status';
import { HttpError } from 'http-errors';

dotenv.config();

const errorHandleMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const isProduction = process.env.NODE_ENV === 'production';
  let errorMessage = {};

  if (res.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    Logger.debug(err.stack);
    errorMessage = err;
  }

  if (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      error: {
        message: err.message,
        ...(!isProduction && { trace: errorMessage }),
      },
    });
  }
};

export default errorHandleMiddleware;
