import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserStartups.css"
import $api from "../../../http";

function UserStartups() {
    const { username } = useParams();
    const [myStartups, setMyStartups] = useState([]);

    useEffect (() => {
        const fetchMyStartups = () => {
            $api.get(`/startups/my-startups/${username}`)
                .then(res => {
                    setMyStartups(res.data)
                })
                .catch(err => {
                    console.error("Ошибка при получении стартапов пользователя", err)
                })
        }

        fetchMyStartups();
        const interval = setInterval(fetchMyStartups, 5000)

        return () => clearInterval(interval)
    }, [username])

    return (
        <div className="user-startups">
            <h2 className="user-startups-title">Стартапы</h2>

            <ul className="my-startups">
                {myStartups.map((startup, index) => (
                    <li key={index} className="my-startups-item">
                        <div className='my-startups-item-container'>
                            <h2>{startup.name}</h2>
                        </div>
                        <div className='my-startups-item-container'>
                            <h5 className='my-startups-item-title'>Описание:</h5>
                            <p>{startup.description}</p>
                        </div>
                        <div className='my-startups-item-container'>
                            <div className='my-line-item'>
                                <h5 className='my-startups-item-title'>Основатель:</h5>
                                <Link to={`/user/${startup.founder}`} className='startups-founder'>{startup.founder}</Link>
                            </div>
                            <div className='my-line-item'>
                                <h5 className='my-startups-item-title'>Команда:</h5>
                                <p className='my-startups-team'>{startup.team}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserStartups