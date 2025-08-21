import { useEffect, useState } from "react"
import "./HeaderStartups.css"
import $api from "../../http"
import { Link } from "react-router-dom"

function HeaderStartups() {
    const [popularStartups, setPopularStartups] = useState([])

    useEffect(() => {
        const fetchPopularStartups = () => {
            $api.get('/startups')
                .then(res => {
                    setPopularStartups(res.data.slice(-3))
                }) 
                .catch(err => {
                    console.log("Ошибка при получении последних популярных стартапов:", err)
                }) 
        }

        fetchPopularStartups()
        const interval = setInterval(fetchPopularStartups, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="popular-startups-container">
            <h1 className="popular-startups-title">Популярные стартапы</h1>

            <ul className="popular-startups">
                {popularStartups.map((startup, index) => (
                    <li key={index} className="popular-startups-item">
                        <div className="popular-startups-item-container">
                            <h2>{startup.name}</h2>
                        </div>
                        <div className="popular-startups-item-container">
                            <h5 className="popular-startups-item-title">Описание:</h5>
                            <p>{startup.description}</p>
                        </div>
                        <div className="popular-startups-item-container">
                            <div className="popular-startups-line-item">
                                <h5 className="popular-startups-item-title">Основатель:</h5>
                                <Link to={`user/${startup.founder}`} className="popular-startups-founder">{startup.founder}</Link>
                            </div>
                            <div className="popular-startups-line-item">
                                <h5 className="popular-startups-item-title">Команда:</h5>
                                <p className="popular-startups-team">{startup.team}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HeaderStartups