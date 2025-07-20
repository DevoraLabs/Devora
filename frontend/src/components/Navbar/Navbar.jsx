import { Link } from "react-router-dom"
import "./Navbar.css"
import { useState } from "react"
import userIcon from "../../assets/user-icon.png"
import UserMenu from "../userMenu/userMenu"
import { useSelector } from "react-redux"

function Navbar() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [userMenuVisible, setUserMenuVisible] = useState(false);

    return (
        <div className="navbar">
            <Link to="/" className="logo-text-link">
                <h2 className="logo-text">Logo</h2>
            </Link>

            {!isLoggedIn ? (
                <Link to="/login">
                    <button className="login-button">Вход</button>
                </Link>
            ) : (
                <button className="user-button" onClick={() => setUserMenuVisible(!userMenuVisible)}>
                    <img src={userIcon} alt="user-icon" className="user-icon" />
                </button>
            )}

            {userMenuVisible ? (
                <UserMenu />
            ) : null }
        </div>
    )
}

export default Navbar