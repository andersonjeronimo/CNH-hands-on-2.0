import { useState, useEffect } from 'react';
import axios from 'axios';
import TermsShort from './TermsShort';

import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
//MODELO PARA A TABELA DE CUSTOMERS
import formModel from '../assets/utils/form-model.json';
//MODELO PARA O FORMULÁRIO DE BUSCA
import searchFormModel from '../assets/utils/search-form-model.json';

function SearchForm() {

    const messageClass = {
        primary: 'alert alert-primary',
        success: 'alert alert-success',
        danger: 'alert alert-danger',
        warning: 'alert alert-warning',
        info: 'alert alert-info'
    }

    const [message, setMessage] = useState('Busca de instrutores. Localize um instrutor conforme os critérios de busca');
    const [alertClass, setAlertClass] = useState(messageClass.success);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);//cidades por microrregião

    useEffect(() => {
        setProvinceData(Estados);
    }, []);

    const [formData, setFormData] = useState(searchFormModel);
    const [tableData, setTableData] = useState([formModel]);

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //Estado===============================================
        if (name === 'state') {

            const province = provinceData.find(estado => estado.nome === value);
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
            setMessage(`Localizar instrutores de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);

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
                    setMessage(`Para efetuar a busca, é necessário concordar com os termos e condições`);
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
                    setMessage(`Localizar instrutores de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);
                }
            }

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/customers', formData).then(response => {
            if (response.data) {
                setTableData(response.data)
            } else {
                setTableData([formModel]);
            }
        });

        /* 
            .catch(error => {
                setAlertClass(messageClass.danger);
                setMessage(error);
            }); */
    };

    return (
        <>
            <div className='container mt-lg-5 mb-lg-5'>
                <p className="text-center"><h1>Busca de Instrutores</h1></p>
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
                                    Buscar instrutores na microrregião de {selectedCity.nome} ?
                                </label>
                            </div>
                        </div>

                        <hr />

                        <div className='col-md-6'>
                            <label className='form-label'>4 - Categoria</label>
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

                        <div className='col-md-6'>
                            <label className='form-label'>5 - Veículo</label>
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
                            <label className='form-label'>6 - Termos e Condições Gerais de uso</label>
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
                                        <a href="#" role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Termos de Uso da CNH Na Mão</a></span>
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
                            <button className='btn btn-success btn-lg shadow' type='submit'
                                disabled={submitBtnDisabled}>
                                Buscar Instrutor
                            </button>
                        </div>

                    </div>
                </form>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Veículo</th>
                            <th scope="col">Contato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((customer) => (

                            <tr>
                                <th scope="row">
                                    {customer.firstname}
                                </th>
                                <td>
                                    {customer.phone}
                                </td>
                                <td>
                                    {customer.category}
                                </td>
                                <td>
                                    {customer.vehicle}
                                </td>
                                <td>
                                    <a className="btn btn-success shadow form-control"
                                        href={`https://wa.me/55${customer.ddd}${customer.phone}?text=Olá!%20Te%20encontrei%20pelo%20aplicativo%20CNH%20Na%20Mão.%20Gostaria%20de%20agendar%20aulas%20de%20direção.%20Aguardo%20seu%20contato!`}
                                        role="button" target="_blank" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path
                                                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                        Whatsapp</a>
                                </td>
                            </tr>
                        ))}





                    </tbody>
                </table>

            </div>
        </>
    )
}

export default SearchForm;