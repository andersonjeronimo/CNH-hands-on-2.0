import express from "express";
import customerController from '../controllers/customer-controller';
import authController from '../controllers/auth-controller';

const router = express.Router();

/*Webhooks*/
router.post('/webhook/:event', customerController.updateCustomerStatus);
/*login*/
router.post('/auth', authController.doLogin);
/*customers*/
router.post('/customer', customerController.insertCustomer);
router.get('/customer/:id', customerController.findCustomerById);
router.post('/customer/', customerController.findCustomer);
router.post('/customers', customerController.findCustomers);

export default router;