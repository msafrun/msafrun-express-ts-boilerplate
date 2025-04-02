import { Response, Request } from 'express';
import rateLimit from 'express-rate-limit';
import { httpStatus } from '../utils/http.util';

export const apiV1RateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // Limit each IP to 200 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: async (req: Request, res: Response) => {
    return res.status(httpStatus.TOO_MANY_REQUESTS).json({
      status: 'error',
      message: 'You have exceeded the 100 requests in 1 minute limit!',
    });
  },
});
