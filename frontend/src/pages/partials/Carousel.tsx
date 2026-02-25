//import Logo from "./assets/logo.png";
import Promo from "../../assets/images/promocao.png";

function Carousel() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <div id="carouselExampleIndicators" className="carousel slide mt-lg-5 mb-lg-5">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Promo} className="d-block w-100 shadow" alt="Imagem com vários instrutores de trânsito" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                {/* <h1>Cadastre-se</h1> */}
                                {/* <p className="opacity-75">
                                    Some representative placeholder content for the first slide of the carousel.
                                </p> */}
                                {/* <p>
                                    <a className="btn btn-lg btn-primary" href="#">Cadastro de Instrutor</a>
                                </p> */}
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/preregister" role="button">                                        
                                        Cadastrar como instrutor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={Promo} className="d-block w-100 shadow" alt="Imagem com vários instrutores de trânsito" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                {/* <h1>Cadastre-se</h1> */}
                                {/* <p className="opacity-75">
                                    Some representative placeholder content for the first slide of the carousel.
                                </p> */}
                                {/* <p>
                                    <a className="btn btn-lg btn-primary" href="#">Cadastro de Instrutor</a>
                                </p> */}
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/preregister" role="button">                                        
                                        Cadastrar como instrutor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={Promo} className="d-block w-100 shadow" alt="Imagem com vários instrutores de trânsito" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                {/* <h1>Cadastre-se</h1> */}
                                {/* <p className="opacity-75">
                                    Some representative placeholder content for the first slide of the carousel.
                                </p> */}
                                {/* <p>
                                    <a className="btn btn-lg btn-primary" href="#">Cadastro de Instrutor</a>
                                </p> */}
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/preregister" role="button">                                        
                                        Cadastrar como instrutor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> 
            <hr className="featurette-divider" />           
        </div>
    )
}

export default Carousel