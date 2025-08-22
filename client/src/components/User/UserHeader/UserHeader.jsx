import './UserHeader.css';
import UserIcon from '../../../assets/user-icon.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import $api from '../../../http';
function UserHeader() {
	const { username } = useParams();
	const { username: authUsername } = useUser();
	const [isFollowing, setIsFollowing] = useState(false);
	const [targetUserId, setTargetUserId] = useState(null);

	useEffect(() => {
		async function fetchUserId() {
			try {
				const res = await $api.get(`/user/id-by-username/${username}`);
				setTargetUserId(res.data.userId);
			} catch (err) {
				console.error('Ошибка получения userId:', err);
			}
		}

		if (username) {
			fetchUserId();
		}
	}, [username]);

	useEffect(() => {
		if (!targetUserId) return;

		async function checkFollowing() {
			try {
				const res = await $api.get(
					`/follow/is-following/${targetUserId}`
				);
				setIsFollowing(res.data.isFollowing);
			} catch (err) {
				console.error('Ошибка проверки подписки:', err);
			}
		}

		checkFollowing();
	}, [targetUserId]);

	const handleFollow = async () => {
		try {
			await $api.post(`/follow/${targetUserId}`);
			setIsFollowing(true);
		} catch (err) {
			console.error('Ошибка при подписке:', err);
		}
	};

	const handleUnfollow = async () => {
		try {
			await $api.delete(`/follow/${targetUserId}`);
			setIsFollowing(false);
		} catch (err) {
			console.error('Ошибка при отписке:', err);
		}
	};

	return (
		<div className="user-header">
			<div className="user-header-left">
				<img
					src={UserIcon}
					alt="user-icon"
					className="user-header-icon"
				/>
				<h2 className="user-header-username">{username}</h2>
			</div>

			{username !== authUsername &&
				(isFollowing ? (
					<button
						className="user-header-follow"
						onClick={handleUnfollow}
					>
						Отписаться
					</button>
				) : (
					<button
						className="user-header-follow"
						onClick={handleFollow}
					>
						Подписаться
					</button>
				))}
		</div>
	);
}

export default UserHeader;
