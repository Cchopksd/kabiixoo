const Confirm = require('../models/confirmBusinessModel');
const servicePost = require('../models/servicePostModel');
const express = require('express');
const mongoose = require('mongoose');

exports.getAllVerify = async (req, res) => {
    try {
        Confirm.find({})
            .populate({
                path: 'service_id', // ระบุความสัมพันธ์กับ ServicePosts
                model: 'ServicePosts', // ระบุโมเดลที่เชื่อมโยงกับ ServicePosts
                populate: {
                    path: 'svp_owner', // ระบุความสัมพันธ์กับ member
                    model: 'Members', // ระบุโมเดลที่เชื่อมโยงกับ member
                    select: 'mem_name mem_surname mem_email', // เลือกฟิลด์ที่คุณต้องการแสดงเฉพาะ mem_name
                },
            })
            .then((Confirm) => {
                res.status(200).json(Confirm)
            }).catch((err) => {
                res.status(404)
            })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

exports.deleteVerify = async (req, res) => {
    try {
        const {id} = req.params
        await Confirm.findByIdAndDelete(id).then(async (confirmInfo) =>{
            if (!confirmInfo) {
                return res.status(404).json({ message: 'ไม่พบบัญชี' });
            } else{
                return res.status(200).json({ message: 'ลบบัญชีสำเร็จ' });
            }
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// exports.singleVerify = async (req, res) => {

//     const {id} = req.params; // Assuming you receive the ObjectId as a parameter
//     try {
//         Confirm.findById({id})
//             // .populate({
//             //     path: 'service_id', // ระบุความสัมพันธ์กับ ServicePosts
//             //     model: 'ServicePosts', // ระบุโมเดลที่เชื่อมโยงกับ ServicePosts
//             //     populate: {
//             //         path: 'svp_owner', // ระบุความสัมพันธ์กับ member
//             //         model: 'Members', // ระบุโมเดลที่เชื่อมโยงกับ member
//             //         select: 'mem_name mem_surname mem_email', // เลือกฟิลด์ที่คุณต้องการแสดงเฉพาะ mem_name
//             //     },
//             // })
//             .then((Confirm) => {
//                 res.status(200).json(Confirm)
//             }).catch((err) => {
//                 res.status(404)
//             })

//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error'
//         });
//     }

// }

exports.singleVerify = async (req, res) => {
    const { id } = req.params
    try {
        await Confirm.findById(id)
        .populate({
                path: 'service_id', // ระบุความสัมพันธ์กับ ServicePosts
                model: 'ServicePosts', // ระบุโมเดลที่เชื่อมโยงกับ ServicePosts
                populate: {
                    path: 'svp_owner', // ระบุความสัมพันธ์กับ member
                    model: 'Members', // ระบุโมเดลที่เชื่อมโยงกับ member
                    select: 'mem_name mem_surname mem_email', // เลือกฟิลด์ที่คุณต้องการแสดงเฉพาะ mem_name
                },
            })
        .then((Confirm) => {
            res.status(200).json(Confirm)
        }).catch((err) => {
            res.status(404)
        })
    } catch(err) {
        return res.status(500).json({ message: 'Server Error'})
    }
}

exports.updateVerify = async (req, res) => {
    try {
        const { id } = req.params;
        const confirm = await Confirm.findById(id)
            .populate({
                path: 'service_id',
                model: 'ServicePosts',
                select: 'svp_verified',
            }).exec()

        if (!confirm) {
            return res.status(404).json({ message: 'Document not found' });
        }else {
            confirm.service_id.svp_verified = true;
            await confirm.service_id.save();
            await Confirm.findByIdAndRemove(id);
            return res.json(confirm);
        }
        } catch (err) {
        return res.status(500).json({ message: 'Server Error' });
    }
};