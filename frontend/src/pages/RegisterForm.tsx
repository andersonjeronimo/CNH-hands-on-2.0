import Instrutores from "../assets/instrutores.png";

function RegisterForm() {
    return (
        <div className="container mt-lg-5 mb-lg-5">

            <img src={Instrutores} className="d-block w-50 shadow" 
                alt="Imagem com vários instrutores de trânsito" />


            <div className="alert alert-warning" role="alert">
                {/* {message} */}
            </div>

            <form action="/submit" method="POST" className="row g-3">

                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <label className="form-label">Cidade</label>
                        <select name="city" id="city" className="form-select" required>
                            <option selected disabled value="">Selecione a cidade</option>
                            {/* {cities.forEach(item=> { %>
                                <option value="{ item.nome %>">
                                    { item.nome %>
                                </option>
                                {}) %> */}
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Estado selecionado</label>
                        <input className="form-control" type="text" name="state" id="state" value="{ state.nome }"
                            aria-label="{ state.nome }" readOnly/>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Alterar Estado Selecionado</label>
                        <a className="btn btn-primary form-control shadow" href="/pre_cadastro" role="button">Alterar Estado
                            (UF)</a>
                    </div>
                </div>


                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="firstname" id="firstname"
                        value="{ customer.firstname }" required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" name="lastname" id="lastname"
                        value="{ customer.lastname }" required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text" id="email">@</span>
                        <input type="email" className="form-control" name="email" id="email" value="{ customer.email }"
                            aria-describedby="email" required />
                    </div>
                </div>


                <div className="col-md-1">
                    <label className="form-label">DDD</label>
                    <select name="ddd" id="ddd" className="form-select" required>
                        <option selected disabled value="">DDD</option>
                        {/* {state.ddd.forEach((cod)=> { %>
                            <option value="{ cod %>">
                                { cod %>
                            </option>
                            {}) %> */}
                    </select>
                </div>

                <div className="col-md-5">
                    <label className="form-label">Celular</label>
                    <input type="number" className="form-control" name="phone" id="phone" min="900000000" max="999999999"
                        value="{ customer.phone }"
                        placeholder="Apenas números, sem DDD, pontos ou traços. Ex.: 982827878" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">CPF</label>
                    <input type="number" className="form-control" name="cpf" id="cpf" min="1000000000" max="99999999999"
                        value="{ customer.cpf }" placeholder="Apenas números, sem pontos ou traços. Ex.: 23456756789"
                        required />
                </div>
                

                    <div className="col-6">
                        <label className="form-label">Status</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ status.Ativo }" name="status"
                                id="status" checked />
                                <label className="form-check-label">
                                    Ativo
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ status.Pausado }" name="status"
                                id="status" disabled />
                                <label className="form-check-label">
                                    Pausado
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ status.Inativo }" name="status"
                                id="status" disabled />
                                <label className="form-check-label">
                                    Inativo
                                </label>
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label">Categoria</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ category.A }" name="category"
                                id="category" checked />
                            <label className="form-check-label">
                                "A" (Moto)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ category.B }" name="category"
                                id="category" />
                            <label className="form-check-label">
                                "B" (Carro)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ category.AB }" name="category"
                                id="category" />
                            <label className="form-check-label">
                                "A" e "B" (Carro e moto)
                            </label>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ vehicle.Proprio }" name="vehicle"
                                id="vehicle" checked />
                            <label className="form-check-label">
                                Veículo próprio
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ vehicle.Aluno }" name="vehicle"
                                id="vehicle" />
                            <label className="form-check-label">
                                Veículo do aluno
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="{ vehicle.Ambos }" name="vehicle"
                                id="vehicle" />
                            <label className="form-check-label">
                                Veículo próprio ou do aluno (a combinar)
                            </label>
                        </div>
                    </div>

                    <div className="col-8">
                        <label className="form-label">Descrição do veículo (opcional)</label>
                        <textarea className="form-control" name="description" id="description"
                            value="{ customer.description }"
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