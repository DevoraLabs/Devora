const Router = require('express')
const router = new Router()
const startupController = require('../controller/startupController')

router.post('/create', startupController.createStartup)
router.get('/', startupController.getAllStartups)

module.exports = router