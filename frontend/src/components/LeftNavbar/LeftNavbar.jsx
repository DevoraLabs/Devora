import './LeftNavbar.css';
import { useState } from 'react';
import Home from '../../assets/home.png';
import Startups from '../../assets/startups.png';
import MyStartups from '../../assets/my-startups.png';
import Profile from '../../assets/profile.png';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import CreateStartupModal from '../CreateStartupModal/CreateStartupModal';

function LeftNavbar() {
	const { username } = useUser();
	const [createStartup, setCreateStartup] = useState(false);

	return (
		<>
			<ul className="left-navbar">
				<li className="left-navbar-item">
					<Link to="/">
						<img src={Home} alt="home" />
						<h2>Главная</h2>
					</Link>
				</li>
				<li className="left-navbar-item">
					<Link>
						<img src={Startups} alt="startups" />
						<h2>Стартапы</h2>
					</Link>
				</li>
				<li className="left-navbar-item">
					<Link>
						<img
							src={MyStartups}
							alt="my-startups"
							style={{ width: '25px' }}
						/>
						<h2>Мои стартапы</h2>
					</Link>
				</li>
				<li className="left-navbar-item">
					<Link to={`/user/${username}`}>
						<img
							src={Profile}
							alt="profile"
							style={{ height: '23px' }}
						/>
						<h2>Мой профиль</h2>
					</Link>
				</li>
				<li className="left-navbar-button">
					<button
						className="create-startup-button"
						onClick={() => setCreateStartup(true)}
					>
						Создать стартап
					</button>
				</li>
			</ul>

			{createStartup && (
				<CreateStartupModal
					onClose={() => {
						setCreateStartup(false);
					}}
				/>
			)}
		</>
	);
}

export default LeftNavbar;
