import "./UserPortfolio.css"
import Pencil from "../../../assets/pencil.png"
import { useEffect, useState, useCallback  } from "react"
import EditPortfolio from "../EditPortfolio/EditPortfolio"
import $api from '../../../http/index'
import { useParams } from "react-router-dom"
import { useUser } from "../../../context/UserContext"

function UserPortfolio() {
    const { username } = useParams();
    const { username: authUsername } = useUser();
    const [editorVisible, setEditorVisible] = useState(false);
    const [userData, setUserData] = useState("");

    const fetchUserData = useCallback(() => {
        $api.get(`/user/${username}`)
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => {
                console.error("Ошибка загрузки пользователя:", err);
            })
    }, [username])

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData])

    return (
        <div className="user-portfolio">
            <div className="user-portfolio-title-container">
                <h2 className="user-portfolio-title">Портфолио</h2>
                {username === authUsername && (
                    <button 
                        className="user-portfolio-pencil-button" 
                        onClick={() => setEditorVisible(true)}
                    >
                        <img src={Pencil} alt="pencil" className="user-portfolio-pencil" />
                    </button>
                )}
            </div>

            <ul className="user-portfolio-container">
                <li className="user-portfolio-item">
                    <h3>{userData?.fullname}</h3>
                </li>
                <li className="user-portfolio-item">
                    <h6>О себе:</h6>
                    <p>{userData?.about}</p>
                </li>
                <li className="user-portfolio-item">
                    <h6>Навыки:</h6>
                    <p>{userData?.skills}</p>
                </li>
                <li className="user-portfolio-item">
                    <h6>Контакты:</h6>
                    <ul>
                        {userData?.contacts?.map((contact, idx) => (
                        <li key={idx}>
                            <a href={contact.link} target="_blank" rel="noopener noreferrer">
                            {contact.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                </li>
            </ul>

            {editorVisible && (
                <EditPortfolio onClose={() => {
                    setEditorVisible(false);
                    fetchUserData();
                }} />
            )}
        </div>
    )
}

export default UserPortfolio