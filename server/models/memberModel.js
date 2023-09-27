const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const memberSchema = mongoose.Schema({
    mem_username : {
        type: String,
        // required: true
    },
    mem_password : {
        type: String,
        // required: true
    },
    mem_name : {
        type: String,
        // required: true
    },
    mem_surname : {
        type: String,
        // required: true
    },
    mem_email : {
        type: String,
        // required: true
    },
    mem_birthDate : {
        type: String,
        // required: true,
        // default: new Date()
    },
    mem_phoneNumber : {
        type: String,
    },
    mem_profileImage : {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    mem_role : {
        type: String,
        default: "member"
    },
    mem_slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

// เช็ค hash กับ ฐานข้อมูล
memberSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mem_password)
}

// แปลง password เป็น hash
memberSchema.pre('save', async function (next) {
    if(!this.isModified){
        next()
    }

    // hash รหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    this.mem_password = await bcrypt.hash(this.mem_password, salt)
})

module.exports = mongoose.model("Members",memberSchema)