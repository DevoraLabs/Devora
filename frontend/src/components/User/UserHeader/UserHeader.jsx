import "./UserHeader.css"
import UserIcon from "../../../assets/user-icon.png"
import { useParams } from "react-router-dom"

function UserHeader() {
    const { username } = useParams();

    return (
        <div className="user-header">
            <img src={UserIcon} alt="user-icon" className="user-header-icon" />
            <h2 className="user-header-username">{username}</h2>
        </div>
    )
}

export default UserHeader