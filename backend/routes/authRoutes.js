const Router = require('express')
const router = new Router()
const controller = require('../controller/authController')
const {check} = require('express-validator')

router.post('/signup', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 6 и меньше 32 символов").isLength({min: 6, max: 32})
], controller.signup)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/refresh', controller.refresh)

module.exports = router