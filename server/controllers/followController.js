const Follow = require('../models/Follow');
const User = require('../models/User');

class followController {
	async followUser(req, res) {
		try {
			const followerId = req.user.id;
			const followingId = req.params.userId;

			if (followerId === followingId) {
				return res
					.status(400)
					.json({ message: 'Нельзя подписаться на самого себя' });
			}

			const exists = await Follow.findOne({
				follower: followerId,
				following: followingId,
			});
			if (exists) {
				return res.status(400).json({ message: 'Вы уже подписаны' });
			}

			const follow = await Follow.create({
				follower: followerId,
				following: followingId,
			});
			return res.json(follow);
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async unfollowUser(req, res) {
		try {
			const followerId = req.user.id;
			const followingId = req.params.userId;

			const deleted = await Follow.findOneAndDelete({
				follower: followerId,
				following: followingId,
			});

			if (!deleted) {
				return res.status(400).json({ message: 'Подписка не найдена' });
			}

			return res.json({ message: 'Отписка успешно выполнена' });
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async getMyFollowings(req, res) {
		try {
			const { username } = req.params;
			const user = await User.findOne({ username });

			if (!user) {
				return res
					.status(404)
					.json({ message: 'Пользователь не найден' });
			}

			const followings = await Follow.find({ follower: user._id })
				.populate('following', 'username')
				.lean();

			res.json({
				count: followings.length,
				users: followings.map((f) => f.following.username),
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async getMyFollowers(req, res) {
		try {
			const { username } = req.params;
			const user = await User.findOne({ username });

			if (!user) {
				return res
					.status(404)
					.json({ message: 'Пользователь не найден' });
			}

			const followers = await Follow.find({ following: user._id })
				.populate('follower', 'username')
				.lean();

			res.json({
				count: followers.length,
				users: followers.map((f) => f.follower.username),
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async isFollowing(req, res) {
		try {
			const currentUser = req.user.id;
			const targetUser = req.params.userId;

			const follow = await Follow.findOne({
				follower: currentUser,
				following: targetUser,
			});

			res.json({ isFollowing: !!follow });
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}
}

module.exports = new followController();
