const express = require('express')
const { getAllVerify, deleteVerify,singleVerify,updateVerify } = require('../controllers/manageVerifyController')
const router = express.Router()

router.get('/verify', getAllVerify)
router.get('/verify/:id', singleVerify)
router.delete('/verify/:id', deleteVerify)
router.put('/verify/:id', updateVerify)

module.exports = router