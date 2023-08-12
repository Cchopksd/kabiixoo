const express = require('express')
const { requireLogin }= require('../middlewares/authToken')
const { sendReview, getAllReview } = require('../controllers/reviewControllers')

const router = express.Router()

router.post('/review/:slug',requireLogin , sendReview)
router.get('/review/:slug',requireLogin, getAllReview)

module.exports = router