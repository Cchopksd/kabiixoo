import React , {useEffect, useState, useRef}from "react";
import "./EditProfile.css"
import Editbar from "../components/Editbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../services/authorize";
import Loading from "../components/Loading";
import AnimatedPage from "../AnimatedPage";

const EditProfile = () => {

    // ใช้งาน params จาก slug
    const params = useParams();

    const dateInputRef = useRef(null);

    // obj เก็บข้อมูล
    const [userState, setUserState] = useState({
        mem_username: "",
        mem_name: "",
        mem_surname: "",
        mem_phoneNumber: "",
        mem_birthDate: "",
        mem_profileImage: ""
    })

    const [imageFile, setImageFile] = useState(null)
    const [newImage, setNewImage] = useState()

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // เปลี่ยนค่าตามการพิมพ์
    const inputValue = name => event => {
        setUserState({...userState,[name]:event.target.value});
    }

    // destructuring
    const {mem_username, mem_name, mem_surname, mem_phoneNumber, mem_birthDate, mem_profileImage} = userState

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`,
        {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }
        ).then((res) => {
            const {mem_username, mem_name, mem_surname, mem_phoneNumber, mem_birthDate, mem_profileImage} = res.data
            setUserState({...userState,mem_username, mem_name, mem_surname, mem_phoneNumber, mem_birthDate, mem_profileImage})
        }).catch((err) => {
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
            )
        })
    },[])

    // เมื่อส่งข้อมูลไปยัง server กรณีที่มีรูป
    useEffect(() => {
        if(newImage){
            setUserState({...userState,mem_profileImage:newImage});
            axios.put(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`,{mem_username, mem_name, mem_surname, 
                mem_phoneNumber, mem_birthDate, newImage},
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
                ).then(async (res) => {
                    setLoading(false)
                    await Swal.fire(
                        'แจ้งเตือน',
                        res.data.message,
                        'success'
                    )
                window.location.reload(true)
            }).catch((err) => {
                setLoading(false)
                Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.error,
                    'error'
                )
            })
        }
    },[newImage])


    const submitUpdate = async (event) => {
        event.preventDefault();
        setLoading(true)
        if(imageFile){
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png"){
                const data = new FormData()
                data.append("file", imageFile)
                data.append("upload_preset", "kabiixoo")
                data.append("cloud_name", "dmz2wct31")

                // api upload รูป ไปยัง Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data)
                .then((response) => {
                    setNewImage(response.data.url.toString())
                }).catch((error) => {
                    setLoading(false)
                    Swal.fire(
                        'แจ้งเตือน',
                        error,
                        'error'
                    )
                })
            }else{
                setLoading(false)
                Swal.fire(
                    'แจ้งเตือน',
                    'ประเภทไฟล์รูปภาพไม่รองรับ',
                    'error'
                )
            }
        }
        else {
            await axios.put(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`,{mem_username, mem_name, mem_surname, 
                mem_phoneNumber, mem_birthDate},
                    {
                        headers: {
                            authorization: `Bearer ${getToken()}`
                        }
                    }
                ).then(async (res) => {
                setLoading(false)
                await Swal.fire(
                    'แจ้งเตือน',
                    res.data.message,
                    'success'
                )
                window.location.reload(true)
            }).catch((err) => {
                setLoading(false)
                Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.error,
                    'error'
                )
            })
        }
    }

    return(
        <AnimatedPage>
            { loading && <Loading/>}
            <div className="edit-container">
                <Editbar username={mem_username} profileImage={mem_profileImage} slug={params.slug}/>
                <div className="edit-frame">
                    <div className="change-imageProfile-box">
                        <img className="edit-profileImage" src={mem_profileImage}/>
                        <input className="choosePhoto-input" type="file" onChange={(e) => {setImageFile(e.target.files[0])}}/>
                        <div className="max-edit-box">
                            <label className="max-edit-photosize">ขนาดไฟล์ : สูงสุด 5 MB</label>
                            <label className="max-edit-photosize">ไฟล์ที่รองรับ : .JPEG, .PNG</label>
                        </div>
                    </div>
                    <div className="change-information-box">
                        <div className="edit-name-box">
                            <label className="info-title">ชื่อ</label>
                            <input className="input-edit-info" type="text" value={mem_name} onChange={inputValue("mem_name")}/>
                        </div>
                        <div className="edit-surname-box">
                            <label className="info-title">นามสกุล</label>
                            <input className="input-edit-info" type="text" value={mem_surname} onChange={inputValue("mem_surname")}/>
                        </div>
                        <div className="edit-phoneNumber-box">
                            <label className="info-title">เบอร์โทรศัพท์</label>
                            <input className="input-edit-info" type="text" value={mem_phoneNumber} onChange={inputValue("mem_phoneNumber")}/>
                        </div>
                        <div className="edit-birthDate-box">
                            <label className="info-title">วัน/เดือน/ปี เกิด</label>
                            {/* <input className="input-edit-info" type="text" value={mem_birthDate} onChange={inputValue("mem_birthDate")}/> */}
                            <input className='input-edit-info' type="date"  ref={dateInputRef} value={mem_birthDate} onChange={inputValue("mem_birthDate")}/>
                        </div>
                    </div>
                    <div className="updateInfo-btn-box">
                        <button className="confirm-updateInfo-btn" onClick={submitUpdate}>ยืนยันแก้ไข</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}

export default EditProfile;