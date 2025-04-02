import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { httpError } from '../utils/http.util';
import { RoleName } from '../constants/role.constant';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(httpError.Forbidden('Access token required'));
  }

  const decoded = verifyAccessToken(token);

  if (decoded) {
    req.user = decoded;
    next();
  } else {
    next(httpError.Unauthorized('Invalid or expired access token'));
  }
};

const rbacMiddleware = (
  allowedRoles: string[],
  allowedPermissions?: string[],
) => {
  const roleSet = new Set(allowedRoles);
  const permissionSet = new Set(allowedPermissions);

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(httpError.Unauthorized('User not authenticated!'));
    }

    const { role } = req.user;

    if (!roleSet.has(role.name)) {
      return next(httpError.Forbidden("You don't have the right access!"));
    }

    if (role.name === RoleName.ADMIN) return next();

    if (
      !allowedPermissions?.length ||
      role.permissions.some((perm: any) => permissionSet.has(perm))
    ) {
      return next();
    }

    return next(httpError.Forbidden("You don't have the right permission!"));
  };
};

export { authenticate, rbacMiddleware };
