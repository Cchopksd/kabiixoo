import React, { useState } from "react";
import "./ConfirmBusiness.css"
import ImageUploader from "../components/ImageUploader";

const ConfirmBusiness = () => {

    const [businessName, setBusinessName] = useState("รับฝากน้องแมวทุกสายพันธ์ By Ally")
    const [businessDesc, setBusinessDesc] = useState("")

    return (
        <div className="confirm-container">
            <label className="comfirm-title">แบบฟอร์มยืนยันการมีหน้าร้านและกิจการ</label>
            <div className="comfirm-form-box">
                <img className="comfirm-logo" src={require("../images/logo3.png")} alt="" />
                <div className="businessName-box">
                    <label className="confirm-info-title">ชื่อกิจการ</label>
                    <input className="input-businessName" type="text" value={businessName} onChange={(event)=>setBusinessName(event.target.value)}/>
                </div>
                <div className="businessDesc-box">
                    <label className="confirm-info-title">รายละเอียด</label>
                    <textarea className="input-businessDesc" type="text" value={businessDesc} onChange={(event)=>setBusinessName(event.target.value)}/>
                </div>
                <div className="businessStorePic-box">
                    <label className="confirm-info-title storePic">รูปถ่ายหน้าร้านหรือกิจการ</label>
                    <ImageUploader/>
                </div>
                <div className="businessLicensePic-box">
                    <label className="confirm-info-title license">ใบอนุญาติการค้าหรือใบอนุญาติกิจการเกี่ยวกับสัตว์</label>
                    <ImageUploader/>
                </div>
                <button className="comfirm-business-btn">ส่งแบบฟอร์ม</button>
            </div>
        </div>
    );
}

export default ConfirmBusiness;