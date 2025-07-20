import "./UserHeader.css"
import UserIcon from "../../../assets/user-icon.png"
import { useSelector } from 'react-redux';

function UserHeader() {
    const username = useSelector((state) => state.user.username);

    return (
        <div className="user-header">
            <img src={UserIcon} alt="user-icon" className="user-header-icon" />
            <h2 className="user-header-username">{username}</h2>
        </div>
    )
}

export default UserHeader