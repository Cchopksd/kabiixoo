const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({

}, {timestamps: true})

module.exports = mongoose.model("Reports", reportSchema)