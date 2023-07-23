const express = require('express')
const { createService } = require('../controllers/servicePostControllers')
const router = express.Router()

router.post('/create-service', createService)

module.exports = router