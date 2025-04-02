import { Request, Response } from 'express';
import catchAsyncHandlerMiddleware from '../../../middlewares/catch-async-handler.middleware';
import { authService } from '.';
import { httpStatus } from '../../../utils/http.util';

const register = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await authService.register(req);

    res.status(httpStatus.CREATED).send(result);
  },
);

const login = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await authService.login(req);

    res.status(httpStatus.OK).send(result);
  },
);

const refreshToken = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req);

    res.status(httpStatus.OK).send(result);
  },
);

export { register, login, refreshToken };
