const Router = require('express')
const router = new Router()
const startupController = require('../controllers/startupController')

router.post('/create', startupController.createStartup)
router.get('/', startupController.getAllStartups)
router.get('/my-startups/:username', startupController.getMyStartups)

module.exports = router