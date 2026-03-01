import { useState, useEffect } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import axios from 'axios';
import TermsShort from './TermsShort';

import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import formModel from '../assets/utils/form-model.json';

function RegisterForm() {

    const messageClass = {
        primary: 'alert alert-primary',
        success: 'alert alert-success',
        danger: 'alert alert-danger',
        warning: 'alert alert-warning',
        info: 'alert alert-info'
    }

    const inputFocusClass = {
        default: 'form-control',
        danger: 'form-control focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2'
    }

    const [message, setMessage] = useState('Cadastro de instrutores. Preencha os campos obrigatórios');
    const [alertClass, setAlertClass] = useState(messageClass.primary);
    const [inputClass, setInputClass] = useState(inputFocusClass.default);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [selectedProvince, setSelectedProvince] = useState(provinceModel);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);//cidades por microrregião

    useEffect(() => {
        setProvinceData(Estados);
    }, []);

    const [formData, setFormData] = useState(formModel);

    const handleInputChange = async (e: any) => {
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

            const province = provinceData.find(estado => estado.nome === value);
            setSelectedProvince(province || provinceModel);
            setFormData(prevState => ({
                ...prevState,
                ['stateId']: province?.id || 0
            }));

            //buscar cidades na API do IBGE
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${province?.id}/municipios?orderBy=nome`;
            axios.get(url)
                .then(response => {
                    if (response.data) {
                        setCitiesData(response.data)
                    } else {
                        setCitiesData([cityModel]);
                    }
                });
            /* 
            .catch(error => {
                setAlertClass(messageClass.danger);
                setMessage(error);
            }); */
        }
        //Cidade===============================================
        else if (name === 'city') {
            const city = citiesData.find(_city => _city.nome === value);
            setSelectedCity(city || cityModel);
            setFormData(prevState => ({
                ...prevState,
                ['cityId']: city?.id || 0
            }));

            setFormData(prevState => ({
                ...prevState,
                ['microregionId']: city?.microrregiao.id || 0
            }));

            setFormData(prevState => ({
                ...prevState,
                ['callByMicroregion']: false
            }));

            setAlertClass(messageClass.info);
            setMessage(`Receber solicitações de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);

            //buscar cidades da microrregião na API do IBGE            
            //`https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${city?.microrregiao.id}/municipios`
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${city?.microrregiao.id}/municipios`;
            axios.get(url)
                .then(response => {
                    if (response.data) {
                        setMicroregionData(response.data)
                    } else {
                        setMicroregionData([cityModel]);
                    }
                });
            /* 
            .catch(error => {
                setAlertClass(messageClass.danger);
                setMessage(error);
            }); */

        }
        //Termos e condições===================================
        else if (type === 'checkbox') {
            if (name === 'agree') {
                if (checked) {
                    setAlertClass(messageClass.warning);
                    setMessage(`Li e concordo com os termos e condições`);
                    setSubmitBtnDisabled(false);
                } else {
                    setAlertClass(messageClass.danger);
                    setMessage(`Para efetuar o cadastro, é necessário concordar com os termos e condições`);
                    setSubmitBtnDisabled(true);
                }
            }
            if (name === 'callByMicroregion') {
                if (checked) {
                    setAlertClass(messageClass.info);
                    setMessage(`
                        Microrregião de ${selectedCity.nome} : ${microregionData.map((city) => (` ${city.nome}`))}
                        `);
                } else {
                    setAlertClass(messageClass.info);
                    setMessage(`Receber solicitações de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);
                }
            }

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        //Validar CPF
        let _cpf = formData.cpf;
        if (!cpf.isValid(_cpf)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CPF informado, ${formData.cpf}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cpf']: ''
            }));
        } else {
            //Prosseguir Cadastro de instrutores. Preencha os campos obrigatórios
            setInputClass(inputFocusClass.default);

            axios.post('http://localhost:3000/api/customer', formData).then(response => {
                if (!response.data) {
                    console.log(response.data)
                } else {
                    setAlertClass(messageClass.success);
                    setMessage(`Cadastro do instrutor ${formData.firstname} realizado com sucesso!`);
                    
                    // Optional: Reset form fields
                    setFormData(formModel);
                    setSelectedProvince(provinceModel);
                    setSelectedCity(cityModel);
                    setProvinceData([provinceModel]);
                    setCitiesData([cityModel]);
                }
            });

            /* 
            .catch(error => {
                setAlertClass(messageClass.danger);
                setMessage(error);
            }); */
        }

        // VERIFICAR, ANTES DE INSERIR, SE JÁ EXISTE O CPF
    };

    return (
        <>
            <div className='container mt-lg-5 mb-lg-5'>
                <p className="text-center"><h1>Cadastro de Instrutores</h1></p>
                <hr />
                {/* <div className='row g-3 align-items-center'>
                    <div className='col-md-12'>
                        <img src={Instrutores} className='rounded mx-auto img-fluid d-block shadow'
                            alt='Imagem com vários instrutores de trânsito' />
                    </div>
                </div> */}

                <form className="row g-3 needs-validation" onSubmit={handleSubmit}>

                    <div className='row g-3 align-items-center'>

                        <div className='col-md-12'>
                            <div className={alertClass} role='alert'>
                                {message}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>1 - Estado</label>
                            <select name='state' id='state' className='form-select' value={formData.state} onChange={handleInputChange} required>
                                <option selected disabled value={''}>Selecione o Estado</option>
                                {provinceData.map((option) => (
                                    <option key={option.id} value={option.nome}>
                                        {option.sigla} - {option.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>2 - Cidade</label>
                            <select name='city' id='city' className='form-select' value={formData.city} onChange={handleInputChange} required>
                                <option selected disabled value={''}>Selecione a cidade</option>
                                {citiesData.map((option) => (
                                    <option key={option.id} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>3 - Microrregião</label>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="callByMicroregion"
                                    id="callByMicroregion"
                                    checked={formData.callByMicroregion}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label">
                                    Receber solicitações de alunos da microrregião de {selectedCity.nome} ?
                                </label>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>4 - Nome</label>
                            <input type='text' className='form-control' name='firstname' id='firstname'
                                value={formData.firstname} onChange={handleInputChange} required />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>5 - Sobrenome</label>
                            <input type='text' className='form-control' name='lastname' id='lastname'
                                value={formData.lastname} onChange={handleInputChange} required />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>6 - Email</label>
                            <div className='input-group'>
                                <span className='input-group-text' id='email'>@</span>
                                <input type='email' className='form-control' name='email' id='email'
                                    value={formData.email} onChange={handleInputChange}
                                    aria-describedby='email' required />
                            </div>
                        </div>


                        <div className='col-md-1'>
                            <label className='form-label'>7 - DDD</label>
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
                            <label className='form-label'>8 - Celular | Whatsapp</label>
                            <input type='number' className='form-control' name='phone' id='phone' min='900000000' max='999999999'
                                value={formData.phone} onChange={handleInputChange}
                                placeholder='Apenas números, sem DDD, pontos ou traços. Ex.: 982827878' required />
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>9 - CPF</label>
                            <input type='text' className={inputClass} name='cpf' id='cpf'
                                value={formData.cpf} onChange={handleInputChange}
                                placeholder='Apenas números, sem pontos ou traços. Ex.: 23456756789'
                                required />
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>10 -Descrição do veículo (opcional)</label>
                            <textarea className='form-control' name='description' id='description'
                                value={formData.description} onChange={handleInputChange} rows={3}
                                placeholder='Se for veículo próprio, você pode colocar aqui a marca, modelo, tipo de câmbio, etc. Isso pode ajudar na escolha do instrutor'></textarea>
                        </div>

                        <hr />

                        <div className='col-md-4'>
                            <label className='form-label'>11 - Status</label>
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
                                    id='status' disabled />
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
                                    id='status' disabled />
                                <label className='form-check-label'>
                                    Inativo
                                </label>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <label className='form-label'>12 - Categoria</label>
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
                            <label className='form-label'>13 - Veículo</label>
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
                            <label className='form-label'>14 - Termos e Condições Gerais de uso</label>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="agree"
                                    id="agree"
                                    checked={formData.agree}
                                    onChange={handleInputChange}
                                    required />
                                <label className="form-check-label">
                                    Declaro que li e concordo com os <span>
                                        <a href="#" role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Termos de Uso da CNH Na Mão</a>
                                    </span>, assumindo integral responsabilidade pelas informações prestadas e pelos serviços oferecidos.

                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">TERMOS E CONDIÇÕES GERAIS DE USO</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">

                                                    <TermsShort></TermsShort>

                                                </div>
                                                <div className="modal-footer">

                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="checkbox"
                                                            name="agree"
                                                            id="agree"
                                                            checked={formData.agree}
                                                            onChange={handleInputChange}
                                                            required />
                                                        <label className="form-check-label">
                                                            Li e concordo com os termos
                                                        </label>
                                                    </div>

                                                    <hr />

                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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