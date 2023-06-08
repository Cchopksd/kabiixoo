import React ,{useState} from "react";
import "./CreateService.css"
import Select from 'react-select'
import ImageUploaderCreateService from "../components/ImageUploaderCreateService";

const CreateService = () => {

    // ส่วนข้อมูลที่อยู่และชื่อ
    const [serviceName, setServiceName] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [alleyName, setAlleyName] = useState("");
    const [roadName, setRoadName] = useState("");
    const [provinceName, setProvinceName] = useState({});
    const [stateName, setStateName] = useState({});
    const [districtName, setDistrictName] = useState({});
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

    return (
        <div className="createService-container">
            <label className="createService-header">สร้างประกาศการให้บริการ</label>
            <div className="create-part-1">
                <div className="createServiceImg-display">
                    <img className="createServiceImg" src={require("../images/createServicePage/createServicePhoto.png")}/>
                </div>
                <div className="create-info-1-box">
                    <div className="createService-name-box">
                        <label className="createService-title-1">ชื่อผู้ให้บริการ</label>
                        <input className="input-createService-name" type="text" value={serviceName} onChange={(event) => setServiceName(event.target.value)}/>
                    </div>
                    <div className="createService-address">
                        <label className="createService-title-1">ที่อยู่ของผู้ให้บริการหรือกิจการ</label>
                        <div className="createService-item">
                            <div className="createService-item-box">
                                <label className="createService-title-2">เลขที่</label>
                                <input className="input-createService-address-1" type="text" value={addressNumber} onChange={(event) => setAddressNumber(event.target.value)}/>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">ซอย</label>
                                <input className="input-createService-address-1" type="text" value={alleyName} onChange={(event) => setAlleyName(event.target.value)}/>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">ถนน</label>
                                <input className="input-createService-address-1 input-createService-end" type="text" value={roadName} onChange={(event) => setRoadName(event.target.value)}/>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">จังหวัด</label>
                                <Select className="input-createService-address-2" options={provinceName}></Select>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">เขต/อำเภอ</label>
                                <Select className="input-createService-address-2" options={stateName}></Select>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">แขวง/ตำบล</label>
                                <Select className="input-createService-address-2 input-createService-end" options={districtName}></Select>
                            </div>
                            <div className="createService-item-box">
                                <label className="createService-title-2">รหัสไปรษณีย์</label>
                                <input className="input-createService-address-1" type="text" value={postalCode} onChange={(event) => setPostalCode(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-part-2">
                <div className="create-info-2-box">
                    <label className="createService-title-1">คำแนะนำตัว</label>
                    <textarea className="input-createService-introduce" value={introduceDesc} onChange={(event) => setIntroduceDesc(event.target.value)}></textarea>
                </div>
                <div className="create-info-3-box">
                    <label className="createService-title-1">รายละเอียดการให้บริการ</label>
                    <textarea className="input-createService-service" value={serviceDesc} onChange={(event) => setServiceDesc(event.target.value)}></textarea>
                </div>
            </div>
            <div className="create-part-3">
                <div className="create-info-4-box">
                    <div className="createService-pet-box">
                        <label className="createService-title-1">ประเภทสัตว์เลี้ยงที่รับฝาก</label>
                        <div className="createService-pet-checkbox-item">
                            <div className={!haveDog ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveDog} onChange={()=> setHaveDog(!haveDog)}/>&emsp;สุนัข
                                <img className="createService-pet-type-icon-1" src={require("../images/createServicePage/dogIcon.png")}/>
                            </div>
                            <div className={!haveCat ? "createService-pet-checkbox-box-2" : "createService-pet-checkbox-box-2-checked"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveCat} onChange={()=> setHaveCat(!haveCat)}/>&emsp;แมว
                                <img className="createService-pet-type-icon-2" src={require("../images/createServicePage/catIcon.png")}/>
                            </div>
                            <div className={!haveRabbit ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveRabbit} onChange={()=> setHaveRabbit(!haveRabbit)}/>&emsp;กระต่าย
                                <img className="createService-pet-type-icon-3" src={require("../images/createServicePage/rabbitIcon.png")}/>
                            </div>
                            <div className={!haveBird ? "createService-pet-checkbox-box-2" : "createService-pet-checkbox-box-2-checked"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveBird} onChange={()=> setHaveBird(!haveBird)}/>&emsp;นก
                                <img className="createService-pet-type-icon-4" src={require("../images/createServicePage/birdIcon.png")}/>
                            </div>
                            <div className={!haveRoden ? "createService-pet-checkbox-box-1" : "createService-pet-checkbox-box-1-checked"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveRoden} onChange={()=> setHaveRoden(!haveRoden)}/>&emsp;สัตว์ฟันแทะ
                                <img className="createService-pet-type-icon-5" src={require("../images/createServicePage/rodenIcon.png")}/>
                            </div>
                            <div className={!haveReptile ? "createService-pet-checkbox-box-2 createService-checkbox-endline" : "createService-pet-checkbox-box-2-checked createService-checkbox-endline"}>
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
                            <div className={!haveGrooming ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={haveGrooming} onChange={()=> setHaveGrooming(!haveGrooming)}/>&emsp;บริการกรูมมิ่ง(อาบน้ำตัดขน)
                            </div>
                            <div className={!havePetWalk ? "createService-pet-checkbox-box-2 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-2-checked createService-checkbox-small-fontSize"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={havePetWalk} onChange={()=> setHavePetWalk(!havePetWalk)}/>&emsp;พาสัตว์เลี้ยงเดินเล่น
                            </div>
                            <div className={!havePool ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={havePool} onChange={()=> setHavePool(!havePool)}/>&emsp;สระว่ายน้ำสัตว์เลี้ยง
                            </div>
                            <div className={!havePetCar ? "createService-pet-checkbox-box-2 createService-checkbox-small-fontSize" : "createService-pet-checkbox-box-2-checked createService-checkbox-small-fontSize"}>
                                <input className="createService-checkbox-style" type="checkbox" checked={havePetCar} onChange={()=> setHavePetCar(!havePetCar)}/>&emsp;รถรับส่งสัตว์เลี้ยง
                            </div>
                            <div className={!havePetStuff ? "createService-pet-checkbox-box-1 createService-checkbox-small-fontSize createService-checkbox-endline" : "createService-pet-checkbox-box-1-checked createService-checkbox-small-fontSize createService-checkbox-endline"}>
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
                                <input type="checkbox" checked={havePhone} onChange={()=> setHavePhone(!havePhone)}/>เบอร์โทรศัพท์
                                <img className="createService-contact-type-icon" src={require("../images/createServicePage/phoneIcon.png")}/>
                                <input disabled={!havePhone} className="createService-contact-input" type="text" value={phone} onChange={(event) => setPhone(event.target.value)}/>
                            </div>
                            <div className={!haveFacebook ? "createService-contact-checkbox-box-2" : "createService-contact-checkbox-box-2-checked"}>
                                <input type="checkbox" checked={haveFacebook} onChange={()=> setHaveFacebook(!haveFacebook)}/>Facebook
                                <img className="createService-contact-type-icon" src={require("../images/createServicePage/facebookIcon.png")}/>
                                <input disabled={!haveFacebook} className="createService-contact-input" type="text" value={facebook} onChange={(event) => setFacebook(event.target.value)}/>
                            </div>
                            <div className={!haveInstagram ? "createService-contact-checkbox-box-1 createService-contact-endline" : "createService-contact-checkbox-box-1-checked createService-contact-endline"}>
                                <input type="checkbox" checked={haveInstagram} onChange={()=> setHaveInstagram(!haveInstagram)}/>Instagram
                                <img className="createService-contact-type-icon" src={require("../images/createServicePage/instagramIcon.png")}/>
                                <input disabled={!haveInstagram} className="createService-contact-input" type="text" value={instagram} onChange={(event) => setInstagram(event.target.value)}/>
                            </div>
                            <div className={!haveLine ? "createService-contact-checkbox-box-2 createService-contact-endline" : "createService-contact-checkbox-box-2-checked createService-contact-endline"}>
                                <input type="checkbox" checked={haveLine} onChange={()=> setHaveLine(!haveLine)}/>Line
                                <img className="createService-contact-type-icon" src={require("../images/createServicePage/lineIcon.png")}/>
                                <input disabled={!haveLine} className="createService-contact-input" type="text" value={line} onChange={(event) => setLine(event.target.value)}/>
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
                    <ImageUploaderCreateService/>
                </div>
            </div>
            <button className="createService-btn">สร้างประกาศการให้บริการ</button>
        </div>
    );
}

export default CreateService;