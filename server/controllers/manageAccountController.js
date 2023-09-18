const Members = require('../models/memberModel');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

//ดึงข้อมูล user ทั้งหมด
exports.getAllAccounts = async (req, res) => {
    try {
        const members = await Members.find();
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// exports.getAllServices = async (req,res) => {
//     const keyword = req.query.search ? {
//         $or: [
//             { mem_name: { $regex: req.query.search, $options: "i" } },
//             { mem_surname: { $regex: req.query.search, $options: "i" } },
//             { mem_username: { $regex: req.query.search, $options: "i" } },
//             { mem_email: { $regex: req.query.search, $options: "i" } }
//         ],
//     } : {}

//     if (keyword) {
//         const member = await Members.find(keyword)
//         res.status(200).json(member)
//     }
//     else {
//         const member = await Members.find()
//         res.status(200).json(member)
//     }
// }

exports.removeAccount = async (req, res) => {
    const {slug} = req.params
    try {
        const account = await Members.findOneAndRemove({ mem_slug:slug });
        // console.log(account);
        if (!account) {
            return res.status(404).json({ message: 'ไม่พบบัญชี' });
        } else{
            return res.status(200).json({ message: 'ลบบัญชีสำเร็จ' });
        }
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};