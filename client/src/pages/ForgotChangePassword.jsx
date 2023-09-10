import AnimatedPage from '../AnimatedPage'
import './ForgotChangePassword.css'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'

const ForgotChangePassword = () => {

    const navigate = useNavigate()

    // รหัสผ่านใหม่
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const [loading, setLoading] = useState(false)

    // id และ token
    const { id, token } = useParams()

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        await axios.post(`${process.env.REACT_APP_API}/forgot-change-password/${id}/${token}`, { newPassword, confirmNewPassword }).then(async(res) => {
            setLoading(false)
            await Swal.fire('แจ้งเตือน', res.data.message, 'success')
            navigate('/signin')
        }).catch ((error) => {
            setLoading(false)
            Swal.fire('แจ้งตือน', error.response.data.message, 'error')
        })
    }

    return (
        <AnimatedPage>
            {loading && <Loading/>}
            <div className='forgot-change-container'>
                <label className='forgot-change-header'>เปลี่ยนรหัสผ่านใหม่</label>
                <div className='forgot-change-box'>
                    <div className='forgot-change-sub-box'>
                        <img src={require('../images/forgotChangePasswordPage/forgotChangePhoto.png')} alt="reset-password"/>
                        <div className='forgot-change-input-box'>
                            <label>เปลี่ยนรหัสผ่าน</label>
                            <input type="password" onChange={(event) => setNewPassword(event.target.value)} placeholder='กรอกรหัสผ่านใหม่'/>
                            <label>ยืนยันเปลี่ยนรหัสผ่าน</label>
                            <input type="password" onChange={(event) => setConfirmNewPassword(event.target.value)} placeholder='ยืนยันรหัสผ่านใหม่'/>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>ยืนยันการเปลี่ยนรหัสผ่าน</button>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    )
}

export default ForgotChangePassword