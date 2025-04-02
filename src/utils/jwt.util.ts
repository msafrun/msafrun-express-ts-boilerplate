import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../apis/global/user/user.model';

dotenv.config();

const accessTokenSecret = process.env.JWT_SECRET!;
const refreshTokenSecret = process.env.JWT_SECRET_REFRESH!;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;

export const generateAccessToken = (user: IUser) => {
  // @ts-ignore
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry },
  );
};

export const generateRefreshToken = (user: IUser) => {
  // @ts-ignore
  return jwt.sign({ id: user._id }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, refreshTokenSecret);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
