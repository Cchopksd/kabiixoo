const express = require('express')
const { getAllReport, singleReport,removeReport } = require('../controllers/manageReportController')
const router = express.Router()

router.get('/report', getAllReport)
router.get('/report/:rep_slug', singleReport)
router.delete('/report/:rep_slug', removeReport)

module.exports = router;