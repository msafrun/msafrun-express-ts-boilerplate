// import { Request, Response, Router } from 'express';
// import { apiV1RateLimiter } from '../../../middlewares/apiRateLimit.middleware';
// // import authRouter from './auth.route';
// // import taskRouter from './task.route';

// const apiV1Router = Router();

// apiV1Router.get('/', (req: Request, res: Response) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'Healthy check completed successfully',
//   });
// });

// const defaultRoutes = [
//   {
//     path: '/auth',
//     route: authRouter,
//   },
//   {
//     path: '/tasks',
//     route: taskRouter,
//   },
// ];

// defaultRoutes.forEach((route) => {
//   apiV1Router.use(apiV1RateLimiter);
//   apiV1Router.use(route.path, route.route);
// });

// export default apiV1Router;
