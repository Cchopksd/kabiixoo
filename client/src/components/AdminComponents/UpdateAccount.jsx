import React from 'react';
import SideBarAdmin from './SideBarAdmin';
import './UpdateComponent.css'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AnimatedPage from '../../AnimatedPage';

const UpdateAccount = () => {
    // url parameter
    const params = useParams()

    // redirect
    const navigate = useNavigate()

    // รูปของเลือก imagefile
    const [imageFile, setImageFile] = useState(null)
    const [newImage, setNewImage] = useState()

    // state ข้อมูล
    const [state, setState] = useState({
        mem_username: '',
        mem_password: '',
        mem_name: '',
        mem_surname: '',
        mem_email: '',
        mem_profileImage:'',
        mem_birthDate: '',
        mem_phoneNumber: ''
        // mem_role: ''
    })

    // state เช็ค database ส่งใน body
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const { mem_username, mem_password, mem_name, mem_surname, mem_email, mem_profileImage, mem_birthDate, mem_phoneNumber } = state

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/account/${params.mem_slug}`)
            .then(response => {
                // const { mem_username, mem_password, mem_name, mem_surname, mem_email, mem_role } = response.data
                setState({ ...response.data })
                setEmail(response.data.mem_email)
                setUsername(response.data.mem_username)
                // console.log(response.data)
            })
            .catch(err => alert(err))
    }, [params.mem_slug])

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    // เมื่อแก้ไขรูปด้วย
    useEffect(() => {
        if(newImage){
            axios.patch(`${process.env.REACT_APP_API}/account/${params.mem_slug}`, {state,username,email})
                    .then(async(response) => {
                        setImageFile(null)
                        setNewImage("")
                        await Swal.fire(
                            'แจ้งเตือน',
                            'แก้ไขข้อมูลผู้ใช้งานสำเร็จ',
                            'success'
                        )
                        navigate("/account")
                    }).catch(async(err) => {
                        setImageFile(null)
                        setNewImage("")
                        await Swal.fire(
                            'แจ้งเตือน',
                            err.response.data.error,
                            'error'
                        )
                    })
        }
    },[newImage])

    const submitForm = async (e) => {
        e.preventDefault();
        // เช็คค่าว่าง
        if (!mem_username || !mem_password || !mem_name || !mem_surname || !mem_email || !mem_profileImage || !mem_birthDate || !mem_phoneNumber) {
            Swal.fire(
                "แจ้งเตือน",
                "กรุณากรอกข้อมูลให้ครบ",
                "error"
            )
            return
        }
        if (imageFile) {
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png"){
                const data = new FormData()
                data.append("file", imageFile)
                data.append("upload_preset", "kabiixoo")
                data.append("cloud_name", "dmz2wct31")

                // api upload รูป ไปยัง Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data)
                .then(async(response) => {
                    setState({...state,mem_profileImage:response.data.url.toString()});
                    setNewImage(response.data.url.toString())
                }).catch((error) => {
                    // setLoading(false)
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
        else {
            axios.patch(`${process.env.REACT_APP_API}/account/${params.mem_slug}`,{state,username,email})
                .then(async (response) => {
                    setImageFile(null)
                    setNewImage("")
                    await Swal.fire(
                        'แจ้งเตือน',
                        'แก้ไขข้อมูลผู้ใช้งานสำเร็จ',
                        'success'
                    )
                    navigate("/account")
                }).catch(async (err) => {
                    console.log(err)
                    setImageFile(null)
                    setNewImage("")
                    await Swal.fire(
                        'แจ้งเตือน',
                        err.response.data.error,
                        'error'
                    )
                })
        }
    }


    return (
        <div className='update-main'>
            <SideBarAdmin />
            <main className='update-frame'>
                <h1 className='text-header'>แก้ไขข้อมูลผู้ใช้งาน</h1>
                <form className='update-container' onSubmit={submitForm}>
                        <section className='sec-left'>
                            <div className='update-imageProfile-box'>
                                <img className="update-profileImage-admin" src={mem_profileImage}/>
                                <input className="update-choosePhoto-input admin-account-update" type="file" onChange={(e) => {setImageFile(e.target.files[0])}}/>
                                <div className="update-max-edit-box">
                                    <label className="update-max-edit-photosize">ขนาดไฟล์ : สูงสุด 5 MB</label><br />
                                    <label className="update-max-edit-photosize">ไฟล์ที่รองรับ : .JPEG, .PNG</label>
                                </div>
                            </div>
                        </section>
                        <hr className='line-center' />
                        <section className='sec-right'>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">ชื่อผู้ใช้งาน :</label>
                                <input className='input-update' type="text" value={mem_username} onChange={inputValue('mem_username')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">รหัสผ่าน :</label>
                                <input className='input-update' type="text" value={mem_password} onChange={inputValue('mem_password')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">ชื่อ :</label>
                                <input className='input-update' type="text" value={mem_name} onChange={inputValue('mem_name')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">นามสกุล :</label>
                                <input className='input-update' type="text" value={mem_surname} onChange={inputValue('mem_surname')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">อีเมล :</label>
                                <input className='input-update' type="text" value={mem_email} onChange={inputValue('mem_email')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">วันเกิด :</label>
                                <input className='input-update' type="date" value={mem_birthDate} onChange={inputValue('mem_birthDate')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">เบอร์โทร :</label>
                                <input className='input-update' type="text" value={mem_phoneNumber} onChange={inputValue('mem_phoneNumber')} />
                            </div>
                            {/* Add other input fields for mem_password, mem_name, mem_surname, mem_email, mem_role */}
                            <div className='div-btn-update'>
                                <input type="submit" value='อัพเดตข้อมูล' className="btn-update" />
                            </div>
                        </section>
                        {/* <input type="submit" value='อัพเดต' className="btn btn-primary" /> */}
                    </form>
            </main>
        </div>
    );
}

export default UpdateAccount;
