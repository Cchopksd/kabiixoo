const Member = require('../models/memberModel')
const generateToken = require('../configs/generateToken')
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');
const { expressjwt: expressJWT } = require("express-jwt")
require('dotenv').config()

// เข้าสู่ระบบ
exports.signin = async (req,res) => {
    // destructuring req
    const {username, password} = req.body

    // เช็คกรอกข้อมูลครบไหม
    if(!username || !password){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    // ดึงข้อมูลผู้ใช้งานคนนั้น
    const user = await Member.findOne({mem_username: username});

    if(user 
        // && (user.mem_password === password)
        && (await user.matchPassword(password))
        )
        {
        return(res.json({
            _id: user.id,
            mem_username: user.mem_username,
            mem_password: user.mem_password,
            mem_name: user.mem_name,
            mem_surname: user.mem_surname,
            mem_email: user.mem_email,
            mem_birthDate: user.mem_birthDate,
            mem_phoneNumber: user.mem_phoneNumber,
            mem_profileImage: user.mem_profileImage,
            mem_verified: user.mem_verified,
            mem_role: user.mem_role,
            token: generateToken(user.id)
        }))
    }else {
        return res.status(400).json({error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
    }
}

// สมัครสมาชิก
exports.signup = async (req,res) => {
    // destructuring req
    const { name,surname,email,phone,birthDate,username,password,confirmPassword,image } = req.body
    console.log(JSON.stringify(req.body))

    // สร้าง slug
    let slug = slugify(username)
    // เช็คถ้า slug เป็นภาษาไทย หรือค่าว่าง
    if (!slug) {
        slug = uuidv4();
    }

    // เช็คกรอกข้อมูลครบไหม
    if (!name || !surname || !email || !phone || !birthDate  || !username || !password || !confirmPassword) {
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    //
    const userExists = await Member.findOne({ mem_username : username})
    const emailExists = await Member.findOne({ mem_email : email})

    // เช็ครูปแบบ email
    const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!emailRegEx.test(email) && email !== "") {
      return res.status(400).json({error: "รูปแบบของอีเมลไม่ถูกต้อง"})
    }

    // เช็ครูปแบบ phoneNumber
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone) && phone !== ""){
        return res.status(400).json({error: "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง"})
    }

    // เช็คว่ามีผู้ใช้งานซ้ำยัง
    if (userExists || emailExists) {
        return res.status(400).json({error: "มีผู้ใช้งานนี้อยู่แล้ว"})
    }

    // เช็คว่ารหัสผ่านที่กรอกตรงมั้ย
    if (password != confirmPassword){
        return res.status(400).json({error: "ยืนยันรหัสผ่านไม่สำเร็จ"})
    }

    // เช็คถ้ารูปโปรไฟล์ไม่ได้แนบมา
    if (image === "") {
        await Member.create({
            mem_username: username,
            mem_password: password,
            mem_name: name,
            mem_surname: surname,
            mem_email: email,
            mem_birthDate: birthDate,
            mem_phoneNumber: phone,
            mem_slug: slug})
            .then((user) => {
                res.json({token: generateToken(user.id), mem_username: user.mem_username})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
    // เช็คถ้ารูปโปรไฟล์แนบมา
    else{
        await Member.create({
            mem_username: username,
            mem_password: password,
            mem_name: name,
            mem_surname: surname,
            mem_email: email,
            mem_birthDate: birthDate,
            mem_phoneNumber: phone,
            mem_profileImage: image,
            mem_slug: slug})
            .then((user) => {
                res.json({token: generateToken(user.id), mem_username: user.mem_username})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
}

// เอาข้อมูลเข้า navbar
exports.getUserLogin = async (req,res) => {
    // console.log(req.body)
    const { username } = req.body
    await Member.findOne({mem_username : username}).then((userInfo) => {
        res.status(200).json(userInfo)
    }).catch((err) => {
        res.status(400).json({error: err})
    })
}

// เอาข้อมูลไปแก้ไข
exports.getProfile = async (req,res) => {
    // url parameter
    const { slug } = req.params
    await Member.findOne({mem_slug: slug}).then((userInfo) => {
        res.status(200).json(userInfo)
    }).catch((err) => {
        res.status(400).json({error: "ไม่พบผู้ใช้งาน"})
    })
}

// อัพเดทข้อมูลหลังแก้ไข
exports.updateProfile = async (req,res) => {
    // url parameter
    const { slug } = req.params
    const { mem_name,mem_surname,mem_phoneNumber,mem_birthDate } = req.body
    const mem_profileImage = req.body.newImage
    console.log(req.body)

    // เช็คกรอกข้อมูลให้ครบ
    if (!mem_name || !mem_surname || !mem_phoneNumber || !mem_birthDate){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(mem_phoneNumber) && mem_phoneNumber !== ""){
        return res.status(400).json({error: "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง"})
    }

    await Member.findOneAndUpdate({mem_slug: slug}, { mem_name,mem_surname,mem_phoneNumber,mem_birthDate,mem_profileImage }, {new:true})
    .then((userInfo) => {
        res.status(200).json({message: "แก้ไขข้อมูลสมาชิกสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({error: "มีข้อผิดพลาด"})
    })
}

// ตรวจสอบ Token
exports.requireLogin = expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})