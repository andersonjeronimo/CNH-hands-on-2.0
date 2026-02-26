import { useState, useEffect } from "react";
import axios from "axios";

import Instrutores from "../assets/images/instrutores.png";
import EstadosData from "../assets/utils/estados.json";

function RegisterForm() {
    const _municipio = {
        "id": 0,
        "nome": "",
        "microrregiao": {
            "id": 0,
            "nome": "",
            "mesorregiao": {
                "id": 0,
                "nome": "",
                "UF": {
                    "id": 0,
                    "sigla": "",
                    "nome": "",
                    "regiao": {
                        "id": 0,
                        "sigla": "",
                        "nome": ""
                    }
                }
            }
        },
        "regiao-imediata": {
            "id": 0,
            "nome": "",
            "regiao-intermediaria": {
                "id": 0,
                "nome": "",
                "UF": {
                    "id": 0,
                    "sigla": "",
                    "nome": "",
                    "regiao": {
                        "id": 0,
                        "sigla": "",
                        "nome": ""
                    }
                }
            }
        }
    };


    //https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/{microrregiao}/municipios
    const _microregiao = {
        id: 0,
        nome: '',
        microrregiao: {
            id: 0,
            nome: '',
            mesorregiao:
            {
                id: 0,
                nome: '',
            }
        }
    };

    const _estado = {
        id: 0,
        sigla: '',
        ddd: [''],
        nome: '',
        regiao: {
            id: 0,
            sigla: '',
            nome: ''
        }
    };

    const [availableUFs, setAvailableUFs] = useState([_estado]);
    const [selectedUF, setSelectedUF] = useState(_estado);
    const [availableCities, setAvailableCities] = useState([_municipio]);
    const [selectedCity, setSelectedCity] = useState(_municipio);

    useEffect(() => {
        setAvailableUFs(EstadosData);
    }, []);

    const _formFields = {
        firstname: '',
        lastname: '',
        email: '',
        ddd: '',
        phone: '',
        cpf: '',
        status: '',
        category: '',
        vehicle: '',
        description: '',
        state: '',
        city: ''
    };

    // State for form inputs
    const [formData, setFormData] = useState(_formFields);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //Estado===============================================
        if (name === 'state') {
            //reset DDD
            setFormData(prevState => ({
                ...prevState,
                ['ddd']: ''
            }));

            const estado = availableUFs.find(_estado => _estado.nome === value);
            setSelectedUF(estado || _estado);

            //buscar cidades na API do IBGE
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado?.id}/municipios?orderBy=nome`;
            axios.get(url)
                .then(response => setAvailableCities(response.data))
                .catch(error => console.error(error));
        }
        //Cidade===============================================
        else if (name === 'city') {
            const municipio = availableCities.find(_cidade => _cidade.nome === value);
            setSelectedCity(municipio || _municipio);

        }
    };

    /* const handleUFChange = (e: any) => {
        const { name, value } = e.target;
        const uf = value;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        //reset DDD
        setFormData(prevState => ({
            ...prevState,
            ['ddd']: ''
        }));

        const estado = availableUFs.find(_estado => _estado.nome === uf);
        setSelectedUF(estado || _estado);

        //buscar cidades na API do IBGE
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado?.id}/municipios?orderBy=nome`;
        axios.get(url)
            .then(response => setAvailableCities(response.data))
            .catch(error => console.error(error));
        //.finally(() => setLoading(false));
    };

    const handleCityChange = (e: any) => {
        const { name, value } = e.target;
        const city = value;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        const municipio = availableCities.find(_cidade => _cidade.nome === city);
        setSelectedCity(municipio || _municipio);
    };    
 */

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // You cannot directly write to a local JSON file from the client-side
        // You would typically send this data to a server API
    };
    
    return (
        <div className="container mt-lg-5 mb-lg-5">

            <img src={Instrutores} className="d-block w-50 shadow"
                alt="Imagem com vários instrutores de trânsito" />


            <div className="alert alert-warning" role="alert">
                {formData.state},
                {formData.firstname},
                {formData.lastname},
                {formData.email},
                {formData.ddd},
                {formData.phone},
                {formData.cpf},
                {formData.status},
                {formData.category},
                {formData.vehicle},
                {formData.description},
                {formData.city}
            </div>

            <form /* action="/submit" method="POST" */ onSubmit={handleSubmit} className="row g-3">


                <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                        <label className="form-label">Estado</label>
                        <select name="state" id="state" className="form-select" value={selectedUF.nome} onChange={handleInputChange} required>
                            <option selected disabled value={""}>Selecione o Estado</option>
                            {availableUFs.map((option) => (
                                <option key={option.id} value={option.nome}>
                                    {option.sigla} - {option.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-5">
                        <label className="form-label">Cidade</label>
                        <select name="city" id="city" className="form-select" value={selectedCity.nome} onChange={handleInputChange} required>
                            <option selected disabled value={""}>Selecione a cidade</option>
                            {availableCities.map((option) => (
                                <option key={option.id} value={option.nome}>
                                    {option.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="firstname" id="firstname"
                        value={formData.firstname} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" name="lastname" id="lastname"
                        value={formData.lastname} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text" id="email">@</span>
                        <input type="email" className="form-control" name="email" id="email"
                            value={formData.email} onChange={handleInputChange}
                            aria-describedby="email" required />
                    </div>
                </div>


                <div className="col-md-1">
                    <label className="form-label">DDD</label>
                    <select name="ddd" id="ddd" className="form-select" value={formData.ddd} onChange={handleInputChange} required>
                        <option selected value={"00"}>00</option>
                        {selectedUF.ddd.map((ddd) => (
                            <option value={ddd}>
                                {ddd}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-5">
                    <label className="form-label">Celular</label>
                    <input type="number" className="form-control" name="phone" id="phone" min="900000000" max="999999999"
                        value={formData.phone} onChange={handleInputChange}
                        placeholder="Apenas números, sem DDD, pontos ou traços. Ex.: 982827878" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">CPF</label>
                    <input type="number" className="form-control" name="cpf" id="cpf" min="1000000000" max="99999999999"
                        value={formData.cpf} onChange={handleInputChange}
                        placeholder="Apenas números, sem pontos ou traços. Ex.: 23456756789"
                        required />
                </div>


                <div className="col-6">
                    <label className="form-label">Status</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Status.Ativo"} name="status"
                            id="status" checked />
                        <label className="form-check-label">
                            Ativo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Status.Pausado"} name="status"
                            id="status" disabled />
                        <label className="form-check-label">
                            Pausado
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Status.Inativo"} name="status"
                            id="status" disabled />
                        <label className="form-check-label">
                            Inativo
                        </label>
                    </div>
                </div>

                <div className="col-6">
                    <label className="form-label">Categoria</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Category.A"} name="category"
                            id="category" checked />
                        <label className="form-check-label">
                            "A" (Moto)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Category.B"} name="category"
                            id="category" />
                        <label className="form-check-label">
                            "B" (Carro)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={"Category.AB"} name="category"
                            id="category" />
                        <label className="form-check-label">
                            "A" e "B" (Carro e moto)
                        </label>
                    </div>
                </div>

                <div className="col-4">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={formData.vehicle} name="vehicle"
                            id="vehicle" checked />
                        <label className="form-check-label">
                            Veículo próprio
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={formData.vehicle} name="vehicle"
                            id="vehicle" />
                        <label className="form-check-label">
                            Veículo do aluno
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value={formData.vehicle} name="vehicle"
                            id="vehicle" />
                        <label className="form-check-label">
                            Veículo próprio ou do aluno (a combinar)
                        </label>
                    </div>
                </div>

                <div className="col-8">
                    <label className="form-label">Descrição do veículo (opcional)</label>
                    <textarea className="form-control" name="description" id="description"
                        value={formData.description} onChange={handleInputChange}
                        placeholder="Informe tipo de câmbio, modelo, etc."></textarea>
                </div>



                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary btn-lg shadow" type="submit">Cadastrar Instrutor</button>
                </div>
            </form>

        </div>
    )
}

export default RegisterForm;