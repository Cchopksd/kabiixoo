const express = require('express');
const { accessChat, fetchChats } = require('../controllers/chatControllers')
const { requireLogin }= require('../middlewares/authToken')

const router = express.Router();

router.post('/access-chat',requireLogin, accessChat)
router.post('/fetch-chats',requireLogin, fetchChats)

module.exports = router