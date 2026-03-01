import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TermsShort from './TermsShort';

import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import searchFormModel from '../assets/utils/search-form-model.json';

function SearchForm() {

    const navigate = useNavigate();

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
            if (!response.data) {
                console.log(response.data);
                //setmessage(ERRO!)
            } else {
                navigate('/search-result');
                //passar result.data?
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
                                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Termos e Condições Gerais de Uso</h1>
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
            </div>
        </>
    )
}

export default SearchForm;