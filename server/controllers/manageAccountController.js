const Members = require('../models/memberModel');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')

//ดึงข้อมูล user ทั้งหมด
exports.getAllAccounts = async (req, res) => {
    try {
        const account = await Members.find();
        res.json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

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

exports.singleAccount = async (req, res) => {
    const { mem_slug } = req.params
    try {
        const account = await Members.findOne({ mem_slug });
        if (!account) {
            return res.status(404).json({ message: 'ไม่พบบัญชี' });
        } else{
            return res.status(200).json(account);
        }
    } catch(err) {
        return res.status(500).json({ message: 'Server Error'})
    }
}

exports.updateAccount = async (req, res) => {
    const { mem_slug } = req.params
    try {
        let list = req.body;
        // hash รหัสผ่านใหม่
        if (list.mem_password.startsWith("$2")) {
            const account = await Members.findOneAndUpdate({ mem_slug }, list, { new: true });
            if (!account) {
                return res.status(404).json({ message: 'ไม่พบบัญชี' });
            } else {
                return res.status(200).json(account);
            }
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashNewPassword = await bcrypt.hash(list.mem_password, salt)
            list.mem_password = hashNewPassword ;
            const account = await Members.findOneAndUpdate({ mem_slug }, list, { new: true });
            if (!account) {
                return res.status(404).json({ message: 'ไม่พบบัญชี' });
            } else {
                return res.status(200).json(account);
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
}
