const express = require('express')
const { signin, signup, getUserLogin, getProfile, updateProfile, getUserId, googleAuth, forgotPassword, forgotChangePassword } = require('../controllers/userControllers')
const { requireLogin }= require('../middlewares/authToken')
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/get-user-login', getUserLogin)
router.get('/edit-profile/:slug',requireLogin , getProfile)
router.put('/edit-profile/:slug',requireLogin , updateProfile)
router.post('/get-userId', getUserId)
router.post('/googleAuth', googleAuth)
router.post('/forgot-password', forgotPassword)
router.post('/forgot-change-password/:id/:token', forgotChangePassword)

module.exports = router