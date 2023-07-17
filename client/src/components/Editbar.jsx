import React , {useState}from "react";
import "./Editbar.css";

const Editbar = () => {

    const [userName, setUserName]=  useState("Sommai123");

    return(
        <div className="editbar-container">
            <div className="member-display">
                <img className="image-edit-display" src={require("../images/dummy_profileImage.png")}/>
                <label className="username-edit-display">{userName}</label>
            </div>
            <div className="edit-menu">
                <ul className="menu-style">
                    <div className="profile-style">
                        <img className="image-menu-display" src={require("../images/editBar/user.png")}/>
                        <li className="profile-title">บัญชีผู้ใช้งาน</li>
                    </div>
                    <li className="edit-info">ข้อมูลส่วนตัว</li>
                    <li className="change-pwd">เปลี่ยนรหัสผ่าน</li>
                    <div className="chat-style">
                        <img className="image-menu-display" src={require("../images/editBar/chat.png")}/>
                        <li className="chat-history">ประวัติการสนทนา</li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Editbar;