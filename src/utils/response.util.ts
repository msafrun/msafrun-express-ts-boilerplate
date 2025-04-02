import { httpStatus } from './http.util';

export interface IResponse {
  statusCode: number;
  message: string;
  data?: any;
}

export const responseJson = (
  data: any = {},
  statusCode: number = httpStatus.OK,
  message: string = 'Request successful',
  meta: any = false,
): IResponse => {
  let formattedData = data;

  if (meta)
    formattedData = {
      data: data,
      meta,
    };

  return {
    statusCode,
    message,
    data: formattedData,
  };
};
