import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import customerRepository from '../repositories/customer-repository';
import Customer from '../models/customer';
import Pagination from 'src/models/pagination';

/*Webhook*/
async function updateCustomerStatus(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;
    const event = Array.isArray(req.params.event) ? req.params.is[0] : req.params.event;
    const result = await customerRepository.updateCustomerStatus(cpf, event);
    res.status(200).json(result);
}

async function findCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const customer = await customerRepository.findCustomer({ _id: id });
    res.status(200).json(customer);
}
async function findCustomers(req: Request, res: Response, next: NextFunction) {
    const query = req.body.query;
    const pagination = req.body.pagination as Pagination;
    /*{    
        "category": "A",
        "vehicle": "Proprio",    
        "state": "",
        "stateId": 0,
        "city": "",
        "cityId": 0,
        "microregionId": 0,
        "callByMicroregion":false,
        "agree": false
    }*/
    if (query.callByMicroregion) {
        const { category, vehicle, stateId, microregionId, callByMicroregion } = query;
        const _query = { category, vehicle, stateId, microregionId, callByMicroregion };
        const customers = await customerRepository.findCustomers(_query, pagination);
        res.status(200).json(customers);
    } else {
        const { category, vehicle, stateId, cityId } = query;
        const _query = { category, vehicle, stateId, cityId };
        const customers = await customerRepository.findCustomers(_query, pagination);
        res.status(200).json(customers);
    }

}

async function insertCustomer(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const insertedId = await customerRepository.insertCustomer(customer);
    res.status(200).json(insertedId);
}

export default { insertCustomer, updateCustomerStatus, findCustomer, findCustomers }