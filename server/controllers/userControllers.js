const Member = require('../models/memberModel')
const generateToken = require('../configs/generateToken')
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

    const userMail = await Member.findOne({mem_email: username})

    // ถ้าถูกระงับ
    if (user.isSuspended === true) {
        return res.status(400).json({error: "บัญชีนี้ถูกระงับไม่สามารถใช้งานได้"})
    }

    if (user){
        if(user 
            && (await user.matchPassword(password))
            )
            {
            return(res.json({
                _id: user._id,
                mem_username: user.mem_username,
                mem_password: user.mem_password,
                mem_name: user.mem_name,
                mem_surname: user.mem_surname,
                mem_email: user.mem_email,
                mem_birthDate: user.mem_birthDate,
                mem_phoneNumber: user.mem_phoneNumber,
                mem_profileImage: user.mem_profileImage,
                mem_role: user.mem_role,
                isSuspended: user.isSuspended,
                token: generateToken(user._id)
            }))
        }else {
            return res.status(400).json({error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
        }
    } else if (userMail) {
        if(userMail 
            && (await userMail.matchPassword(password))
            )
            {
            return(res.json({
                _id: userMail._id,
                mem_username: userMail.mem_username,
                mem_password: userMail.mem_password,
                mem_name: userMail.mem_name,
                mem_surname: userMail.mem_surname,
                mem_email: userMail.mem_email,
                mem_birthDate: userMail.mem_birthDate,
                mem_phoneNumber: userMail.mem_phoneNumber,
                mem_profileImage: userMail.mem_profileImage,
                mem_role: userMail.mem_role,
                isSuspended: userMail.isSuspended,
                token: generateToken(userMail._id)
            }))
        }else {
            return res.status(400).json({error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
        }
    }else {
        return res.status(400).json({error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
    }
}

// สมัครสมาชิก
exports.signup = async (req,res) => {
    // destructuring req
    const { name,surname,email,phone,birthDate,username,password,confirmPassword,image } = req.body
    // console.log(JSON.stringify(req.body))

    // สร้าง slug
    // let slug = slugify(username)
    let slug = uuidv4()
    // เช็คถ้า slug เป็นภาษาไทย หรือค่าว่าง
    if (!slug) {
        slug = uuidv4();
    }

    // เช็คกรอกข้อมูลครบไหม
    if (!name || !surname || !email || !phone || !birthDate  || !username || !password || !confirmPassword) {
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

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
                res.json({token: generateToken(user._id), mem_username: user.mem_username})
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
                res.json({token: generateToken(user._id), mem_username: user.mem_username})
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

    // เช็คกรอกข้อมูลให้ครบ
    if (mem_name === "" || mem_surname === "" || mem_phoneNumber === "" || mem_birthDate === ""){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(mem_phoneNumber) && mem_phoneNumber !== ""){
        return res.status(400).json({error: "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง"})
    }


    await Member.findOneAndUpdate({mem_slug: slug}, { mem_name,mem_surname,mem_phoneNumber,mem_birthDate,mem_profileImage }, {new:true})
    .then((userInfo) => {
        res.status(200).json({message: "แก้ไขข้อมูลผู้ใช้งานสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({error: "มีข้อผิดพลาด"})
    })
}

// เอา id ของ member
exports.getUserId = async (req,res) => {
    const { username } = req.body
    await Member.findOne({mem_username: username}).then((userInfo) => {
        res.status(200).json(userInfo._id)
    }).catch((err) => {
        res.status(400).json({error: err})
    })
}

exports.googleAuth = async (req,res) => {
    //destructuring
    const { email, imageUrl, givenName, familyName } = req.body

    // สร้าง slug
    let slug = slugify(givenName)

    let userExist = await Member.findOne({mem_email : email})

    // ยังไม่มีบัญชี google นี้
    if (userExist === null) {
        await Member.create({
            mem_username : givenName,
            mem_password: "google",
            mem_name : givenName,
            mem_surname : familyName,
            mem_email : email,
            mem_profileImage : imageUrl,
            mem_slug : uuidv4()
        }).then((user) => {
            return res.json({token: generateToken(user._id), mem_username: user.mem_username})
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({error: err})
        })
    }

    // มีแล้ว
    else if (userExist
        && (await userExist.matchPassword('google'))
        )
        {
        return(res.json({
            _id: userExist._id,
            mem_username: userExist.mem_username,
            mem_password: userExist.mem_password,
            mem_name: userExist.mem_name,
            mem_surname: userExist.mem_surname,
            mem_email: userExist.mem_email,
            mem_birthDate: userExist.mem_birthDate,
            mem_phoneNumber: userExist.mem_phoneNumber,
            mem_profileImage: userExist.mem_profileImage,
            mem_verified: userExist.mem_verified,
            mem_role: userExist.mem_role,
            token: generateToken(userExist._id)
        }))
    }else {
        return res.status(400).json({error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
    }
}

// ลืมรหัสผ่าน
exports.forgotPassword = async (req,res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({message : 'กรุณากรอกอีเมล'})
    }
    await Member.findOne({mem_email : email}).then(user => {
        if(!user) {
            return res.status(400).json({message : 'ไม่มีบัญชีผู้ใช้งานนี้'})
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        // console.log(user)

        var transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_FORGOT,
                // accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
                pass: process.env.EMAIL_FORGOT_PASS
                }
            });

        var mailOptions = {
            from: process.env.EMAIL_FORGOT,
            to: user.mem_email,
            subject: 'ตั้งค่ารหัสผ่านใหม่ใน KabiiXoo',
            text: `${process.env.REACT_APP}/forgot-change-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                return res.json({message : "ตรวจสอบอีเมลของท่านเพื่อเปลี่ยนรหัสผ่าน"})
            }
            transporter.close();
        });
    })
}

// เปลี่ยนรหัสผ่านแบบลืม
exports.forgotChangePassword = async (req,res) => {
    const { id, token } = req.params
    const { newPassword, confirmNewPassword } = req.body

    if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({message : 'กรุณากรอกข้อมูลให้ครบ'})
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({message : 'ยืนยันรหัสผ่านไม่สำเร็จ'})
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(400).json({message : "เกิดข้อผิดพลาด"})
        } else {
            const salt = await bcrypt.genSalt(10);
            bcrypt.hash(newPassword, salt).then(async (hash) => {
                await Member.findByIdAndUpdate({_id: id}, {mem_password : hash}).then(() => {
                    res.json({message : "แก้ไขรหัสผ่านสำเร็จ"})
                }).catch(err => {
                    res.status(400).json({message : "เกิดข้อผิดพลาด"})
                })
            })
        }
    })
}

// เปลี่ยนรหัสผ่านแบบไม่ลืม
exports.changePassword = async (req,res) => {
    const { password, newPassword, confirmNewPassword, slug } = req.body

    // ตรวจสอบว่ากรอกกครบไหม
    if (!password || !newPassword || !confirmNewPassword){
        return res.status(400).json({message : 'กรุณากรอกข้อมูลให้ครบ'})
    }

    // เช็ครหัสเก่าตรงไหม
    await Member.findOne({mem_slug : slug}).then(async(user) => {
        // hash รหัสผ่านใหม่
        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword, salt)
        // ตรวจสอบ password
        const match = await bcrypt.compare(password, user.mem_password)
        if (match) {
            if (newPassword === confirmNewPassword) {
                await Member.findOneAndUpdate({mem_slug : slug}, {mem_password : hashNewPassword})
                return res.json({message : "แก้ไขรหัสผ่านสำเร็จ"})
            } else {
                return res.status(400).json({message : "รหัสผ่านใหม่ไม่ตรงกัน"})
            }
        } else {
            return res.status(400).json({message : "รหัสผ่านปัจจุบันไม่ถูกต้อง"})
        }
    }).catch(() => {
        return res.status(400).json({message : "ไม่มีบัญชีผู้ใช้งานนี้"})
    })
}