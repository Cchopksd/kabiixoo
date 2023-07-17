const express = require('express')
const { signin, signup, getUserLogin } = require('../controllers/userControllers')
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/get-user-login', getUserLogin)

module.exports = router