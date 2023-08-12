const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers')
const { requireLogin }= require('../middlewares/authToken')

const router = express.Router();

router.post('/send-message', requireLogin, sendMessage)
router.get('/get-message/:chatId', requireLogin, allMessage)

module.exports = router