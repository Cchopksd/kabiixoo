const Chat = require('../models/chatModel')
const Member = require('../models/memberModel')

exports.accessChat = async (req,res) => {

    // id ของคนที่ login
    const { loginId } = req.body

    // id คนที่ต้องการจะ chat ด้วย
    const { serviceOwnerId } = req.body

    // เช็คว่ามี chat อยู่แล้วมั้ย
    var isChat = await Chat.find({
        $and: [
            {users: {$elemMatch: { $eq : loginId }}},
            {users: {$elemMatch: { $eq : serviceOwnerId}}}
        ]
    }).populate("users", "-mem_password").populate("latestMessage")

    // isChat = await Member.populate(isChat, {
    //     path: 'latestMessage.sender',
    //     select: "mem_name mem_profileImage"
    // })

    // ถ้ามี chat นี้อยู่แล้ว
    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        var chatData = {
            chatName : "sender",
            users: [loginId, serviceOwnerId]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id : createdChat._id}).populate("users", "-mem_password")
            res.status(200).json(FullChat)
        }
        catch (error) {
            res.status(400).json({error: "เกิดข้อผิดพลาด"})
        }
    }
}

exports.fetchChats = async (req,res) => {
    // ไอดีของคนที่ login
    const { loginUser } = req.body
    try {
        Chat.find({users: {$elemMatch : {$eq: loginUser}}})
        .populate("users", "-mem_password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 }) // sort chat ใหม่ไปเก่า
        .then(async (results) => {
            results = await Member.populate(results, {
                path: "latestMessage.sender",
                select: "mem_name mem_profileImage",
            });
            res.status(200).json(results)
        })

    }catch (error) {
        res.status(400).json({error : "เกิดข้อผิดพลาด"})
    }
}