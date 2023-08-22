const ConfirmBusiness = require('../models/confirmBusinessModel')
const ServicePost = require('../models/servicePostModel')
const { v4: uuidv4 } = require('uuid');

exports.createRequest = async (req,res) => {

    // slug ของ service
    const { slug } = req.params

    // destructuring
    const { businessName, businessDesc, imageBusiness1, imageBusiness2, imageBusiness3,
        imageLicense1, imageLicense2, imageLicense3 } = req.body

    console.log(req.body)

    // validate
    if (!businessName || !businessDesc){
        return res.status(400).json({error: "กรุณากรอกข้อมูลให้ครบ"})
    }

    // const service = await ServicePost.findOne({svp_slug: slug})
    await ServicePost.findOne({svp_slug: slug}).then(async(service) => {
        const serviceId = service._id
        console.log(serviceId)
        await ConfirmBusiness.create({
            service_id: serviceId,
            conf_businessName: businessName,
            conf_description: businessDesc,
            conf_businessImage1: imageBusiness1,
            conf_businessImage2: imageBusiness2,
            conf_businessImage3: imageBusiness3,
            conf_licenseImage1: imageLicense1,
            conf_licenseImage2: imageLicense2,
            conf_licenseImage3: imageLicense3,
        })

            res.status(200).json({message: "ส่งหลักฐานการยืนยันสำเร็จ"})
    }).catch((err) => {
        console.error(err);
        res.status(500).json({error: "ไม่พบบริการ"})
    })

    // if(service){
    //     await ConfirmBusiness.create({
    //         svp_id: service._id,
    //         conf_businessName: businessName,
    //         conf_description: businessDesc,
    //         conf_businessImage1: imageBusiness1,
    //         conf_businessImage2: imageBusiness2,
    //         conf_businessImage3: imageBusiness3,
    //         conf_licenseImage1: imageLicense1,
    //         conf_licenseImage2: imageLicense2,
    //         conf_licenseImage3: imageLicense3,
    //     }).then(() => {
    //         res.status(200).json({message: "ส่งคำร้องการยืนยันสำเร็จ"})
    //     }).catch(() => {
    //         res.status(400).json({message: "ส่งคำร้องการยืนยันไม่สำเร็จ"})
    //     })
    // }else {
    //     return res.status(400).json({error: "ไม่พบบริการ"})
    // }
}