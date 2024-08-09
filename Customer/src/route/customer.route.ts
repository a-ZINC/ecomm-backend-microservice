import { Router } from 'express';
import { CustomerController } from '../controller/customer.controller';

const customerRouter = Router();

customerRouter.get('/', CustomerController.getCustomers);
customerRouter.get('/:id', CustomerController.getCustomer);
customerRouter.post('/', CustomerController.createCustomer);
customerRouter.put('/:id', CustomerController.updateCustomer);
customerRouter.delete('/:id', CustomerController.deleteCustomer);

export default customerRouter;