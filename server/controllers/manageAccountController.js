const Members = require('../models/memberModel');
const Report = require('../models/reportModel')
const ConfirmBusiness = require('../models/confirmBusinessModel')
const Review = require('../models/reviewModel')
const Chat = require('../models/chatModel')
const ServicePost = require('../models/servicePostModel')
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

//ลบข้อมูล user
exports.removeAccount = async (req, res) => {
    const {mem_slug} = req.params

    await Members.findOne({mem_slug}).then(async (account) => {
        // ถ้าลบคนที่เป็นผู้ให้บริการ
        const isProvider = await ServicePost.findOne({svp_owner : account._id})
        if (isProvider) {
            await ConfirmBusiness.deleteMany({service_id : isProvider._id})
            await Review.deleteMany({service_id : isProvider._id})
            await Report.deleteMany({provider_id : account._id})
            await ServicePost.findOneAndRemove({svp_slug : isProvider.svp_slug})
        }
        if (!account) {
            return res.status(404).json({ message : 'ไม่พบบัญชีผู้ใช้งาน'})
        } 
        // ลบข้อมูลที่เกี่ยวข้องทั้งหมด
        else {
            await Review.deleteMany({customer_id : account._id})
            await Chat.deleteMany({users : account._id})
            await Report.deleteMany({reporter_id : account._id})
            await Members.findOneAndRemove({mem_slug})
            return res.status(200).json({ message: 'ลบบัญชีผู้ใช้งานสำเร็จ' });
        }
    })
    // try {
    //     const account = await Members.findOneAndRemove({ mem_slug });
    //     if (!account) {
    //         return res.status(404).json({ message: 'ไม่พบบัญชี' });
    //     } else{
    //         return res.status(200).json({ message: 'ลบบัญชีสำเร็จ' });
    //     }
    // } catch (error){
    //     console.error(error);
    //     return res.status(500).json({ message: 'Server Error' });
    // }
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

    let {state, email, username} = req.body
    let list = state;

    // เช็คว่าถ้า user กับ email ซ้ำไหม
    const userExists = await Members.findOne({ mem_username : list.mem_username})
    const emailExists = await Members.findOne({ mem_email : list.mem_email})

    // เช็ครูปแบบ email
    const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!emailRegEx.test(list.mem_email) && list.mem_email !== "") {
        return res.status(400).json({error: "รูปแบบของอีเมลไม่ถูกต้อง"})
    }

    // เช็ครูปแบบ phoneNumber
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(list.mem_phoneNumber) && list.mem_phoneNumber !== ""){
        return res.status(400).json({error: "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง"})
    }

    // เช็คว่ามีผู้ใช้งานซ้ำยัง
    if (userExists || emailExists) {
        // เช็คว่าข้อมูลตรงกับที่แสดงผลตอนแรกไหม
        if (userExists) {
            if (userExists.mem_username !== username) {
                return res.status(400).json({error: "มีผู้ใช้งานนี้อยู่แล้ว"})
            }
        }
        if (emailExists) {
            if (emailExists.mem_email !== email) {
                return res.status(400).json({error: "มีผู้ใช้งานนี้อยู่แล้ว"})
            }
        }
    }

    try {
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
        return res.status(500).json({ error: err });
    }
}

exports.isSuspendAccount = async (req, res) => {
    try {
        const { mem_slug } = req.params;
        const user = await Members.findOne({ mem_slug });
        // console.log(user.mem_role);
        if (!user) {
            return res.status(404).json({ message: 'ไม่พบบัญชี' });
        }
        if (user.mem_role === 'admin') {
            return res.status(403).json({ message: 'ไม่สามารถระงับใช้บัญชีแอดมินได้' });
        } else {
            user.isSuspended = !user.isSuspended;
            await user.updateOne({ $set: { isSuspended: user.isSuspended } })
            return res.json({ message: 'แก้ไขสถานะเรียบร้อย' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'server error' });
    }
};
