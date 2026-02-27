function Acordion() {

    return (

        <div className="container mt-lg-5 mb-lg-5">            
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <strong>O que é a plataforma CNH NA MÃO?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <strong>Mudanças recentes nas regras para obtenção da primeira habilitação</strong> passaram a permitir que instrutores atuem de forma autônoma, sem depender exclusivamente das autoescolas.
                            Foi a partir dessa nova realidade que nasceu o CNH na Mão: uma plataforma que conecta alunos e instrutores de forma simples, rápida e segura, facilitando o acesso às aulas práticas em todo o Brasil.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            <strong>Como nós ajudamos os INSTRUTORES?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>A CNH na Mão é uma plataforma digital de divulgação profissional,</strong> criada para conectar instrutores de trânsito autônomos a alunos que estão iniciando sua habilitação ou buscando aulas práticas.

                            Nosso objetivo é simples: dar visibilidade ao seu trabalho e facilitar que novos alunos encontrem você.

                            Ao se cadastrar, seu perfil passa a aparecer para alunos da sua região, permitindo contato direto, rápido e sem intermediários.

                            Você mantém total autonomia sobre:

                            valores das aulas

                            horários disponíveis

                            forma de pagamento

                            negociação com o aluno

                            A plataforma não interfere na sua rotina, apenas aproxima você de quem precisa das suas aulas.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            <strong>Como nós ajudamos os ALUNOS?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Com o CNH na Mão,</strong> você aluno encontra instrutores credenciados perto de você, agenda aulas práticas com total flexibilidade e inicia sua jornada de habilitação com mais autonomia de forma simples — tudo para economizar tempo e ter liberdade para escolher como, quando e com quem aprender. 
                        </div>
                    </div>
                </div>
            </div>            
        </div>


    )

}

export default Acordion