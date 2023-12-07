import React from 'react';
import '../pages/SignUp.css'
import { useRef, useState, useEffect, useContext } from 'react';
import Swal from "sweetalert2"
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { authenticate } from "../services/authorize";
import Loading from '../components/Loading';
import AnimatedPage from "../AnimatedPage";
import { ThaiDatePicker } from "thaidatepicker-react";
import UserContext from '../contexts/UserProvider';

const SignUp = () => {

    // state ของ contextAPI
    const {dropdownClicked, setDropdownClicked} = useContext(UserContext);

    // redirect page
    const navigate = useNavigate()

    // รวม state
    const [state, setState] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        birthDate: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    //state ของไฟล์
    const [imageFile, setImageFile] = useState()
    const [image, setImage] = useState("")

    // destructuring
    const { name,surname,email,phone,birthDate,username,password,confirmPassword } = state

    // ชื่อของไฟล์ที่เลือก
    const [selectedFileName, setSelectedFileName] = useState("ไม่ได้เลือกไฟล์")

    const dateInputRef = useRef(null);

    // state ของยืนยันการอ่าน term of service
    const [confirmRead, setConfirmRead] = useState(false)

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // set state
    const inputValue = name => event => {
        setState({...state,[name]:event.target.value});
    }

    useEffect(() => {
        setDropdownClicked(false)
    },[])

    useEffect(() => {
        // หลังจากมีการเปลี่ยนค่า ใน image ให้ส่งข้อมูลไป server
        if (image){
            axios.post(`${process.env.REACT_APP_API}/signup`, {name,surname,email,phone,birthDate,username,password,confirmPassword,image})
            .then(async (res) => {
                setLoading(false)
                await Swal.fire(
                    'แจ้งเตือน',
                    'สมัครสมาชิกสำเร็จ',
                    'success'
                )
                setState({...state,name: "",surname: "",email: "",phone: "",birthDate: "",username: "",password: "",confirmPassword: ""})
                setImage("")
                setImageFile("")
                authenticate(res,()=>navigate('/home'))
            }).catch((err) => {
                setLoading(false)
                Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.error,
                    'error'
                )
                console.log(err.response.data.error)
            })
        }
    },[image])


    //ส่งยืนยันข้อมูล
    const submitSignUp = async (event) => {
        event.preventDefault();
        setLoading(true)

        // ตรวจสอบว่าอ่าน term หรือยัง
        if (!confirmRead){
            setLoading(false)
            return Swal.fire(
                'แจ้งเตือน',
                'กรุณายืนยันการยอมรับข้อกำหนดการให้บริการ',
                'error'
            )
        }

        // ตรวจสอบสกุลไฟล์
        if(imageFile){
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png"){
                const data = new FormData()
                data.append("file", imageFile)
                data.append("upload_preset", "kabiixoo")
                data.append("cloud_name", "dmz2wct31")

                // api upload รูป ไปยัง Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data)
                .then((response) => {
                    setImage(response.data.url.toString())
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
        }else {
            await axios.post(`${process.env.REACT_APP_API}/signup`, {name,surname,email,phone,birthDate,username,password,confirmPassword,image})
            .then(async (res) => {
                setLoading(false)
                await Swal.fire(
                    'แจ้งเตือน',
                    'สมัครสมาชิกสำเร็จ',
                    'success'
                )
                setState({...state,name: "",surname: "",email: "",phone: "",birthDate: "",username: "",password: "",confirmPassword: ""})
                setImage("")
                setImageFile("")
                authenticate(res,()=>navigate('/home'))
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

    return (
        <AnimatedPage>
            { loading && <Loading/>}
            <div className='frame-signUp'>
                <div className='backGroundImage'>
                    <img className="pic-backGround" src={require('../images/registerBackground2.png')}/>
                </div>
                    <div className="regisFormContainer">
                        <div className='pvl_1'>
                            <h1 className="lbRegis">สร้างบัญชีผู้ใช้งาน</h1>
                        </div>
                        <form className="signUpFormHorizontal">
                            <div className='largeForm'>
                                <div className='regisName'>
                                    <div>
                                        <label className="lbRegisName">ชื่อ *</label>
                                    </div>
                                    <input className="inputRegisName" id="name" type="text" placeholder="กรอกชื่อ" value={name} onChange={inputValue("name")}/>
                                </div>

                                <div className='regisSurname'>
                                    <div>
                                        <label className="lbRegisSurName">นามสกุล *</label>
                                    </div>
                                    <input className="inputRegisSurName" id="surName" type="text" placeholder="กรอกนามสกุล" value={surname} onChange={inputValue("surname")}/>
                                </div>

                                <div className='regisImage'>
                                    <div>
                                        <label className="lbRegisSurName">รูปโปรไฟล์</label>
                                    </div>
                                    <input className="inputRegisImage" id="fileInput" type="file" style={{display: "none"}} onChange={(e) => {
                                        setImageFile(e.target.files[0])
                                        const file = e.target.files[0]
                                        if (e.target.files[0] == null) {
                                            setSelectedFileName("ไม่ได้เลือกไฟล์")
                                        } else {
                                            setSelectedFileName(file.name)}
                                        console.log(imageFile)}}/>
                                    <div className="inputRegisImage">
                                        <label className="signUpFile-label" htmlFor="fileInput">
                                            เลือกไฟล์ภาพ
                                        </label>
                                        <label className="signUpFile-text">{selectedFileName.length > 30 && selectedFileName != "ไม่ได้เลือกไฟล์"? selectedFileName.substring(0, 30) + '...' : selectedFileName}</label>
                                    </div>
                                </div>

                                <div className='regisEmail'>
                                    <div>
                                        <label className="lbRegisEmail">อีเมล *</label>
                                    </div>
                                    <input className="inputRegisEmail" id="email" type="email" placeholder="กรอกอีเมล" value={email} onChange={inputValue("email")}/>
                                </div>

                                <div className='regisBirthDay'>
                                    <div>
                                        <label className="lbRegisBirthDay">วันเกิด *</label>
                                    </div>
                                    <input className='inputBirthDay' type="date"  ref={dateInputRef} value={birthDate} onChange={inputValue("birthDate")}/>
                                    
                                </div>
                                <div className='regisTel'>
                                    <div>
                                        <label className="lbRegisPhone">เบอร์โทรศัพท์ *</label>
                                    </div>
                                    <input className="inputRegisPhone" id="phone" type="tel" placeholder="กรอกเบอร์โทรศัพท์" value={phone} onChange={inputValue("phone")}/>
                                </div>
                                <div className='regisUsername'>
                                    <div>
                                        <label className="lbRegisUsername">ชื่อผู้ใช้งาน *</label>
                                    </div>
                                    <input className="inputRegisUsername" id="username" type="text" placeholder="กรอกชื่อผู้ใช้งาน" value={username} onChange={inputValue("username")}/>
                                </div>
                                <div className='regisPassword'>
                                    <div>
                                        <label className="lbRegisPassword">รหัสผ่าน *</label>
                                    </div>
                                    <input className="inputRegisPassword" id="password" type="password" placeholder="กรอกรหัสผ่าน" value={password} onChange={inputValue("password")}/>
                                </div>
                                <div className='regisConfirmPassword'>
                                    <div>
                                        <label className="lbRegisConfirmPassword">ยืนยันรหัสผ่าน *</label>
                                    </div>
                                    <input className="inputRegisConfirmPassword" id="confirmPassword" type="password" placeholder="ยืนยันรหัสผ่าน" value={confirmPassword} onChange={inputValue("confirmPassword")}/>
                                </div>
                                <div className='regisApprove'>
                                    <input className="vehicleApprove" type='checkbox' value={confirmRead} onChange={()=> setConfirmRead(!confirmRead)}/>
                                    <label className="lbRegisApprove">ฉันยืนยันว่าได้อ่านและยอมรับ ข้อกำหนดในการให้บริการของ <Link to={`/term-of-service`}>KabiiXoo</Link><br /> และ <Link to={`/term-of-service`}>นโยบายความเป็นส่วนตัว</Link></label>
                                </div>
                                <div className='regisSubmit'>
                                    <button className="inputRegisSubmit" onClick={submitSignUp}>สมัครสมาชิก</button>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        </AnimatedPage>
        
    );
}

export default SignUp;