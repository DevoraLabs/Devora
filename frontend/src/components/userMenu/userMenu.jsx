import { Link } from 'react-router-dom';
import $api from '../../http/index'
import "./userMenu.css"
import { logout } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function UserMenu() {
    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await $api.post('/auth/logout');
            localStorage.removeItem('accessToken'); 
            dispatch(logout());
            window.location.reload(); 
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div className='user-menu'>
            <Link to={`/user/${username}`} className='user-menu-link'>Ваш профиль</Link>
            <button onClick={handleLogout} className='logout-button'>Выход</button>
        </div>
    )
}

export default UserMenu