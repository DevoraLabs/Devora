const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.get('/:username', userController.getUser);
router.put('/:username', userController.updateUser);
router.get('/id-by-username/:username', userController.idByUsername);

module.exports = router;
