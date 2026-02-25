export default class Customer {
    firstname: string;
    lastname: string;
    email: string;
    ddd: string;
    phone: string;
    cpf: string;
    status: string;
    category: string;
    vehicle: string;
    description: string;
    state: string;
    city: string;

    constructor(firstname: string, lastname: string, email: string, ddd: string, phone: string, cpf: string, status: string, category: string, vehicle: string, description: string, state: string, city: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.ddd = ddd;
        this.phone = phone;
        this.cpf = cpf;
        this.status = status;
        this.category = category;
        this.vehicle = vehicle;
        this.description = description;
        this.state = state;
        this.city = city;
    }
}