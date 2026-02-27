import Check from "../../assets/images/check.svg";
import Chat from "../../assets/images/chat.svg";
import Car from "../../assets/images/car.svg";
import Logo from "../../assets/images/logo.png";
import Instrutores from "../../assets/images/instrutores.png";


function Feature() {

    return (
        <>
            <div className="container mt-lg-5 mb-lg-5">

                <div className="row">
                    <div className="col-lg-4">
                        <img src={Check} alt="" className="bd-placeholder-img rounded-circle" height="140"
                            role="img" width="140" />
                        <h2 className="fw-normal">Cadastre-se como instrutor</h2>
                        <p>
                            Você instrutor se cadastra inserindo nome, e-mail, contato whatsapp, Estado e Cidade que deseja ministrar suas aulas, categorias que ensina e se usa carro próprio ou carro do aluno.
                        </p>
                        <p>
                            <a className="btn btn-success" href="/details">Mais detalhes &raquo;</a>
                        </p>
                    </div>

                    <div className="col-lg-4">
                        <img src={Chat} alt="" className="bd-placeholder-img rounded-circle" height="140"
                            role="img" width="140" />
                        <h2 className="fw-normal">Receba solicitações de alunos</h2>
                        <p>
                            Com base nessas informações, o aluno filtra o profissional de acordo com a necessidade e realiza contato com aquele que escolher. A partir de então, a negociação quanto a valores e execução das aulas é com você, sem qualquer interferência da plataforma.
                        </p>
                        <p>
                            <a className="btn btn-info" href="/details">Mais detalhes &raquo;</a>
                        </p>
                    </div>

                    <div className="col-lg-4">
                        <img src={Car} alt="" className="bd-placeholder-img rounded-circle" height="140"
                            role="img" width="140" />
                        <h2 className="fw-normal">Marque e inicie as aulas</h2>
                        <p>
                            Isso traz liberdade para o profissional, que não ficará engessado em agendas pré-definidas, além de permitir negociação dos valores e até criação de pacotes com mais aulas.
                        </p>
                        <p>
                            <a className="btn btn-danger" href="/details">Mais detalhes &raquo;</a>
                        </p>
                    </div>

                </div>

                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">
                            First featurette heading.
                            <span className="text-body-secondary">It’ll blow your mind.</span>
                        </h2>
                        <p className="lead">
                            Some great placeholder content for the first featurette here.
                            Imagine some exciting prose here.
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={Logo} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500"
                            role="img" width="500" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">
                            Oh yeah, it’s that good.
                            <span className="text-body-secondary">See for yourself.</span>
                        </h2>
                        <p className="lead">
                            Another featurette? Of course. More placeholder content here to
                            give you an idea of how this layout would work with some actual
                            real-world content in place.
                        </p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={Instrutores} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500"
                            role="img" width="500" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">
                            And lastly, this one.
                            <span className="text-body-secondary">Checkmate.</span>
                        </h2>
                        <p className="lead">
                            And yes, this is the last block of representative placeholder
                            content. Again, not really intended to be actually read, simply
                            here to give you a better view of what this would look like with
                            some actual content. Your content.
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={Logo} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500"
                            role="img" width="500" />
                    </div>
                </div>                
            </div>
        </>
    )

}
export default Feature