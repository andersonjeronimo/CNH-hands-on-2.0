import Instrutores from "./assets/instrutores.png";

function Home() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <img src={Instrutores} className="d-block w-50 shadow" 
                alt="Imagem com vários instrutores de trânsito" />

            <p className="fs-2 text-center">Bem vindo ao cadastro de instrutores do CNH Na Mão!</p>

            <div className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">Cadastrar novo instrutor</label>
                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/pre_cadastro" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add"
                            viewBox="0 0 16 16">
                            <path
                                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path
                                d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        </svg>
                        Novo instrutor
                    </a>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Voltar para página principal</label>
                    <a className="btn btn-primary form-control btn-lg shadow-lg"
                        href="https://sites.google.com/view/cnhnamao2026/in%C3%ADcio?authuser=0" role="button"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house"
                            viewBox="0 0 16 16">
                            <path
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                        Página principal</a>
                </div>
            </div>
        </div>
    )
}

export default Home