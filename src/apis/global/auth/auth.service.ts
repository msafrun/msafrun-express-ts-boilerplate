import { Request } from 'express';
import User from '../user/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../../utils/jwt.util';
import { httpError, httpStatus } from '../../../utils/http.util';
import { IResponse, responseJson } from '../../../utils/response.util';
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from './auth.dto';
import Role from './auth.model';

const register = async (req: Request): Promise<IResponse> => {
  const body: RegisterSchema = req.body;
  const role = body.role;

  const getRole = await Role.findOne({
    name: role,
  });

  if (!getRole) throw httpError.NotFound('Role not found!');

  const generatePayload = {
    ...body,
    role: getRole.id,
  };

  const createUser = new User(generatePayload);
  const createdUser = await createUser.save();

  return responseJson(createdUser, httpStatus.CREATED);
};

const login = async (req: Request): Promise<IResponse> => {
  const { email, password }: LoginSchema = req.body;

  const user = await User.findOne({ email }).populate(
    'role',
    '-_id name permissions',
  );

  if (!user) throw httpError.Unauthorized('Invalid email or password');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw httpError.Unauthorized('Invalid email or password');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return responseJson({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

const refreshToken = async (req: Request): Promise<IResponse> => {
  const { refresh_token }: RefreshTokenSchema = req.body;

  const decoded: any = verifyRefreshToken(refresh_token);

  const user = await User.findById(decoded.id).populate(
    'role',
    '-_id name permissions',
  );

  if (!user) throw httpError.Forbidden('Invalid refresh token');

  const newAccessToken = generateAccessToken(user);

  return responseJson({
    access_token: newAccessToken,
  });
};

export { register, login, refreshToken };
