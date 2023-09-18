const express = require('express')
const { getAllVerify } = require('../controllers/manageVerifyController')
const router = express.Router()

router.get('/verify', getAllVerify)

module.exports = router