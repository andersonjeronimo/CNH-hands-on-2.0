import express from "express";
import apiController from '../controllers/customer-controller';

const router = express.Router();

/*Webhooks*/
router.post('/webhook/:event', apiController.updateCustomerStatus);
router.post('/customer', apiController.insertCustomer);
router.get('/customer/:id', apiController.findCustomer);
router.post('/customers', apiController.findCustomers);

export default router;