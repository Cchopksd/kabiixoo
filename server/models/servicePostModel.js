const mongoose = require('mongoose')

const servicePostSchema = mongoose.Schema({
    svp_owner : {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Members"
    },
    svp_name : {
        type: String,
        require: true
    },
    svp_address : {
        type: String,
        require: true
    },
    svp_province : {
        type: String,
        require: true
    },
    svp_district : {
        type: String,
        require: true
    },
    svp_introduce : {
        type: String,
        require: true
    },
    svp_description: {
        type: String,
        require: true
    },
    svp_startPrice: {
        type: Number,
        require: true
    },
    svp_grooming: {
        type: Boolean,
        default: false
    },
    svp_petStuff: {
        type: Boolean,
        default: false
    },
    svp_carService: {
        type: Boolean,
        default: false
    },
    svp_pool: {
        type: Boolean,
        default: false
    },
    svp_petWalk: {
        type: Boolean,
        default: false
    },
    svp_haveDog: {
        type: Boolean,
        default: false
    },
    svp_haveCat: {
        type: Boolean,
        default: false
    },
    svp_haveBird: {
        type: Boolean,
        default: false
    },
    svp_haveRabbit: {
        type: Boolean,
        default: false
    },
    svp_haveRodent: {
        type: Boolean,
        default: false
    },
    svp_haveReptile: {
        type: Boolean,
        default: false
    },
    svp_havePhone: {
        type: String,
        default: ""
    },
    svp_facebook: {
        type: String,
        default: ""
    },
    svp_instagram: {
        type: String,
        default: false
    },
    svp_line: {
        type: String,
        default: false
    },
    svp_img1: {
        type: String,
    },
    svp_img2: {
        type: String,
    },
    svp_img3: {
        type: String,
    },
    svp_img4: {
        type: String,
    },
})

module.exports = mongoose.model("ServicePosts",servicePostSchema)