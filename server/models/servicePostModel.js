const mongoose = require('mongoose')

const servicePostSchema = mongoose.Schema({
    svp_owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Members"
    },
    svp_name : {
        type: String,
        required: true
    },
    svp_address : {
        type: String,
        required: true
    },
    svp_province : {
        type: String,
        required: true
    },
    svp_district : {
        type: String,
        required: true
    },
    svp_state : {
        type: String,
        required: true
    },
    svp_introduce : {
        type: String,
        required: true
    },
    svp_description: {
        type: String,
        required: true
    },
    svp_startPrice: {
        type: Number,
        required: true
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
        default: ""
    },
    svp_line: {
        type: String,
        default: ""
    },
    svp_img1: {
        type: String,
        default: ""
    },
    svp_img2: {
        type: String,
        default: ""
    },
    svp_img3: {
        type: String,
        default: ""
    },
    svp_img4: {
        type: String,
        default: ""
    },
    svp_slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    svp_verified: {
        type: Boolean,
        default: false
    },
    svp_point : {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("ServicePosts",servicePostSchema)