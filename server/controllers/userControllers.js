const Member = require('../models/memberModel')
const generateToken = require('../configs/generateToken')

exports.signin = async (req,res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

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
    const { mem_username,mem_password,mem_name,mem_surname,mem_email,mem_birthDate,mem_phoneNumber,mem_profileImage } = req.body

    if (!mem_username || !mem_password || !mem_name || !mem_surname || !mem_email  || !mem_phoneNumber ) {
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    const userExists = await Member.findOne({ mem_username })
    const emailExists = await Member.findOne({ mem_email })

    if (userExists || emailExists) {
        return res.status(400).json({error: "มีผู้ใช้งานนี้อยู่แล้ว"})
    }

    await Member.create({
        mem_username,
        mem_password,
        mem_name,
        mem_surname,
        mem_email,
        mem_birthDate,
        mem_phoneNumber,
        mem_profileImage})
        .then((user) => {
        res.json(user)
    }).catch((err) => {
        res.status(400).json({error: err})
    })
}