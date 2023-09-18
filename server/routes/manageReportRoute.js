const express = require('express')
const { getAllReport } = require('../controllers/manageReportController')
const router = express.Router()

router.get('/report', getAllReport)

module.exports = router