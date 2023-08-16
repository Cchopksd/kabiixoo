const mongoose = require('mongoose')

const confirmBusinessSchema = mongoose.Schema({
    service_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ServicePosts"
    },
    conf_businessName : {
        type: String,
        required: true,
    },
    conf_description : {
        type: String,
        required: true,
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
    }
}, {timestamps: true})

module.exports = mongoose.model("ConfirmBusiness",confirmBusinessSchema)