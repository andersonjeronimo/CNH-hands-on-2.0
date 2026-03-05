import LogoImg from "../../assets/images/logo.png";
function Logo() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <img src={LogoImg} className="rounded mx-auto d-block" width={500} alt="Imagem com logo da CNH Na Mão"></img>
        </div>
    )

}

export default Logo;