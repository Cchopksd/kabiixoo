const ServicePost = require('../models/servicePostModel')
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');
const Review = require('../models/reviewModel')
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

// สร้างประกาศ
exports.createService = async (req,res) => {
    // destructuring
    const { serviceOwner, serviceName, serviceAddress, provinceName, districtName, stateName, introduceDesc, 
        serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
        haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
        instagram, line, image1, image2, image3, image4 } = req.body
    
    // สร้าง slug
    // let slug = slugify(serviceName)
    let slug = uuidv4();
    // เช็คถ้า slug เป็นภาษาไทย หรือค่าว่าง
    // if (!slug) {
    //     slug = uuidv4();
    // }

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
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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

// เอาข้อมูล service 1 อัน เพื่อไปแก้ไข
exports.getService = async (req,res) => {
    // url parameter
    const { slug } = req.params
    await ServicePost.findOne({svp_slug: slug},).populate('svp_owner').then((serviceInfo) => {
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
    const { serviceName, serviceAddress, provinceName, districtName, stateName, introduceDesc, 
        serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
        haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
        instagram, line, image1, image2, image3, image4 } = req.body

    if (image1 === "") {
        await ServicePost.findOneAndUpdate({svp_slug: slug},{
            svp_name: serviceName,
            svp_address: serviceAddress,
            svp_province: provinceName,
            svp_district: districtName,
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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
            svp_state: stateName,
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

    await ServicePost.findOne({svp_slug: slug}).populate('svp_owner').then(async (serviceInfo) => {
        await Chat.deleteMany({ users : serviceInfo.svp_owner._id })
        await Review.deleteMany({ service_id : serviceInfo._id })
    })

    await ServicePost.findOneAndRemove({svp_slug: slug}).then(()=> {
        res.status(200).json({message: "ลบประกาศการให้บริการสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({error: err})
    })
}

// เอาข้อมูล service ตามที่ search
exports.getAllServices = async (req,res) => {
    const keyword = req.query.search ? {
        $or: [
            { svp_name: { $regex: req.query.search, $options: "i" } },
            { svp_district: { $regex: req.query.search, $options: "i" } },
            { svp_state: { $regex: req.query.search, $options: "i" } }
        ],
    } : {}

    if (keyword) {
        const services = await ServicePost.find(keyword)
        res.status(200).json(services)
    }
    else {
        const services = await ServicePost.find()
        res.status(200).json(services)
    }
}

// เอาข้อมูล service ตาม filter ที่กรอก
exports.getAllServicesByFilter =  async (req,res) => {

    // destructuring
    const { dog, cat, bird, rodent, reptile, rabbit, 
        grooming, swimming, consume, walk, transport, store,
        point, price, chooseProvince, searchKeyword } = req.body

    // ถ้ามี keyword การค้นหา
    const keyword = searchKeyword ? {
        $or: [
            { svp_name: { $regex: searchKeyword, $options: "i" } },
            { svp_district: { $regex: searchKeyword, $options: "i" } },
            { svp_state: { $regex: searchKeyword, $options: "i" } }
        ],
    } : {}
    
    // รวม filter
    let filters = {};
    // รวมเงื่อนไข filter ของ สัตว์และบริการ
    let filtersArray = [];
    // รวมเงื่อนไข filter สัตว์
    let petFilters = [];
    // รวมเงื่อนไข filter บริการเพิ่มเติม
    let additionalServicesFilters = [];
    
    // เพิ่ม filter pet
    // if (dog) filters.svp_haveDog = true;
    // if (cat) filters.svp_haveCat = true;
    // if (bird) filters.svp_haveBird = true;
    // if (rodent) filters.svp_haveRodent = true;
    // if (reptile) filters.svp_haveReptile = true;
    // if (rabbit) filters.svp_haveRabbit = true;
    if (dog) petFilters.push({ svp_haveDog: true });
    if (cat) petFilters.push({ svp_haveCat: true });
    if (bird) petFilters.push({ svp_haveBird: true });
    if (rodent) petFilters.push({ svp_haveRodent: true });
    if (reptile) petFilters.push({ svp_haveReptile: true });
    if (rabbit) petFilters.push({ svp_haveRabbit: true });

    // เอาฟีลเตอร์สัตว์เข้า filter สัตว์และบริการถ้ามีสัตว์
    if (petFilters.length > 0) {
        filtersArray.push({ $or: petFilters });
    }

    // เพิ่ม filter บริการเพิ่มเติม
    // if (grooming) filters.svp_Grooming = true;
    // if (swimming) filters.svp_pool = true;
    // if (consume) filters.svp_petStuff = true;
    // if (walk) filters.svp_petWalk = true;
    // if (transport) filters.svp_carService = true;
    if (grooming) additionalServicesFilters.push({ svp_grooming: true });
    if (swimming) additionalServicesFilters.push({ svp_pool: true });
    if (consume) additionalServicesFilters.push({ svp_petStuff: true });
    if (walk) additionalServicesFilters.push({ svp_petWalk: true });
    if (transport) additionalServicesFilters.push({ svp_carService: true });

    // เอา ฟีลเตอร์บริการเข้า filter สัตว์และบริการถ้ามีบริการ
    if (additionalServicesFilters.length > 0) {
        filtersArray.push({ $or: additionalServicesFilters });
    }
    
    // รวม filters ของสัตว์และบริการเข้า filters หลักถ้ามีสัตว์และบริการ
    if (filtersArray.length > 0) {
        filters.$and = filtersArray;
    }

    // มีหน้าร้านไหม
    if (store) filters.svp_verified = true;

    // จังหวัดอะไร
    if (chooseProvince) filters.svp_province = chooseProvince;

    // ราคาช่วงไหน
    if (price === "lowPrice") {
        filters.svp_startPrice = { $lt: 500 }
    }
    else if (price === "fiveToTenPrice") {
        filters.svp_startPrice = { $gte: 500, $lte: 999 }
    }
    else if (price === "tenToFifteenPrice") {
        filters.svp_startPrice = { $gte: 1000, $lte: 1499 }
    }
    else if (price === "fifteenToTwentyPrice") {
        filters.svp_startPrice = { $gte: 1500, $lte: 1999 }
    }
    else if (price === "topPrice") {
        filters.svp_startPrice = { $gte: 2000 }
    }
    
    try {
        // ถ้ามี keyword ด้วย
        if (keyword) {
            // spread
            filters = { ...filters, ...keyword };
            console.log(filters)
        }
        const filtersService = await ServicePost.find(filters)
        // sort คะแนน
        if (point === "topPoint") {
            // มากไปน้อย
            filtersService.sort((a, b) => b.svp_point - a.svp_point)
        } else if (point === "lowPoint") {
            // น้อยไปมาก
            filtersService.sort((a, b) => a.svp_point - b.svp_point)
        }

        res.json(filtersService)
    }catch (error) {
        res.status(404).json({error : "ไม่พบผู้ให้บริการ"})
    }
}