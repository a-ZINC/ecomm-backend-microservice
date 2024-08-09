import customerRouter from './customer.route';
import { Router } from 'express';

const route = Router();

route.use('/customer', customerRouter);

export default route;