const Report = require('../models/reportModel');
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
        const reportInfo = await Report.findOne({ rep_slug }).exec();

        if (!reportInfo) {
            res.status(404).json({ message: 'Report not found' });
        } else {
            res.status(200).json(reportInfo);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
