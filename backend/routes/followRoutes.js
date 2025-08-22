const Router = require('express');
const router = new Router();
const followController = require('../controllers/followController');

router.post('/:userId', followController.followUser);
router.delete('/:userId', followController.unfollowUser);
router.get('/my-followings/:username', followController.getMyFollowings);
router.get('/my-followers/:username', followController.getMyFollowers);
router.get('/is-following/:userId', followController.isFollowing);

module.exports = router;
