const Message = require('../models/messageModel')
const Member = require('../models/memberModel')
const Chat = require('../models/chatModel')

exports.sendMessage = async (req,res) => {
    // คนที่ login ส่งข้อความ
    const { loginUser } = req.body
    const { content, chatId } = req.body

    if (!content || !chatId) {
        return res.status(400).json({error : "เกิดข้อผิดพลาด"})
    }

    // สร้างข้อความ
    var newMessage = {
        sender: loginUser,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage)

        message = await message.populate('sender','mem_name mem_profileImage')
        message = await message.populate('chat')
        message = await Member.populate(message, {
            path: 'chat.users',
            select: 'mem_name mem_profileImage'
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.json(message)
    }catch (error) {
        res.status(400).json({error: "เกิดข้อผิดพลาด"})
    }
}

exports.allMessage = async (req,res) => {
    try {
        const messages = await Message.find({chat : req.params.chatId})
        .populate('sender', 'mem_name mem_profileImage')
        .populate('chat')

        res.json(messages)
    } catch (error) {
        res.status(400).json({error: "เกิดข้อผิดพลาด"})
    }
}