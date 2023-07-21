import React , {useEffect, useState, useRef}from "react";
import "./EditProfile.css"
import Editbar from "../components/Editbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

    const [imageFile, setImageFile] = useState()
    const [newImage, setNewImage] = useState()

    // เปลี่ยนค่าตามการพิมพ์
    const inputValue = name => event => {
        setUserState({...userState,[name]:event.target.value});
    }

    // destructuring
    const {mem_username, mem_name, mem_surname, mem_phoneNumber, mem_birthDate, mem_profileImage} = userState

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`).then((res) => {
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
                mem_phoneNumber, mem_birthDate, newImage}).then(async (res) => {
                await Swal.fire(
                    'แจ้งเตือน',
                    res.data.message,
                    'success'
                )
                window.location.reload(true)
            }).catch((err) => {
                Swal.fire(
                    'แจ้งเตือน',
                    err.data.error,
                    'error'
                )
            })
        }
    },[newImage])


    const submitUpdate = async (event) => {
        console.log("kuy")
        event.preventDefault();
        if(imageFile){
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png"){
                const data = new FormData()
                data.append("file", imageFile)
                data.append("upload_preset", "kabiixoo")
                data.append("cloud_name", "dmz2wct31")

                // api upload รูป ไปยัง Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data)
                .then((response) => {
                    // setUserState({...userState,mem_profileImage:response.data.url.toString()});
                    setNewImage(response.data.url.toString())
                }).catch((error) => {
                    Swal.fire(
                        'แจ้งเตือน',
                        error,
                        'error'
                    )
                })
            }else{
                Swal.fire(
                    'แจ้งเตือน',
                    'ประเภทไฟล์รูปภาพไม่รองรับ',
                    'error'
                )
            }
        }
        else{
            await axios.put(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`,{mem_username, mem_name, mem_surname, 
                mem_phoneNumber, mem_birthDate}).then(async (res) => {
                await Swal.fire(
                    'แจ้งเตือน',
                    res.response.data.message,
                    'success'
                )
                window.location.reload(true)
            }).catch((err) => {
                Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.error,
                    'error'
                )
            })
        }
    }

    return(
        <div>
            <div className="edit-container">
                <Editbar username={mem_username} profileImage={mem_profileImage}/>
                <div className="edit-frame">
                    <div className="change-imageProfile-box">
                        <img className="edit-profileImage" src={mem_profileImage}/>
                        {/* <button className="choosePhoto-btn">เลือกรูป</button> */}
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
                        <button className="confirm-updateInfo-btn" onClick={submitUpdate}>แก้ไข</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditProfile;