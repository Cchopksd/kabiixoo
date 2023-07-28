const express = require('express')
const { sendReport } = require('../controllers/reportControllers')
const { requireLogin }= require('../middlewares/authToken')
const router = express.Router()

router.post('/send-report/:slug',requireLogin, sendReport)

module.exports = router