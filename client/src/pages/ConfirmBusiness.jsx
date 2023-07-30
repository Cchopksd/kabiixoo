import React, { useEffect, useState } from "react";
import "./ConfirmBusiness.css"
import ImageUploaderBusiness from "../components/ImageUploaderBusiness";
import ImageUploaderLicense from "../components/ImageUploaderLicense";
import Footer from "../components/Footer"
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../services/authorize";
import Loading from "../components/Loading";

const ConfirmBusiness = () => {

    // url parameter
    const params = useParams()

    // state ของข้อมูล
    const [businessName, setBusinessName] = useState("")
    const [businessDesc, setBusinessDesc] = useState("")

    // state ของ ชุดรูปภาพ
    const [imagesBusiness, setImagesBusiness] = useState([])
    const [imagesLicense, setImagesLicense] = useState([])

    // state ที่จะส่งข้อมูลรูปไป
    const [imageBusiness1, setImageBusiness1] = useState("")
    const [imageBusiness2, setImageBusiness2] = useState("")
    const [imageBusiness3, setImageBusiness3] = useState("")
    const [imageLicense1, setImageLicense1] = useState("")
    const [imageLicense2, setImageLicense2] = useState("")
    const [imageLicense3, setImageLicense3] = useState("")

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    //state เช็คว่ามีรูปแนปไหม
    const [uploadImg, setUploadImg] = useState(false)

    const handleDataFromChildBusiness = (data) => {
        setImagesBusiness(data)
    }

    const handleDataFromChildLicense = (data) => {
        setImagesLicense(data)
    }

    const submitConfirmBusiness = async (event) => {
        event.preventDefault();
        setLoading(true)
        // validate
        if (!businessName || !businessDesc){
            setLoading(false)
            Swal.fire('แจ้งเตือน', "กรุณากรอกข้อมูลให้ครบ", 'error');
            return
        }
        if (imagesBusiness.length > 0 || imagesLicense.length > 0){
            // เช็คแนบรูปหน้าร้าน
            if (imagesBusiness.length > 0){
                for (let i = 0; i < imagesBusiness.length; i++) {
                    const img = imagesBusiness[i];
                    const data = new FormData()
                        data.append("file", img.file)
                        data.append("upload_preset", "kabiixoo")
                        data.append("cloud_name", "dmz2wct31")
                        try {
                            const response = await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data);
                            const imageUrl = response.data.url.toString();
                            if (i === 0 && imageBusiness1 === "") {
                                setImageBusiness1(imageUrl);
                            } else if (i === 1 && imageBusiness2 === "") {
                                setImageBusiness2(imageUrl);
                            } else if (i === 2 && imageBusiness3 === "") {
                                setImageBusiness3(imageUrl);
                            }
                        } catch (error) {
                            setLoading(false)
                            Swal.fire('แจ้งเตือน', error.message, 'error');
                        }
                }
            }
            // เช็คแนบรูปหน้าร้าน
            if (imagesLicense.length > 0){
                for (let i = 0; i < imagesLicense.length; i++) {
                    const img = imagesLicense[i];
                    const data = new FormData()
                        data.append("file", img.file)
                        data.append("upload_preset", "kabiixoo")
                        data.append("cloud_name", "dmz2wct31")
                        try {
                            const response = await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data);
                            const imageUrl = response.data.url.toString();
                            if (i === 0 && imageLicense1 === "") {
                                setImageLicense1(imageUrl);
                            } else if (i === 1 && imageLicense2 === "") {
                                setImageLicense2(imageUrl);
                            } else if (i === 2 && imageLicense3 === "") {
                                setImageLicense3(imageUrl);
                            }
                        } catch (error) {
                            setLoading(false)
                            Swal.fire('แจ้งเตือน', error.message, 'error');
                        }
                    }
                }
            setUploadImg(true)
        }
        else {
            await axios.post(`${process.env.REACT_APP_API}/confirm-business/${params.slug}`,{
                businessName,businessDesc,imageBusiness1,imageBusiness2,imageBusiness3,
                imageLicense1,imageLicense2,imageLicense3
            },{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((res) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', res.data.message, 'success');
            }).catch((err) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', err.response.data.error, 'error');
            })
        }
    }

    // เมื่อมีการ upload รูปไป cloudinary
    useEffect(() => {
        if(uploadImg){
            axios.post(`${process.env.REACT_APP_API}/confirm-business/${params.slug}`,{
                businessName,businessDesc,imageBusiness1,imageBusiness2,imageBusiness3,
                imageLicense1,imageLicense2,imageLicense3
            },{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((res) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', res.data.message, 'success');
                setUploadImg(false)
            }).catch((err) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', err.response.data.error, 'error');
                setUploadImg(false)
            })
        }
    },[uploadImg])

    return (
        <div>
            { loading && <Loading/> }
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
                        <textarea className="input-businessDesc" type="text" value={businessDesc} onChange={(event)=>setBusinessDesc(event.target.value)}/>
                    </div>
                    <div className="businessStorePic-box">
                        <label className="confirm-info-title storePic">รูปถ่ายหน้าร้านหรือกิจการ</label>
                        <ImageUploaderBusiness onDataSendBusiness={handleDataFromChildBusiness}/>
                    </div>
                    <div className="businessLicensePic-box">
                        <label className="confirm-info-title license">ใบอนุญาติการค้าหรือใบอนุญาติกิจการเกี่ยวกับสัตว์</label>
                        <ImageUploaderLicense onDataSendLicense={handleDataFromChildLicense}/>
                    </div>
                    <button className="comfirm-business-btn" onClick={submitConfirmBusiness}>ส่งแบบฟอร์ม</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ConfirmBusiness;