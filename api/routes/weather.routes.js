const { Router } = require('express')
const ctr = require('../controllers/weather.controller')
const router = Router()

// /api/weather/
router.get('/', ctr.getOne)

module.exports = router
