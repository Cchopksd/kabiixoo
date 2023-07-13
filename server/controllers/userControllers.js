const Member = require('../models/memberModel')
const generateToken = require('../configs/generateToken')

exports.signin = async (req,res) => {
    // destructuring req
    const {username, password} = req.body

    // เช็คกรอกข้อมูลครบไหม
    if(!username || !password){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    // ดึงข้อมูลผู้ใช้งานคนนั้น
    const user = await Member.findOne({mem_username: username});

    if(user && (user.mem_password === password)){
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

exports.signup = async (req,res) => {
    // destructuring req
    const { name,surname,email,phone,birthDate,username,password,confirmPassword,image } = req.body

    // เช็คกรอกข้อมูลครบไหม
    if (!name || !surname || !email || !phone || !birthDate  || !username || !password || !confirmPassword) {
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    //
    const userExists = await Member.findOne({ mem_username : username})
    const emailExists = await Member.findOne({ mem_email : email})


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
            mem_phoneNumber: phone})
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
            mem_profileImage: image})
            .then((user) => {
                res.json({token: generateToken(user.id), mem_username: user.mem_username})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
}