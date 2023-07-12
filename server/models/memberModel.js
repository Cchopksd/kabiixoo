const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
    mem_username : {
        type: String,
        required: true
    },
    mem_password : {
        type: String,
        required: true
    },
    mem_name : {
        type: String,
        required: true
    },
    mem_surname : {
        type: String,
        required: true
    },
    mem_email : {
        type: String,
        required: true
    },
    mem_birthDate : {
        type: Date,
        // required: true,
        default: new Date()
    },
    mem_phoneNumber : {
        type: String,
    },
    mem_profileImage : {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    mem_verified : {
        type: Boolean,
        default: false
    },
    mem_role : {
        type: String,
        default: "member"
    },
}, {timestamps: true})

module.exports = mongoose.model("Members",memberSchema)