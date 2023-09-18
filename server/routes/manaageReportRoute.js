const express = require('express')
const { getAllReport } = require('../controllers/manageReportController')
const router = express.Router()

router.get('/verify', getAllReport)

module.exports = router