const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    customer_id : {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Members"
    },
    service_id : {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "ServicePosts"
    },
    rev_description : {
        type: String,
        default: ""
    },
    rev_point : {
        type: Number,
        default: 0
    },
}, {timestamps: true})

module.exports = mongoose.model("Reviews", reviewSchema)