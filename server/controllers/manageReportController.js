const Report = require('../models/reportModel');
const { v4: uuidv4 } = require('uuid');


exports.getAllReport = async(req, res) =>{
    try {
        const { slug } = req.params
        await Report.find({}).populate('provider_id').populate('reporter_id' ).then(async (reportInfo) => {
            res.status(200).json(reportInfo)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}