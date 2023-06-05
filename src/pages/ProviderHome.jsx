import React from "react";
import "./ProviderHome.css"

const ProviderHome = () => {
    return (
        <div className="providerHome-container">
            <div className="editService-link-box" role="button">
                <img className="providerHome-btn-img" src={require("../images/providerHomePage/editIcon.png")} />
                <label className="providerHome-btn-desc">แก้ไขประกาศการให้บริการ</label>
            </div>
            <div className="confirmBusiness-link-box">
                <img className="providerHome-btn-img" src={require("../images/providerHomePage/confirmIcon.png")} />
                <label className="providerHome-btn-desc margin-confirm">ยืนยันการมีหน้าร้านหรือกิจการ</label>
            </div>
        </div>
    );
}

export default ProviderHome;