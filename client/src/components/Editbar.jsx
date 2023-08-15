import React , {useEffect, useState}from "react";
import "./Editbar.css";
import { Link } from "react-router-dom";
import { getUserId } from "../services/authorize";

const Editbar = ({username, profileImage}) => {

    // id ของคน login
    const [userId, setUserId] = useState("")

    // เมื่อเรียก component
    useEffect(() => {
        loadData()
    },[])

    // เอา id ของคน login
    const loadData = async () => {
        try{
            const id = await getUserId()
            setUserId(id.data)
        }catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="editbar-container">
            <div className="member-display">
                <img className="image-edit-display" src={profileImage}/>
                <label className="username-edit-display">{username}</label>
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
                        <Link to={`/chats/${userId}`} className="remove-link-style">
                            <li className="chat-history">การสนทนา</li>
                        </Link>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Editbar;