const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    provider_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Members"
    },
    reporter_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Members"
    },
    rep_title : {
        type: String,
        required: true
    },
    rep_description : {
        type: String,
        required: true
    },
    rep_image1 : {
        type: String,
        default: ""
    },
    rep_image2 : {
        type: String,
        default: ""
    },
    rep_image3 : {
        type: String,
        default: ""
    },
}, {timestamps: true})

module.exports = mongoose.model("Reports", reportSchema)