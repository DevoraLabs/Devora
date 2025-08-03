const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/:username', userController.getUser)
router.put('/:username', userController.updateUser)

module.exports = router