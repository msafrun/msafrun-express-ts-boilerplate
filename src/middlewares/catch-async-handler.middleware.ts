import { NextFunction, Response, Request } from 'express';

export default (catchAsyncHandler: Function) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await catchAsyncHandler(request, response, next);
    } catch (error) {
      return next(error);
    }
  };
