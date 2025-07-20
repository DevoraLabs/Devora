import "./UserPortfolio.css"
import Pencil from "../../../assets/pencil.png"

function UserPortfolio() {
    return (
        <div className="user-portfolio">
            <div className="user-portfolio-title-container">
                <h2 className="user-portfolio-title">Портфолио</h2>
                <button className="user-portfolio-pencil-button">
                    <img src={Pencil} alt="pencil" className="user-portfolio-pencil" />
                </button>
            </div>

            <ul className="user-portfolio-container">
                <li className="user-portfolio-item">
                    <h3>Полное Имя</h3>
                </li>
                <li className="user-portfolio-item">
                    <h6>О себе:</h6>
                    <p>текст</p>
                </li>
                <li className="user-portfolio-item">
                    <h6>Навыки:</h6>
                    <p>текст</p>
                </li>
                <li className="user-portfolio-item">
                    <h6>Контакты:</h6>
                    <p>текст</p>
                </li>
            </ul>
        </div>
    )
}

export default UserPortfolio