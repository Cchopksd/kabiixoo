const Report = require('../models/reportModel')
const ServicePost = require('../models/servicePostModel')
const { v4: uuidv4 } = require('uuid');

exports.sendReport = async (req,res) => {
    // สร้าง slug
    let reportSlug = uuidv4()

    const { slug } = req.params
    const { reportTopic, reportDesc, image1, image2, image3, reporterId } = req.body

    await ServicePost.findOne({svp_slug: slug}).populate('svp_owner').then( async (providerInfo) => {
        const providerId = providerInfo.svp_owner._id
        await Report.create({
            provider_id: providerId,
            reporter_id: reporterId,
            rep_title: reportTopic,
            rep_description: reportDesc,
            rep_image1: image1,
            rep_image2: image2,
            rep_image3: image3,
            rep_slug: reportSlug
        })
        return res.status(200).json({message: "รายงานผู้ให้บริการสำเร็จ"})
    }).catch((err) => {
        return res.status(400).json({error : "ไม่พบบริการ"})
    })

}
