const express = require('express')
const { getAllReport, singleReport } = require('../controllers/manageReportController')
const router = express.Router()

router.get('/report', getAllReport)
router.get('/report/:slug', singleReport)

module.exports = router