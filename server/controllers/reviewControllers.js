const Review = require('../models/reviewModel')
const ServicePost = require('../models/servicePostModel')

exports.sendReview = async (req,res) => {
    // slug ของบริการ
    const { slug } = req.params

    // destructuring req
    const { reviewerId, reviewDesc, rating } = req.body

    if (rating === null) {
        return res.status(400).json({error: "กรุณาให้คะแนนผู้ให้บริการ"})
    }

    await ServicePost.findOne({svp_slug: slug}).then(async (serviceInfo) => {
        const serviceId = serviceInfo._id
        await Review.create({
            customer_id : reviewerId,
            service_id : serviceId,
            rev_description : reviewDesc,
            rev_point : rating
        })

        // เอาการรีวิวทั้งหมด
        await Review.find({service_id: serviceId}).then(async (data) => {
            let totalReviewPoint = 0;
            for (const review of data) {
                totalReviewPoint = totalReviewPoint + review.rev_point
            }
            // หารคะแนนทั้งหมดกับจำนวนคนที่รีวิว
            totalReviewPoint = totalReviewPoint / data.length
            // ปัดทศนิยม
            const roundedTotalReviewPoint = Math.round(totalReviewPoint);
            // แก้ไขคะแนนรีวิวรวม
            await ServicePost.findOneAndUpdate({svp_slug: slug}, {svp_point: roundedTotalReviewPoint}, {new:true})
        }).catch(async(err) => {
            // ถ้ายังไม่มีคนรีวิว
            await ServicePost.findOneAndUpdate({svp_slug: slug}, {svp_point: rating}, {new:true})
        })
        
        return res.status(200).json({message: "รีวิวผู้ให้บริการสำเร็จ"})
    }).catch(() => {
        return res.status(400).json({error : "ไม่พบบริการ"})
    })
}

exports.getAllReview = async (req,res) => {
    const { slug } = req.params

    await ServicePost.findOne({svp_slug: slug}).then(async (serviceInfo) => {
        const serviceId = serviceInfo._id
        await Review.find({service_id: serviceId}).populate('customer_id').then((allReview) => {
            res.status(200).json(allReview)
        })
    }).catch(() => {
        return res.status(400).json({error : "ไม่พบบริการ"})
    })
}
