import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import customerRepository from '../repositories/customer-repository';
import Customer from '../models/customer';
//import Pagination from 'src/models/pagination';

/*Webhook*/
async function updateCustomerStatus(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;
    const event = Array.isArray(req.params.event) ? req.params.is[0] : req.params.event;
    const result = await customerRepository.updateCustomerStatus(cpf, event);
    res.status(200).json(result);
}

async function findCustomerById(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const customer = await customerRepository.findCustomerById(id);
    res.status(200).json(customer);
}

async function findCustomer(req: Request, res: Response, next: NextFunction) {
    const query = req.body;
    const customer = await customerRepository.findCustomer(query);
    res.status(200).json(customer);
}

async function findCustomers(req: Request, res: Response, next: NextFunction) {
    const query = req.body.query;
    console.log(req.body);
    //const pagination = req.body.pagination as Pagination; 
    const { pageNumber, pageSize } = req.body.pagination;
    const skip = ((pageNumber - 1) * pageSize);
    //const limit = pagination.limit;

    const { category, vehicle, stateId, microregionId, callByMicroregion, cityId } = query;
    const customers = await customerRepository.findCustomers(category, vehicle, stateId, cityId, microregionId, callByMicroregion, skip, pageSize);
    res.status(200).json(customers);

}

async function insertCustomer(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const insertedId = await customerRepository.insertCustomer(customer);
    res.status(200).json(insertedId);
}

export default { insertCustomer, updateCustomerStatus, findCustomerById, findCustomer, findCustomers }