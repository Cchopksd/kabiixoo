const ServicePost = require('../models/servicePostModel')
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');

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
            svp_line: line
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
            svp_img1: image1
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
            svp_img2: image2
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
            svp_img3: image3
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
            svp_img4: image4
        }).then((service) => {
            res.status(200).json({message: "สร้างประกาศการให้บริการสำเร็จ"})
        }).catch((err) => {
            res.status(400).json({error: err})
        })
    }
}