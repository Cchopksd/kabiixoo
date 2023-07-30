import React, {useState, useEffect} from "react";
import "./ReportProvider.css"
import ImageUploaderReport from "../components/ImageUploaderReport";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getUserId, getToken } from "../services/authorize";
import Loading from "../components/Loading";

const ReportProvider = () => {

    // urrl parameter
    const params = useParams()

    // redirect
    const navigate = useNavigate()

    // state ของผู้รายงาน
    const [reporterId, setReporterId] = useState("")

    // state ของข้อมูลทั่วไป
    const [businessName,setBusinessName] = useState("");
    const [providerImage, setProviderImage] = useState("");
    const [reportTopic,setReportTopic] = useState("");
    const [reportDesc,setReportDesc] = useState("");

    // state ของรูปภาพ
    const [images, setImages] = useState([])
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [uploadImg, setUploadImg] = useState(false)

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        // ดึงข้อมูล id ของผู้ใช้งาน
        try{
            const id = await getUserId()
            setReporterId(id.data)
        }catch (error) {
            console.error(error);
        }
        // ดึงชื่อประกาศการให้บริการ
        axios.get(`${process.env.REACT_APP_API}/edit-service/${params.slug}`).then((res) => {
            setBusinessName(res.data.svp_name)
            setProviderImage(res.data.svp_owner.mem_profileImage)
        })
    }

    // ดึงรูปจาก child
    const handleDataFromChild = (data) => {
        setImages(data)
    }

    const submitReport = async(event) => {
        event.preventDefault()
        setLoading(true)
        // validate
        if (!businessName || !reportTopic || !reportDesc) {
            setLoading(false)
            Swal.fire('แจ้งเตือน','กรุณากรอกข้อมูลให้ครบ','error')
            return
        }
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
                        }
                    } catch (error) {
                        setLoading(false)
                        Swal.fire('แจ้งเตือน', error.message, 'error');
                    }
            }
            setUploadImg(true)
        }
        else {
            await axios.post(`${process.env.REACT_APP_API}/send-report/${params.slug}`,{
                reportTopic, reportDesc, image1, image2, image3, reporterId
            },{
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then(async (res) => {
                setLoading(false)
                await Swal.fire('แจ้งเตือน', res.data.message, 'success')
                navigate(`/provider-profile/${params.slug}`)
            }).catch((err) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', err.response.data.error, 'error')
            })
        }
    }

    // ถ้า upload รูป
    useEffect(() => {
        if(uploadImg){
            axios.post(`${process.env.REACT_APP_API}/send-report/${params.slug}`,{
                reportTopic, reportDesc, image1, image2, image3, reporterId
            },{
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then(async (res) => {
                setLoading(false)
                await Swal.fire('แจ้งเตือน', res.data.message, 'success')
                setUploadImg(false)
                navigate(`/provider-profile/${params.slug}`)
            }).catch((err) => {
                setLoading(false)
                Swal.fire('แจ้งเตือน', err.response.data.error, 'error')
                setUploadImg(false)
            })
        }
    },[uploadImg])

    return (
        <div>
            { loading && <Loading/>}
            <div className="report-container">
                <div className="report-title-box">
                    <label className="report-title">รายงานผู้ให้บริการ</label>
                    <label className="business-name-report">{businessName}</label>
                </div>
                <img className="report-img-display" src={providerImage}/>
                <div className="report-topic-box">
                    <label className="report-info-header">หัวข้อการรายงาน</label>
                    <input className="input-report-topic" type="text" value={reportTopic} onChange={(event)=>setReportTopic(event.target.value)}/>
                </div>
                <div className="report-description-box">
                    <label className="report-info-header">รายละเอียดการรายงาน</label>
                    <textarea className="input-description-topic" value={reportDesc} onChange={(event)=>setReportDesc(event.target.value)}></textarea>
                </div>
                <div className="report-img-box">
                    <label className="report-info-header">รูปภาพประกอบ (ถ้ามี)</label>
                    <ImageUploaderReport onDataSend={handleDataFromChild}/>
                </div>
                <button className="comfirm-report-btn" onClick={submitReport}>ส่งรายงาน</button>
            </div>
            <Footer/>
        </div>
    );
}

export default ReportProvider;