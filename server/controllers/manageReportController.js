const Report = require('../models/reportModel');
const ServicePost = require('../models/servicePostModel');
const { v4: uuidv4 } = require('uuid');


exports.getAllReport = async(req, res) =>{
    try {
        await Report.find({}).populate('provider_id').populate('reporter_id' ).then(async (reportInfo) => {
            res.status(200).json(reportInfo)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.singleReport = async (req, res) => {
    try {
        const { rep_slug } = req.params;
        await Report.findOne({ rep_slug }).populate('provider_id').populate('reporter_id' ).then(async (reportInfo) =>{
            console.log(JSON.stringify(reportInfo))
            console.log({svp_owner:reportInfo.provider_id})
            await ServicePost.findOne({ svp_owner:reportInfo.provider_id }).then(async (serviceInfo) =>{
                // console.log(serviceInfo)
                if (!reportInfo) {
                    res.status(404).json({ message: 'Report not found' });
                } else {
                    res.status(200).json({reportInfo,serviceInfo});
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.removeReport = async (req, res) => {
    try {
        const {rep_slug} = req.params
        await Report.findOneAndRemove({ rep_slug }).then(async (reportInfo) =>{
            if (!reportInfo) {
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