const express = require('express');
const { accessChat, fetchChats } = require('../controllers/chatControllers')

const router = express.Router();

router.post('/access-chat', accessChat)
router.post('/fetch-chats', fetchChats)

module.exports = router