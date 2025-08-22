import { Link, useNavigate } from 'react-router-dom';
import $api from '../../http/index';
import './userMenu.css';
import { useUser } from '../../context/UserContext';

function UserMenu() {
	const navigate = useNavigate();
	const { username } = useUser();

	const handleLogout = async () => {
		try {
			await $api.post('/auth/logout');
			localStorage.removeItem('accessToken');
			navigate('/');
			window.location.reload();
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<div className="user-menu">
			<Link to={`/user/${username}`} className="user-menu-link">
				Ваш профиль
			</Link>
			<button onClick={handleLogout} className="logout-button">
				Выход
			</button>
		</div>
	);
}

export default UserMenu;
