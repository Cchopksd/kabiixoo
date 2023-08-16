const express = require('express')
const { createRequest } = require('../controllers/confirmBusinessControllers')
const { requireLogin }= require('../middlewares/authToken')

const router = express.Router()

router.post('/confirm-business/:slug'
, requireLogin
, createRequest)

module.exports = router