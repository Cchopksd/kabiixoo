import React , {useState}from "react";
import "./EditProfile.css"
import Editbar from "../components/Editbar";

const EditProfile = () => {

    const [name,setName] = useState("สมหมาย");
    const [surName,setSurName] = useState("ภักดี");
    const [phoneNumber,setPhoneNumber] = useState("0948653332");
    const [birthDate,setBirthDate] = useState("08/12/2544");

    return(
        <div className="edit-container">
            <Editbar />
            <div className="edit-frame">
                <div className="change-imageProfile-box">
                    <img className="edit-profileImage" src={require("../images/dummy_profileImage.png")}/>
                    <button className="choosePhoto-btn">เลือกรูป</button>
                    <div className="max-edit-box">
                        <label className="max-edit-photosize">ขนาดไฟล์ : สูงสุด 5 MB</label>
                        <label className="max-edit-photosize">ไฟล์ที่รองรับ : .JPEG, .PNG</label>
                    </div>
                </div>
                <div className="change-information-box">
                    <div className="edit-name-box">
                        <label className="info-title">ชื่อ</label>
                        <input className="input-edit-info" type="text" value={name} onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="edit-surname-box">
                        <label className="info-title">นามสกุล</label>
                        <input className="input-edit-info" type="text" value={surName} onChange={event => setSurName(event.target.value)}/>
                    </div>
                    <div className="edit-phoneNumber-box">
                        <label className="info-title">เบอร์โทรศัพท์</label>
                        <input className="input-edit-info" type="text" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>
                    </div>
                    <div className="edit-birthDate-box">
                        <label className="info-title">วัน/เดือน/ปี เกิด</label>
                        <input className="input-edit-info" type="text" value={birthDate} onChange={event => setBirthDate(event.target.value)}/>
                    </div>
                </div>
                <div className="updateInfo-btn-box">
                    <button className="confirm-updateInfo-btn">แก้ไข</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;