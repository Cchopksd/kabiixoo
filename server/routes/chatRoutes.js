const express = require('express');
const { accessChat, fetchChats, enableReview } = require('../controllers/chatControllers')
const { requireLogin }= require('../middlewares/authToken')

const router = express.Router();

router.post('/access-chat',requireLogin, accessChat)
router.post('/fetch-chats',requireLogin, fetchChats)
router.post('/enable-review/:chatId',enableReview)

module.exports = router