import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import customerRepository from '../repositories/customer-repository';
import { Status, Vehicle, Category } from "../utils/utils";
import Customer from '../models/customer';
//import axios from 'axios';
//import { cpf } from 'cpf-cnpj-validator';

//import fs from 'fs';
//import path from 'path';
//const FILE_PATH = path.join(__dirname, '../public/utils/estados.json');
//const PAGES_PATH = path.join(__dirname, '../public/views/');

/*Webhook*/
async function updateCustomerStatus(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;
    const event = Array.isArray(req.params.event) ? req.params.is[0] : req.params.event;
    const result = await customerRepository.updateCustomerStatus(cpf, event);
    res.status(200).json(result);
}

async function findCustomers(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.findCustomers({});
    res.status(200).json(customers);
}

async function findCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;    
    const customer = await customerRepository.findCustomer({ _id: id });
    res.status(200).json(customer);
}

async function findCustomersFilter(req: Request, res: Response, next: NextFunction) {
    const filter = {
        category: req.body.category,
        vehicle: req.body.vehicle,
        city: req.body.city
    }
    const customers = await customerRepository.findCustomers(filter);
    res.status(200).json(customers);
}

async function insertCustomer(req: Request, res: Response, next: NextFunction) {
    let customer = req.body as Customer;
    const insertedId = await customerRepository.insertCustomer(customer);
    res.status(200).json(insertedId);
}

/* async function searchPage(req: Request, res: Response, next: NextFunction) {
    const state = req.query.state;
    const url = `${process.env.IBGE_ESTADOS}${state}/municipios?orderBy=nome`;
    //const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`;
    try {
        //const response = await axios.get(url);
        //res.render(`${PAGES_PATH}pages/busca`, { cities: response.data, status: Status, vehicle: Vehicle, category: Category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from IBGE API');
    }

} */

/* async function preRegisterPage(req: Request, res: Response, next: NextFunction) {
    if (fs.existsSync(FILE_PATH)) {
        const states = fs.readFileSync(FILE_PATH, 'utf8');
        res.render(`${PAGES_PATH}pages/pre_cadastro`, { titulo: 'Lista de Estados', uf: JSON.parse(states) });
    } else {
        res.render(`${PAGES_PATH}pages/pre_cadastro`, { titulo: 'Lista de Estados', uf: [], ddd: [] });
    }
}
 */
/* async function registerPage(req: Request, res: Response, next: NextFunction) {    
    let _customer = {} as Customer;
    const state_id = req.query.state;    
    let data = fs.readFileSync(FILE_PATH, 'utf8');
    const states: any[] = JSON.parse(data);
    const state = states.find(item => String(item.id) === state_id);

    const url = `${process.env.IBGE_ESTADOS}${state.id}/municipios?orderBy=nome`;
    //const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state_id}/municipios?orderBy=nome`;    

    try {
        let _message = "Preencha todos os campos obrigatórios.";
        //const response = await axios.get(url);        
        //res.render(`${PAGES_PATH}pages/cadastro`, { message: _message, customer: _customer, state: state, cities: response.data, status: Status, vehicle: Vehicle, category: Category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from IBGE API');
    }
} */

/* async function submitPage(req: Request, res: Response, next: NextFunction) {
    let customer = req.body as Customer;
    // verifica se é um número válido
    const _cpf = customer.cpf;
    if (cpf.isValid(_cpf)) {
        // formata o número gerado
        //customer.cpf = cpf.format(_cpf);
        const insertedId = await customerRepository.insertCustomer(customer);
        res.render(`${PAGES_PATH}pages/submit`, { customer: customer, result: insertedId });
    }
    else {        
        let _message = `O CPF informado (${customer.cpf}) é inválido.`;        
        const state_name = customer.state;
        let data = fs.readFileSync(FILE_PATH, 'utf8');
        const states: any[] = JSON.parse(data);
        const state = states.find(item => String(item.nome) === state_name);
        const url = `${process.env.IBGE_ESTADOS}${state.id}/municipios?orderBy=nome`;
        try {
            //const response = await axios.get(url);            
            //res.render(`${PAGES_PATH}pages/cadastro`, { message: _message, customer: customer, state: state, cities: response.data, status: Status, vehicle: Vehicle, category: Category });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from IBGE API');
        }
    }    
} */

/* async function preSearchPage(req: Request, res: Response, next: NextFunction) {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        res.render(`${PAGES_PATH}pages/pre_busca`, { titulo: 'Lista de Estados', uf: JSON.parse(data) });
    } else {
        res.render(`${PAGES_PATH}pages/pre_busca`, { titulo: 'Lista de Estados', uf: [] });
    }
}
 */

export default { insertCustomer, updateCustomerStatus, findCustomer, findCustomers, findCustomersFilter }