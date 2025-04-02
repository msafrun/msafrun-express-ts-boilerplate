import { Request, Response } from 'express';
import catchAsyncHandlerMiddleware from '../../../middlewares/catch-async-handler.middleware';
import { httpStatus } from '../../../utils/http.util';
import { healthService } from '.';

const checkHealth = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await healthService.checkHealth();

    res.status(httpStatus.OK).send(result);
  },
);

export { checkHealth };
