import { useState, useEffect } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import axios from 'axios';

import Instrutores from '../assets/images/instrutores.png';
import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
//import microRegionModel from '../assets/utils/microrregiao-model.json';
import formModel from '../assets/utils/form-model.json';

function RegisterForm() {

    //https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/{microrregiao}/municipios       

    const messageClass = {
        primary: 'alert alert-primary',
        success: 'alert alert-success',
        danger: 'alert alert-danger',
        warning: 'alert alert-warning',
        info: 'alert alert-info'
    }
    const [message, setMessage] = useState('Cadastro de instrutores. Preencha os campos obrigatórios');
    const [alertClass, setAlertClass] = useState(messageClass.primary);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [selectedProvince, setSelectedProvince] = useState(provinceModel);
    const [citiesData, setCitiesData] = useState([cityModel]);
    const [selectedCity, setSelectedCity] = useState(cityModel);

    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

    useEffect(() => {
        setProvinceData(Estados);
    }, []);

    const [formData, setFormData] = useState(formModel);

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

            const province = provinceData.find(provinceModel => provinceModel.nome === value);
            setSelectedProvince(province || provinceModel);

            //buscar cidades na API do IBGE
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${province?.id}/municipios?orderBy=nome`;
            axios.get(url)
                .then(response => setCitiesData(response.data))
                .catch(error => {
                    setAlertClass(messageClass.danger);
                    setMessage(error);
                });
        }
        //Cidade===============================================
        else if (name === 'city') {
            const city = citiesData.find(_city => _city.nome === value);
            setSelectedCity(city || cityModel);

        }
        //Termos e condições===================================
        else if (type === 'checkbox') {            
            if (checked) {
                setAlertClass(messageClass.info);
                setMessage(`Concordo com os termos e condições`);
                setSubmitBtnDisabled(false);
            } else {
                setAlertClass(messageClass.danger);
                setMessage(`NÃO concordo com os termos e condições`);
                setSubmitBtnDisabled(true);
            }

        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        //Validar CPF
        let _cpf = formData.cpf;
        if (!cpf.isValid(_cpf)) {
            setAlertClass(messageClass.danger);
            setMessage(`O CPF informado, ${cpf.format(formData.cpf)}, é inválido!`);
            setFormData(prevState => ({
                ...prevState,
                ['cpf']: ''
            }));
        } else {
            //Prosseguir Cadastro de instrutores. Preencha os campos obrigatórios
            setAlertClass(messageClass.success);
            setMessage(`Cadastro do instrutor ${formData.firstname} realizado com sucesso!`);
        }

        // You cannot directly write to a local JSON file from the client-side

        // You would typically send this data to a server API

        // VERIFICAR, ANTES DE INSERIR, SE JÁ EXISTE O CPF
    };

    return (
        <>
            <div className='container mt-lg-5 mb-lg-5'>

                <img src={Instrutores} className='rounded mx-auto img-fluid d-block shadow'
                    alt='Imagem com vários instrutores de trânsito' />

                <form onSubmit={handleSubmit} className='row g-3'>

                    <div className='row g-3 align-items-center'>

                        <div className='col-md-12'>
                            <div className={alertClass} role='alert'>
                                {message}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Estado</label>
                            <select name='state' id='state' className='form-select' value={selectedProvince.nome} onChange={handleInputChange} required>
                                <option selected disabled value={''}>Selecione o Estado</option>
                                {provinceData.map((option) => (
                                    <option key={option.id} value={option.nome}>
                                        {option.sigla} - {option.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>Cidade</label>
                            <select name='city' id='city' className='form-select' value={selectedCity.nome} onChange={handleInputChange} required>
                                <option selected disabled value={''}>Selecione a cidade</option>
                                {citiesData.map((option) => (
                                    <option key={option.id} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>Nome</label>
                            <input type='text' className='form-control' name='firstname' id='firstname'
                                value={formData.firstname} onChange={handleInputChange} required />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Sobrenome</label>
                            <input type='text' className='form-control' name='lastname' id='lastname'
                                value={formData.lastname} onChange={handleInputChange} required />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Email</label>
                            <div className='input-group'>
                                <span className='input-group-text' id='email'>@</span>
                                <input type='email' className='form-control' name='email' id='email'
                                    value={formData.email} onChange={handleInputChange}
                                    aria-describedby='email' required />
                            </div>
                        </div>


                        <div className='col-md-1'>
                            <label className='form-label'>DDD</label>
                            <select name='ddd' id='ddd' className='form-select' value={formData.ddd} onChange={handleInputChange} required>
                                <option selected value={'00'}>00</option>
                                {selectedProvince.ddd.map((ddd) => (
                                    <option value={ddd}>
                                        {ddd}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-md-5'>
                            <label className='form-label'>Celular</label>
                            <input type='number' className='form-control' name='phone' id='phone' min='900000000' max='999999999'
                                value={formData.phone} onChange={handleInputChange}
                                placeholder='Apenas números, sem DDD, pontos ou traços. Ex.: 982827878' required />
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>CPF</label>
                            <input type='number' className='form-control' name='cpf' id='cpf' min='1000000000' max='99999999999'
                                value={formData.cpf} onChange={handleInputChange}
                                placeholder='Apenas números, sem pontos ou traços. Ex.: 23456756789'
                                required />
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>Descrição do veículo (opcional)</label>
                            <textarea className='form-control' name='description' id='description'
                                value={formData.description} onChange={handleInputChange}
                                placeholder='Informe tipo de câmbio, modelo, etc.'></textarea>
                        </div>

                        <hr />

                        <div className='col-md-4'>
                            <label className='form-label'>Status</label>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='status'
                                    value='Ativo'
                                    checked={formData.status === 'Ativo'}
                                    onChange={handleInputChange}
                                    id='status' />
                                <label className='form-check-label'>
                                    Ativo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='status'
                                    value='Pausado'
                                    checked={formData.status === 'Pausado'}
                                    onChange={handleInputChange}
                                    id='status' />
                                <label className='form-check-label'>
                                    Pausado
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='status'
                                    value='Inativo'
                                    checked={formData.status === 'Inativo'}
                                    onChange={handleInputChange}
                                    id='status' />
                                <label className='form-check-label'>
                                    Inativo
                                </label>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <label className='form-label'>Categoria</label>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='A'
                                    checked={formData.category === 'A'}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "A" - Motocicleta
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='B'
                                    checked={formData.category === 'B'}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "B" - Automóvel
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='AB'
                                    checked={formData.category === 'AB'}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "A" e "B" - Motocicleta e Automóvel
                                </label>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <label className='form-label'>Veículo</label>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value='Proprio'
                                    checked={formData.vehicle === 'Proprio'}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo próprio
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value='Aluno'
                                    checked={formData.vehicle === 'Aluno'}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo do aluno
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value='Combinar'
                                    checked={formData.vehicle === 'Combinar'}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo próprio ou do aluno (a combinar)
                                </label>
                            </div>
                        </div>

                        <hr />

                        <div className='col-md-12'>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="agree"
                                    id="agree"
                                    checked={formData.agree}
                                    onChange={handleInputChange}
                                    required />
                                <label className="form-check-label">
                                    Li e concordo com os termos e condições
                                </label>
                            </div>
                        </div>

                        <div className='d-grid gap-2 col-12 mx-auto'>
                            <button className='btn btn-primary btn-lg shadow' type='submit'
                                disabled={submitBtnDisabled}>
                                Cadastrar Instrutor
                            </button>
                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default RegisterForm;