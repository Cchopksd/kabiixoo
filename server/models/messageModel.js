const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members"
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats"
    }
},{timestamps: true})


module.exports = mongoose.model("Messages", messageSchema)