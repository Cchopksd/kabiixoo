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

exports.enableReview = async (req,res) => {
    // id ของแชท
    const { chatId } = req.params
    // id ของผู้ให้บริการ
    const { loginUser } = req.body
    // id ของผู้ใช้บริการ
    let customerId = ''

    await Chat.findOne({_id : chatId}).then(async (chatInfo) => {
        // console.log(chatInfo.users[0])
        // if(chatInfo.users[0].toString() !== loginUser){
        //     customerId = chatInfo.users[0].toString()
        // }
        // else if (chatInfo.users[1].toString() !== loginUser) {
        //     customerId = chatInfo.users[1].toString()
        // }
        // console.log(loginUser)
        // console.log(customerId)
        if (chatInfo.canReview === true) {
            return res.status(400).json({err : "อนุญาติให้รีวิวแล้ว"})
        }
        await Chat.findOneAndUpdate({_id : chatId},{canReview : true}, {new : true}).then(() => {
            res.json({message : "อนุญาติให้รีวิวสำเร็จ"})
        })
    }).catch((err) => {
        res.status(400).json({err : "เกิดข้อผิดพลาด"})
    })
}