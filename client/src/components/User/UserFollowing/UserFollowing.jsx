import { useEffect, useState } from 'react';
import './UserFollowing.css';
import { Link, useParams } from 'react-router-dom';
import $api from '../../../http';
import Switch from '../../../assets/switch.png';
import UserIcon from '../../../assets/user-icon.png';

function UserFollowing() {
	const { username } = useParams();
	const [followings, setFollowings] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [isShowingFollowings, setIsShowingFollowings] = useState(true);

	useEffect(() => {
		const fetchFollowings = async () => {
			try {
				const res = await $api.get(`/follow/my-followings/${username}`);
				setFollowings(res.data.users);
			} catch (err) {
				console.error('Ошибка при получении подписок:', err);
			}
		};

		fetchFollowings();
	}, [username]);

	useEffect(() => {
		const fetchFollowers = async () => {
			try {
				const res = await $api.get(`/follow/my-followers/${username}`);
				setFollowers(res.data.users);
			} catch (err) {
				console.error('Ошибка при получении подписчиков:', err);
			}
		};

		fetchFollowers();
	}, [username]);

	const handleSwitch = () => {
		setIsShowingFollowings((prev) => !prev);
	};

	const displayedUsers = isShowingFollowings ? followings : followers;

	return (
		<div className="user-following">
			<div className="user-following-header">
				<h2 className="user-following-title">
					{isShowingFollowings ? 'Подписки' : 'Подписчики'}
				</h2>
				<button
					className="user-following-switch"
					onClick={handleSwitch}
				>
					<img src={Switch} alt="switch" />
				</button>
			</div>
			<ul className="followings-list">
				{displayedUsers.map((user, index) => (
					<li key={index} className="followings-item">
						<img src={UserIcon} alt="user-icon" />
						<Link to={`/user/${user}`}>{user}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default UserFollowing;
