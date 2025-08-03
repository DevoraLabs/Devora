const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/signup', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 6 и меньше 32 символов").isLength({min: 6, max: 32})
], authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)

module.exports = router