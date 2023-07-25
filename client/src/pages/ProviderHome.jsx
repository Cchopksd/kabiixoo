import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProviderHome.css"
import axios from "axios";
import { Link } from "react-router-dom";

const ProviderHome = () => {
    // เอาไอดีจาก url parameter
    const params = useParams();
    const [providerId, setProviderId] = useState(params.userId)
    const [slug, setSlug] = useState("")

    // ดึงข้อมูล slug ของ service
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/get-service-slug`,{providerId}).then((res) => {
            setSlug(res.data)
        }).catch((err) => {
            console.log(err.response.data.error)
        })
    },[])

    return (
        <div className="providerHome-container">
            <Link to={`/edit-service/${slug}`}>
                <div className="editService-link-box" role="button">
                    <img className="providerHome-btn-img" src={require("../images/providerHomePage/editIcon.png")} />
                    <label className="providerHome-btn-desc">แก้ไขประกาศการให้บริการ</label>
                </div>
            </Link>
            <Link>
                <div className="confirmBusiness-link-box">
                    <img className="providerHome-btn-img" src={require("../images/providerHomePage/confirmIcon.png")} />
                    <label className="providerHome-btn-desc margin-confirm">ยืนยันการมีหน้าร้านหรือกิจการ</label>
                </div>
            </Link>
        </div>
    );
}

export default ProviderHome;