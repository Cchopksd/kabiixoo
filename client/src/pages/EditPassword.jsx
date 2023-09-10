import './EditPassword.css'
import AnimatedPage from '../AnimatedPage'
import Editbar from '../components/Editbar'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken } from '../services/authorize';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const EditPassword = () => {

    // ใช้งาน params จาก slug
    const params = useParams();

    // obj เก็บข้อมูล
    const [userState, setUserState] = useState({
        mem_username: "",
        mem_profileImage: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // เปลี่ยนค่าตามการพิมพ์
    const inputValue = name => event => {
        setUserState({...userState,[name]:event.target.value});
    }

    // destructuring
    const {mem_username, mem_profileImage, password, newPassword, confirmNewPassword} = userState

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/edit-profile/${params.slug}`,
        {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }
        ).then((res) => {
            const {mem_username, mem_profileImage} = res.data
            setUserState({...userState,mem_username, mem_profileImage})
        }).catch((err) => {
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
            )
        })
    },[])

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const slug = params.slug
        await axios.post(`${process.env.REACT_APP_API}/change-password`, {
            password, newPassword, confirmNewPassword, slug},{
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then(async(res)=> {
                setLoading(false)
                await Swal.fire('แจ้งเตือน',res.data.message,'success')
                setUserState({...userState,password:"",newPassword:"",confirmNewPassword:""});
            }).catch(async(err) => {
                setLoading(false)
                await Swal.fire('แจ้งเตือน', err.response.data.message, 'error')
            })
    }

    return (
        <AnimatedPage>
            <div className='editPassword-container'>
                <Editbar username={mem_username} profileImage={mem_profileImage} slug={params.slug}/>
                <div className='editPassword-frame'>
                    <div className='editPassword-top'>
                        <img src={require('../images/editPasswordPage/editPasswordPhoto.png')} alt="editPassword-photo" />
                        <div className='editPassword-input-box'>
                            <div>
                                <label>รหัสผ่านปัจจุบัน</label>
                                <label style={{color : '#A7727D'}}> *</label>
                            </div>
                            <input type="password" placeholder='กรอกรหัสผ่านปัจจุบัน' value={password} onChange={inputValue("password")}/>
                            <div>
                                <label>รหัสผ่านใหม่</label>
                                <label style={{color : '#A7727D'}}> *</label>
                            </div>
                            <input type="password" placeholder='กรอกรหัสผ่านใหม่' value={newPassword} onChange={inputValue("newPassword")}/>
                            <div>
                                <label>ยืนยันรหัสผ่านใหม่</label>
                                <label style={{color : '#A7727D'}}> *</label>
                            </div>
                            <input type="password" placeholder='ยืนยันรหัสผ่านใหม่' value={confirmNewPassword} onChange={inputValue("confirmNewPassword")}/>
                        </div>
                    </div>
                    <button className="editPassword-btn" onClick={handleSubmit}>แก้ไขรหัสผ่าน</button>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    )
}

export default EditPassword