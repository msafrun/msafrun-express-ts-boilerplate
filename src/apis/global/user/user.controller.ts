import { Request, Response } from 'express';
import { userService } from '.';
import catchAsyncHandlerMiddleware from '../../../middlewares/catch-async-handler.middleware';
import { httpStatus } from '../../../utils/http.util';

const createUser = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await userService.createUser(req);

    res.status(httpStatus.CREATED).send(result);
  },
);

const getDetailUser = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await userService.getDetailUser(req);

    res.status(httpStatus.OK).send(result);
  },
);

const getListUser = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await userService.getListUser(req);

    res.status(httpStatus.OK).send(result);
  },
);

const updateUser = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await userService.updateUser(req);

    res.status(httpStatus.OK).send(result);
  },
);

const deleteUser = catchAsyncHandlerMiddleware(
  async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req);

    res.status(httpStatus.OK).send(result);
  },
);

export { createUser, getDetailUser, getListUser, updateUser, deleteUser };
