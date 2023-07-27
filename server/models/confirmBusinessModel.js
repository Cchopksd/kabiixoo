const mongoose = require('mongoose')

const confirmBusinessSchema = mongoose.Schema({
    svp_id : {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "ServicePosts"
    },
    conf_businessName : {
        type: String,
        require: true,
    },
    conf_description : {
        type: String,
        require: true,
    },
    conf_businessImage1 : {
        type: String,
        default: ""
    },
    conf_businessImage2 : {
        type: String,
        default : ""
    },
    conf_businessImage3 : {
        type: String,
        default : ""
    },
    conf_licenseImage1 : {
        type: String,
        default : ""
    },
    conf_licenseImage2 : {
        type: String,
        default : ""
    },
    conf_licenseImage3 : {
        type: String,
        default : ""
    },
    conf_slug : {
        type: String,
        lowercase: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model("ConfirmBusiness",confirmBusinessSchema)