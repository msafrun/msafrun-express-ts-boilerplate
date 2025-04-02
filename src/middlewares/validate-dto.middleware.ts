import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import httpStatus from 'http-status';

const validate =
  (schema: ZodSchema<any>, location: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const data = req[location];
    const result = schema.safeParse(data);

    if (!result.success) {
      res.status(httpStatus.BAD_REQUEST).json({ error: result.error.errors });
      return;
    }

    if (location === 'body') {
      req[location] = result.data;
    }

    next();
  };

export default validate;
