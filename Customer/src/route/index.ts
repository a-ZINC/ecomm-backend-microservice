import customerRouter from './customer.route';
import authRouter from './auth.route';
import { Router } from 'express';

const route = Router();

route.use('/customer', customerRouter);
route.use('/login', authRouter);

export default route;