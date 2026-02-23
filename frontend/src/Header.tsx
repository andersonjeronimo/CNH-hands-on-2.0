import Pin from "./assets/cnh-pin.svg"
function Header() {
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary shadow-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={Pin} width="30" height="30" className="d-inline-block align-top" alt="Logo"/>CNH Na Mão</a>
                        
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Cadastro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Busca Instrutores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Sobre</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header