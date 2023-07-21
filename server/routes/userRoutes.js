const express = require('express')
const { signin, signup, getUserLogin, getProfile, updateProfile, requireLogin } = require('../controllers/userControllers')
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/get-user-login', getUserLogin)
router.get('/edit-profile/:slug',requireLogin, getProfile)
router.put('/edit-profile/:slug',requireLogin, updateProfile)

module.exports = router