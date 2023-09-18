const Confirm = require('../models/confirmBusinessModel');
const servicePost = require('../models/servicePostModel');
const { v4: uuidv4 } = require('uuid');

exports.getAllVerify = async (req, res) => {
    try {
        const confirmInfo = await Confirm.find({}).populate('service_id');
        const servicePostInfo = await servicePost.find({}).populate('svp_owner');

        const verifyInfo = {
            confirmInfo,
            servicePostInfo
        };

        res.status(200).json(verifyInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
