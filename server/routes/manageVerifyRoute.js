const express = require('express')
const { getAllVerify, deleteVerify,singleVerify } = require('../controllers/manageVerifyController')
const router = express.Router()

router.get('/verify', getAllVerify)
router.get('/verify/:id', singleVerify)
router.delete('/verify/:id', deleteVerify)

module.exports = router