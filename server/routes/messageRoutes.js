const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers')

const router = express.Router();

router.post('/send-message', sendMessage)
router.get('/get-message/:chatId', allMessage)

module.exports = router