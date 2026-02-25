import Instrutores from "../assets/images/instrutores.png";

function PreRegister() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <img src={Instrutores} className="d-block w-50 shadow" 
                alt="Imagem com vários instrutores de trânsito" />
            <form action="/busca" method="GET" className="row g-3">

                <div className="col-md-12">
                    <label className="form-label">Estado</label>
                    <select name="state" id="state" className="form-select" required>
                        <option selected disabled value="">Selecione o Estado</option>
                        {/* <% uf.forEach(item=> { %>
                            <option value="<%= item.id %>">
                                <%= item.nome %>
                            </option>
                            <% }) %> */}
                    </select>
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-success btn-lg shadow">Continuar</button>
                </div>
            </form>
        </div>
    )
}

export default PreRegister