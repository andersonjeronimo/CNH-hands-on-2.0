import LogoImg from "../../assets/images/logo.png";
function Logo() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <img src={LogoImg} className="rounded mx-auto d-block w-50" alt="Imagem com logo da CNH Na Mão"></img>
            <hr />
        </div>
    )

}

export default Logo;