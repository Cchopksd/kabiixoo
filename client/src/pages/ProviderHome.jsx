import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProviderHome.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../services/authorize";
import AnimatedPage from "../AnimatedPage";

const ProviderHome = () => {
    // เอาไอดีจาก url parameter
    const params = useParams();
    const [providerId, setProviderId] = useState(params.userId)
    const [slug, setSlug] = useState("")

    // ดึงข้อมูล slug ของ service
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/get-service-slug`,{providerId},{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((res) => {
            setSlug(res.data)
        }).catch((err) => {
            console.log(err.response.data.error)
        })
    },[])

    return (
        <AnimatedPage>
            <div className="providerHome-container">
                <Link to={`/edit-service/${slug}`} className="providerHome-link">
                    <div className="editService-link-box" role="button">
                        <img className="providerHome-btn-img" src={require("../images/providerHomePage/editIcon.png")} />
                        <label className="providerHome-btn-desc">แก้ไขประกาศการให้บริการ</label>
                    </div>
                </Link>
                <Link className="providerHome-link" to={`/confirm-business/${slug}`}>
                    <div className="confirmBusiness-link-box">
                        <img className="providerHome-btn-img" src={require("../images/providerHomePage/confirmIcon.png")} />
                        <label className="providerHome-btn-desc margin-confirm">ยืนยันการมีหน้าร้านหรือกิจการ</label>
                    </div>
                </Link>
            </div>
        </AnimatedPage>
    );
}

export default ProviderHome;