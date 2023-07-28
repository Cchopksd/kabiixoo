const ServicePost = require('../models/servicePostModel')
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');

// สร้างประกาศ
exports.createService = async (req,res) => {
    // destructuring
    const { serviceOwner, serviceName, serviceAddress, provinceName, districtName, introduceDesc, 
        serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
        haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
        instagram, line, image1, image2, image3, image4 } = req.body
    
    // สร้าง slug
    let slug = slugify(serviceName)
    // เช็คถ้า slug เป็นภาษาไทย หรือค่าว่าง
    if (!slug) {
        slug = uuidv4();
    }

    // เช็คว่า member มีประกาศการให้บริการรึยัง
    const idExists = await ServicePost.findOne({ svp_owner : serviceOwner})
    if (idExists){
        return res.status(400).json({error: "ผู้ใช้งานมีประกาศการให้บริการแล้ว"})
    }

    if (image1 === "") {
        await ServicePost.create({
            svp_owner: serviceOwner,
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_slug: slug
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image2 === ""){
        await ServicePost.create({
            svp_owner: serviceOwner,
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_slug: slug
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image3 === ""){
        await ServicePost.create({
            svp_owner: serviceOwner,
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_slug: slug
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image4 === "") {
        await ServicePost.create({
            svp_owner: serviceOwner,
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_img3: image3,
            svp_slug: slug
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else {
        await ServicePost.create({
            svp_owner: serviceOwner,
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_img3: image3,
            svp_img4: image4,
            svp_slug: slug
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
}

// ตรวจสอบว่า มี service
exports.checkHaveService = async (req,res) => {
    // id ของผู้ที่ login
    const { userId } = req.body
    await ServicePost.findOne({svp_owner: userId}).then((result) => {
        if (result) {
            res.status(200).json({status: true})
        } else {
            res.status(200).json({status: false})
        }
    }).catch((result) => {
        console.log(result)
        res.status(404).json({status: false})
    })
}

// เอา slug ของ service
exports.getServiceSlug = async (req,res) => {
    const { providerId } = req.body
    await ServicePost.findOne({svp_owner: providerId}).then((providerInfo) => {
        res.status(200).json(providerInfo.svp_slug)
    }).catch((err) => {
        res.status(400).json({error: err})
    })
}

// เอาข้อมูล service
exports.getService = async (req,res) => {
    // url parameter
    const { slug } = req.params
    await ServicePost.findOne({svp_slug: slug},).populate('svp_owner').then((serviceInfo) => {
        console.log(serviceInfo)
        res.status(200).json(serviceInfo)
    }).catch((err) => {
        res.status(400).json({error: "ไม่พบบริการ"})
    })
    
}

// อัพเดท service
exports.updateService = async (req,res) => {
    // url path ของ ชื่อประกาศการให้บริการ
    const { slug } = req.params
    // destructuring
    const { serviceName, serviceAddress, provinceName, districtName, introduceDesc, 
        serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
        haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
        instagram, line, image1, image2, image3, image4 } = req.body

    if (image1 === "") {
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: "",
            svp_img2: "",
            svp_img3: "",
            svp_img4: "",
        }, {new:true}).then((service) => {
            res.status(200).json({message: "แก้ไขประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image2 === ""){
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: "",
            svp_img3: "",
            svp_img4: "",
        }, {new:true}).then((service) => {
            res.status(200).json({message: "แก้ไขประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image3 === ""){
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_img3: "",
            svp_img4: "",
        }, {new:true}).then((service) => {
            res.status(200).json({message: "แก้ไขประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else if (image4 === "") {
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_img3: image3,
            svp_img4: "",
        }, {new:true}).then((service) => {
            res.status(200).json({message: "แก้ไขประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }else {
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_introduce: introduceDesc,
            svp_description: serviceDesc,
            svp_startPrice: startPrice,
            svp_grooming: haveGrooming,
            svp_petStuff: havePetStuff,
            svp_carService: havePetCar,
            svp_pool: havePool,
            svp_petWalk: havePetWalk,
            svp_haveDog: haveDog,
            svp_haveCat: haveCat,
            svp_haveBird: haveBird,
            svp_haveRabbit: haveRabbit,
            svp_haveRodent: haveRoden,
            svp_haveReptile: haveReptile,
            svp_havePhone: phone,
            svp_facebook: facebook,
            svp_instagram: instagram,
            svp_line: line,
            svp_img1: image1,
            svp_img2: image2,
            svp_img3: image3,
            svp_img4: image4,
            svp_slug: slug
        }, {new:true}).then((service) => {
            res.status(200).json({message: "แก้ไขประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
}

// ลบ service
exports.deleteService = async (req,res) => {
    // url path ของ ชื่อประกาศการให้บริการ
    const { slug } = req.params
    await ServicePost.findOneAndRemove({svp_slug: slug}).then(()=> {
        res.status(200).json({message: "ลบประกาศการให้บริการสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({error: err})
    })

}