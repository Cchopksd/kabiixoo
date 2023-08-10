const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    chatName: {
        type: String, 
        trim: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members",
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
    }
},{timestamps: true})

module.exports = mongoose.model("Chats", chatSchema)