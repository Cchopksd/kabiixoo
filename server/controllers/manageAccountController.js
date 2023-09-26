const Members = require('../models/memberModel');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

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

//ลบข้อมูล user
exports.removeAccount = async (req, res) => {
    const {mem_slug} = req.params
    try {
        const account = await Members.findOneAndRemove({ mem_slug });
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
        const list = req.body;
        const account = await Members.findOneAndUpdate({ mem_slug }, list, { new: true });
        if (!account) {
            return res.status(404).json({ message: 'ไม่พบบัญชี' });
        } else {
            return res.status(200).json(account);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
}

exports.isSuspendAccount = async (req, res) => {
    try {
        const { mem_slug } = req.params;
        const user = await Members.findOne({ mem_slug });
        // console.log(user.mem_role);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.mem_role === 'admin') {
            return res.status(403).json({ message: 'Admins cannot be suspended' });
        } else {
            user.isSuspended = !user.isSuspended;
            await user.save();
            return res.json({ message: 'User suspension status updated' });
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
};
