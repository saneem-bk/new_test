import express from 'express';
import { userRouter } from './userRoutes.js';
import { adminRouter } from './adminRoutes.js'
import { movieRouter } from './movieRoutes.js';
import { reviewRouter } from './reviewRoutes.js';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/admin', adminRouter);
v1Router.use('/movie', movieRouter);
v1Router.use('/review', reviewRouter);

export { v1Router };