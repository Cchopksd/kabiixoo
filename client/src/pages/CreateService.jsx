import React ,{useState, useEffect, useContext} from "react";
import "./CreateService.css"
import ImageUploaderCreateService from "../components/ImageUploaderCreateService";
import Footer from "../components/Footer"
import axios from "axios";
import { getToken, getUserId } from "../services/authorize";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserProvider";
import Loading from "../components/Loading";
import AnimatedPage from "../AnimatedPage";

const CreateService = () => {

    // state ของ contextAPI
    const { haveService, setHaveService, dropdownClicked, setDropDownCLicked } = useContext(UserContext);

    // redirect หน้า
    const navigate = useNavigate()

    // state ของ ผู้ที่จะทำการสร้างประกาศ
    const [serviceOwner, setServiceOwner] = useState("")

    // state ของ dropdown ที่อยู่
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [subDistrictList, setSubDistrictList] = useState([])

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // เรียกให้ load ข้อมูล dropdown
    useEffect(() => {
        setDropDownCLicked(false)
        loadData()
    },[])

    // โหลด จังหวัดจาก api
    const loadData = async () => {
        // ดึงข้อมูล id ของผู้ใช้งาน
        try{
            const id = await getUserId()
            setServiceOwner(id.data)
        }catch (error) {
            console.error(error);
        }
        await axios.get(`https://ckartisan.com/api/provinces`)
        .then((res) => {
            setProvinceList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // เมื่อเลือกจังหวัด
    const onChangeProvince = async (event) => {
        setProvinceName(event.target.value)
        await axios.get(`https://ckartisan.com/api/amphoes?province=${event.target.value}`)
        .then((res) => {
            setDistrictList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // เมื่อเลือกเขต
    const onChangeDistrict = async (event) => {
        setStateName(event.target.value)
        await axios.get(`https://ckartisan.com/api/tambons?province=${provinceName}&amphoe=${event.target.value}`)
        .then((res) => {
            setSubDistrictList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // เมื่อเลือกแขวง
    const onChangeSubDistrict = async (event) => {
        setDistrictName(event.target.value)
    }

    // ส่วนข้อมูลที่อยู่และชื่อ
    const [serviceName, setServiceName] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [alleyName, setAlleyName] = useState("");
    const [roadName, setRoadName] = useState("");
    const [provinceName, setProvinceName] = useState("");
    const [stateName, setStateName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [postalCode, setPostalCode] = useState("");

    //ส่วนคำแนะนำตัวและรายละเอียด
    const [introduceDesc,setIntroduceDesc] = useState("");
    const [serviceDesc,setServiceDesc] = useState("");

    //checkbox ของประเภทสัตว์
    const [haveDog, setHaveDog] = useState(false);
    const [haveCat, setHaveCat] = useState(false);
    const [haveRabbit, setHaveRabbit] = useState(false);
    const [haveBird, setHaveBird] = useState(false);
    const [haveRoden, setHaveRoden] = useState(false);
    const [haveReptile, setHaveReptile] = useState(false);

    //checkbox ของบริการเพิ่มเติม
    const [haveGrooming, setHaveGrooming] = useState(false);
    const [havePetWalk, setHavePetWalk] = useState(false);
    const [havePool, setHavePool] = useState(false);
    const [havePetCar, setHavePetCar] = useState(false);
    const [havePetStuff, setHavePetStuff] = useState(false);

    //checkbox ช่องทางการติดต่อ
    const [havePhone, setHavePhone] = useState(false);
    const [haveFacebook, setHaveFacebook] = useState(false);
    const [haveInstagram, setHaveInstagram] = useState(false);
    const [haveLine, setHaveLine] = useState(false);

    //input ช่องทางการติดต่อ
    const [phone, setPhone] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [line, setLine] = useState("");

    //ราคาเริ่มต้นจาก range slider
    const [startPrice, setStartPrice] = useState(100);

    // รูปที่จะส่งไปยัง server
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")

    // เช็คว่าแนบรูปไหม
    const [uploadImg, setUploadImg] = useState(false)

    const submitCreate = async (event) => {
        event.preventDefault();
        setLoading(true)
        // เช็คแนบรูป
        if (images.length > 0){
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const data = new FormData()
                    data.append("file", img.file)
                    data.append("upload_preset", "kabiixoo")
                    data.append("cloud_name", "dmz2wct31")
                    try {
                        const response = await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data);
                        const imageUrl = response.data.url.toString();
                        if (i === 0 && image1 === "") {
                            setImage1(imageUrl);
                        } else if (i === 1 && image2 === "") {
                            setImage2(imageUrl);
                        } else if (i === 2 && image3 === "") {
                            setImage3(imageUrl);
                        } else if (i === 3 && image4 === "") {
                            setImage4(imageUrl);
                        }
                    } catch (error) {
                        setLoading(false)
                        Swal.fire('แจ้งเตือน', error.message, 'error');
                    }
            }
            setUploadImg(true)
        } else {
            // เช็คกรอกข้อมูลครบไหม
            if (!serviceName || !addressNumber || !alleyName || !roadName || !provinceName || !stateName ||
                !districtName || !postalCode || !introduceDesc || !serviceDesc) {
                    setLoading(false)
                    Swal.fire(
                        'แจ้งเตือน',
                        'กรุณากรอกข้อมูลให้ครบ',
                        'error'
                    )
                    return
            }

            // สร้าง Address แบบเต็ม
            const serviceAddress = `${addressNumber} ${alleyName} ${roadName} ${districtName} ${stateName} ${provinceName} ${postalCode}`
            if (serviceAddress) {
                await axios.post(`${process.env.REACT_APP_API}/create-service`,{ serviceOwner, serviceName, serviceAddress, provinceName, districtName, stateName, introduceDesc, 
                    serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
                    haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
                    instagram, line, image1, image2, image3, image4},{
                        headers: {
                            authorization: `Bearer ${getToken()}`
                        }
                    }).then(async (res) => {
                        setLoading(false)
                        await Swal.fire(
                            'แจ้งเตือน',
                            res.data.message,
                            'success'
                        )
                        setServiceName("")
                        setProvinceName("")
                        setDistrictName("")
                        setAddressNumber("")
                        setAlleyName("")
                        setRoadName("")
                        setStateName("")
                        setPostalCode("")
                        setIntroduceDesc("")
                        setServiceDesc("")
                        setStartPrice(100)
                        setHaveGrooming(false)
                        setHavePetStuff(false)
                        setHavePetCar(false)
                        setHavePool(false)
                        setHavePetWalk(false)
                        setHaveDog(false)
                        setHaveCat(false)
                        setHaveBird(false)
                        setHaveRabbit(false)
                        setHaveRoden(false)
                        setHaveReptile(false)
                        setHavePhone(false)
                        setHaveFacebook(false)
                        setHaveInstagram(false)
                        setHaveLine(false)
                        setPhone("")
                        setFacebook("")
                        setInstagram("")
                        setLine("")
                        setImages([])
                        setImage1("")
                        setImage2("")
                        setImage3("")
                        setImage4("")
                        setHaveService(true)
                        navigate(`/provider-home/${serviceOwner}`)
                        setServiceOwner("")
                    }).catch((err) => {
                        setLoading(false)
                        Swal.fire(
                            'แจ้งเตือน',
                            err.response.data.error,
                            'error'
                        )
                    })
            }
        }
    }

    // ทำงานเมื่อกด submit และมีรูปแนบด้วย
    useEffect(() => {
        if(uploadImg) {
            // เช็คกรอกข้อมูลครบไหม
            if (!serviceName || !addressNumber || !alleyName || !roadName || !provinceName || !stateName ||
                !districtName || !postalCode || !introduceDesc || !serviceDesc) {
                    setLoading(false)
                    Swal.fire(
                        'แจ้งเตือน',
                        'กรุณากรอกข้อมูลให้ครบ',
                        'error'
                    )
                    return
            }
            // สร้าง Address แบบเต็ม
            const serviceAddress = `${addressNumber} ${alleyName} ${roadName} ${districtName} ${stateName} ${provinceName} ${postalCode}`
            if (serviceAddress) {
                axios.post(`${process.env.REACT_APP_API}/create-service`,{ serviceOwner, serviceName, serviceAddress, provinceName, districtName, stateName, introduceDesc, 
                    serviceDesc, startPrice, haveGrooming, havePetStuff, havePetCar, havePool, havePetWalk,
                    haveDog, haveCat, haveBird, haveRabbit, haveRoden, haveReptile, phone, facebook,
                    instagram, line, image1, image2, image3, image4},{
                        headers: {
                            authorization: `Bearer ${getToken()}`
                        }
                    }).then(async (res) => {
                        setLoading(false)
                        await Swal.fire(
                            'แจ้งเตือน',
                            res.data.message,
                            'success'
                        )
                        setServiceName("")
                        setProvinceName("")
                        setDistrictName("")
                        setAddressNumber("")
                        setAlleyName("")
                        setRoadName("")
                        setStateName("")
                        setPostalCode("")
                        setIntroduceDesc("")
                        setServiceDesc("")
                        setStartPrice(100)
                        setHaveGrooming(false)
                        setHavePetStuff(false)
                        setHavePetCar(false)
                        setHavePool(false)
                        setHavePetWalk(false)
                        setHaveDog(false)
                        setHaveCat(false)
                        setHaveBird(false)
                        setHaveRabbit(false)
                        setHaveRoden(false)
                        setHaveReptile(false)
                        setHavePhone(false)
                        setHaveFacebook(false)
                        setHaveInstagram(false)
                        setHaveLine(false)
                        setPhone("")
                        setFacebook("")
                        setInstagram("")
                        setLine("")
                        setImages([])
                        setImage1("")
                        setImage2("")
                        setImage3("")
                        setImage4("")
                        setHaveService(true)
                        navigate(`/provider-home/${serviceOwner}`)
                        setServiceOwner("")
                    }).catch((err) => {
                        setLoading(false)
                        Swal.fire(
                            'แจ้งเตือน',
                            err.response.data.error,
                            'error'
                        )
                    })
            }
        }
    },[uploadImg])

    //  state เก็บชุดรูปที่มาจาก child
    const [images, setImages] = useState([])

    const handleDataFromChild = (data) => {
        setImages(data)
    }

    // เช็ค state จาก child component
    useEffect(() => {
        console.log(images); 
    }, [images]);

    return (
        <AnimatedPage>
            { loading && <Loading/>}
            <div className="createService-container">
                <label className="createService-header">สร้างประกาศการให้บริการ</label>
                <div className="create-part-1">
                    <div className="createServiceImg-display">
                        <img className="createServiceImg" src={require("../images/createServicePage/createServicePhoto.png")}/>
                    </div>
                    <div className="create-info-1-box">
                        <div className="createService-name-box">
                            <label className="createService-title-1">ชื่อผู้ให้บริการ *</label>
                            <input className="input-createService-name" type="text" value={serviceName} onChange={(event) => setServiceName(event.target.value)}
                            placeholder="กรอก ชื่อผู้ให้บริการ"/>
                        </div>
                        <div className="createService-address">
                            <label className="createService-title-1">ที่อยู่ของผู้ให้บริการหรือกิจการ *</label>
                            <div className="createService-item">
                                <div className="createService-item-box">
                                    <label className="createService-title-2">เลขที่ *</label>
                                    <input className="input-createService-address-1" type="text" value={addressNumber} onChange={(event) => setAddressNumber(event.target.value)}
                                    placeholder="กรอก เลขที่"/>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">ซอย *</label>
                                    <input className="input-createService-address-1" type="text" value={alleyName} onChange={(event) => setAlleyName(event.target.value)}
                                    placeholder="กรอก ชื่อซอย"/>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">ถนน *</label>
                                    <input className="input-createService-address-1 input-createService-end" type="text" value={roadName} onChange={(event) => setRoadName(event.target.value)}
                                    placeholder="กรอก ชื่อถนน"/>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">จังหวัด *</label>
                                    <select className="input-createService-address-2" onChange={onChangeProvince}>
                                        <option value="" disabled selected>เลือกจังหวัด</option>
                                        { provinceList.map((item, index) =>
                                            <option key={index} value={item.province}>{item.province}</option>)}
                                    </select>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">เขต/อำเภอ *</label>
                                    <select className="input-createService-address-2" onChange={onChangeDistrict}>
                                        <option value="" disabled selected>เลือกอำเภอ</option>
                                        { districtList.map((item, index) =>
                                            <option key={index} value={item.amphoe}>{item.amphoe}</option>)}
                                    </select>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">แขวง/ตำบล *</label>
                                    <select className="input-createService-address-2 input-createService-end" onChange={onChangeSubDistrict}>
                                        <option value="" disabled selected>เลือกตำบล</option>
                                        { subDistrictList.map((item, index) =>
                                            <option key={index} value={item.tambon}>{item.tambon}</option>)}
                                    </select>
                                </div>
                                <div className="createService-item-box">
                                    <label className="createService-title-2">รหัสไปรษณีย์ *</label>
                                    <input className="input-createService-address-1" type="text" value={postalCode} onChange={(event) => setPostalCode(event.target.value)}
                                    placeholder="กรอก รหัส"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-part-2">
                    <div className="create-info-2-box">
                        <label className="createService-title-1">คำแนะนำตัว *</label>
                        <textarea className="input-createService-introduce" value={introduceDesc} onChange={(event) => setIntroduceDesc(event.target.value)}
                        placeholder="กรอก คำแนะนำตัว"></textarea>
                    </div>
                    <div className="create-info-3-box">
                        <label className="createService-title-1">รายละเอียดการให้บริการ *</label>
                        <textarea className="input-createService-service" value={serviceDesc} onChange={(event) => setServiceDesc(event.target.value)}
                        placeholder="กรอก รายละเอียดการให้บริการ"></textarea>
                    </div>
                </div>
                <div className="create-part-3">
                    <div className="create-info-4-box">
                        <div className="createService-pet-box">
                            <label className="createService-title-1">ประเภทสัตว์เลี้ยงที่รับฝาก</label>
                            <div className="createService-pet-checkbox-item">
                                <div className={!haveDog ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}
                                    onClick={()=> setHaveDog(!haveDog)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveDog} onChange={()=> setHaveDog(!haveDog)}/>&emsp;สุนัข
                                    <img className="createService-pet-type-icon-1" src={require("../images/createServicePage/dogIcon.png")}/>
                                </div>
                                <div className={!haveCat ? "createService-pet-checkbox-box-2" : "createService-pet-checkbox-box-2-checked"}
                                    onClick={()=> setHaveCat(!haveCat)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveCat} onChange={()=> setHaveCat(!haveCat)}/>&emsp;แมว
                                    <img className="createService-pet-type-icon-2" src={require("../images/createServicePage/catIcon.png")}/>
                                </div>
                                <div className={!haveRabbit ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}
                                    onClick={()=> setHaveRabbit(!haveRabbit)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveRabbit} onChange={()=> setHaveRabbit(!haveRabbit)}/>&emsp;กระต่าย
                                    <img className="createService-pet-type-icon-3" src={require("../images/createServicePage/rabbitIcon.png")}/>
                                </div>
                                <div className={!haveBird ? "createService-pet-checkbox-box-2" : "createService-pet-checkbox-box-2-checked"}
                                    onClick={()=> setHaveBird(!haveBird)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveBird} onChange={()=> setHaveBird(!haveBird)}/>&emsp;นก
                                    <img className="createService-pet-type-icon-4" src={require("../images/createServicePage/birdIcon.png")}/>
                                </div>
                                <div className={!haveRoden ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}
                                    onClick={()=> setHaveRoden(!haveRoden)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveRoden} onChange={()=> setHaveRoden(!haveRoden)}/>&emsp;สัตว์ฟันแทะ
                                    <img className="createService-pet-type-icon-5" src={require("../images/createServicePage/rodenIcon.png")}/>
                                </div>
                                <div className={!haveReptile ? "createService-pet-checkbox-box-2 createService-checkbox-endline" : "createService-pet-checkbox-box-2-checked createService-checkbox-endline"}
                                    onClick={()=> setHaveReptile(!haveReptile)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveReptile} onChange={()=> setHaveReptile(!haveReptile)}/>&emsp;สัตว์เลื้อยคลาน
                                    <img className="createService-pet-type-icon-6" src={require("../images/createServicePage/reptileIcon.png")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-info-5-box">
                        <div className="createService-moreService-box">
                            <label className="createService-title-1">บริการเพิ่มเติม</label>
                            <div className="createService-pet-checkbox-item">
                                <div className={!haveGrooming ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize"}
                                    onClick={()=> setHaveGrooming(!haveGrooming)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={haveGrooming} onChange={()=> setHaveGrooming(!haveGrooming)}/>&emsp;บริการกรูมมิ่ง(อาบน้ำตัดขน)
                                </div>
                                <div className={!havePetWalk ? "createService-pet-checkbox-box-2 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-2-checked createService-checkbox-small-fontSize"}
                                    onClick={()=> setHavePetWalk(!havePetWalk)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={havePetWalk} onChange={()=> setHavePetWalk(!havePetWalk)}/>&emsp;พาสัตว์เลี้ยงเดินเล่น
                                </div>
                                <div className={!havePool ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize"}
                                    onClick={()=> setHavePool(!havePool)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={havePool} onChange={()=> setHavePool(!havePool)}/>&emsp;สระว่ายน้ำสัตว์เลี้ยง
                                </div>
                                <div className={!havePetCar ? "createService-pet-checkbox-box-2 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-2-checked createService-checkbox-small-fontSize"}
                                    onClick={()=> setHavePetCar(!havePetCar)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={havePetCar} onChange={()=> setHavePetCar(!havePetCar)}/>&emsp;รถรับส่งสัตว์เลี้ยง
                                </div>
                                <div className={!havePetStuff ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize createService-checkbox-endline" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize createService-checkbox-endline"}
                                    onClick={()=> setHavePetStuff(!havePetStuff)}>
                                    <input className="createService-checkbox-style" type="checkbox" checked={havePetStuff} onChange={()=> setHavePetStuff(!havePetStuff)}/>&emsp;อาหารและของใช้เกี่ยวกับสัตว์
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-part-4">
                    <div className="create-info-6-box">
                        <div className="createService-contact-box">
                            <label className="createService-title-1">ช่องทางการติดต่อ</label>
                            <div className="createService-pet-checkbox-item">
                                <div className={!havePhone ? "createService-contact-checkbox-box-1" : "createService-contact-checkbox-box-1-checked"}>
                                    <input type="checkbox" checked={havePhone} onChange={()=> {setHavePhone(!havePhone)
                                    setPhone("")}}/>เบอร์โทรศัพท์
                                    <img className="createService-contact-type-icon" src={require("../images/createServicePage/phoneIcon.png")}/>
                                    <input disabled={!havePhone} className="createService-contact-input" type="text" value={phone} onChange={(event) => setPhone(event.target.value)}
                                    placeholder="กรอก เบอร์โทรศัพท์"/>
                                </div>
                                <div className={!haveFacebook ? "createService-contact-checkbox-box-2" : "createService-contact-checkbox-box-2-checked"}>
                                    <input type="checkbox" checked={haveFacebook} onChange={()=> {setHaveFacebook(!haveFacebook)
                                    setFacebook("")}}/>Facebook
                                    <img className="createService-contact-type-icon" src={require("../images/createServicePage/facebookIcon.png")}/>
                                    <input disabled={!haveFacebook} className="createService-contact-input" type="text" value={facebook} onChange={(event) => setFacebook(event.target.value)}
                                    placeholder="กรอกชื่อ Facebook"/>
                                </div>
                                <div className={!haveInstagram ? "createService-contact-checkbox-box-1 createService-contact-endline" : "createService-contact-checkbox-box-1-checked createService-contact-endline"}>
                                    <input type="checkbox" checked={haveInstagram} onChange={()=> {setHaveInstagram(!haveInstagram)
                                    setInstagram("")}}/>Instagram
                                    <img className="createService-contact-type-icon" src={require("../images/createServicePage/instagramIcon.png")}/>
                                    <input disabled={!haveInstagram} className="createService-contact-input" type="text" value={instagram} onChange={(event) => setInstagram(event.target.value)}
                                    placeholder="กรอกชื่อ Instagram"/>
                                </div>
                                <div className={!haveLine ? "createService-contact-checkbox-box-2 createService-contact-endline" : "createService-contact-checkbox-box-2-checked createService-contact-endline"}>
                                    <input type="checkbox" checked={haveLine} onChange={()=> {setHaveLine(!haveLine)
                                    setLine("")}}/>Line
                                    <img className="createService-contact-type-icon" src={require("../images/createServicePage/lineIcon.png")}/>
                                    <input disabled={!haveLine} className="createService-contact-input" type="text" value={line} onChange={(event) => setLine(event.target.value)}
                                    placeholder="กรอกไอดี Line"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-info-7-box">
                        <div className="createService-startPrice-box">
                            <label className="createService-title-1">ราคาการให้บริการเริ่มต้น</label>
                            <div className="createService-startPrice-display-box">
                                <img className="thai-baht-icon" src={require("../images/createServicePage/thaiBahtIcon.png")}/>
                                <div className="createService-start-price-label-box">
                                    <label className="createService-start-price-label">{startPrice}</label>
                                </div>
                                <label className="createService-start-price-label">บาท</label>
                            </div>
                            <div className="createService-range-slider-box">
                                <input className="createService-range-slider" type="range" min={0} max={2000} step={1} value={startPrice} onChange={(event) => setStartPrice(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-part-5">
                    <div className="create-info-8-box">
                        <label className="createService-title-1">รูปภาพผู้ให้บริการและกิจการ</label>
                        <ImageUploaderCreateService onDataSend={handleDataFromChild}/>
                    </div>
                </div>
                <button className="createService-btn" onClick={submitCreate}>สร้างประกาศการให้บริการ</button>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}

export default CreateService;