import AnimatedPage from "../AnimatedPage"
import './ForgotPassword.css'
import Footer from "../components/Footer"
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../components/Loading'

const ForgotPassword = () => {

    useEffect(() => {
        document.body.classList.add('review-page');
        return () => {
            document.body.classList.remove('review-page');
        };
    }, []);

    // state ของ email ที่กรอกเปลี่ยนรหัส
    const [email, setEmail] = useState()

    const [loading, setLoading] = useState(false)

    // redirect หน้า
    const navigate = useNavigate()

    // axios.defaults.withCredentials = true
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        await axios.post(`${process.env.REACT_APP_API}/forgot-password`, {email}).then(async(res) => {
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
            <div className="forgot-container">
                <label className="forgot-header">เปลี่ยนรหัสผ่าน ด้วยอีเมล</label>
                <div className="forgot-box">
                    <img src={require('../images/forgotPasswordPage/forgotPhoto.png')} alt="forgot-photo" />
                    <div className="forgot-input-box">
                        <label>อีเมล (ที่ใช้ในการสมัครสมาชิก)</label>
                        <input type="text" onChange={(event) => setEmail(event.target.value)}/>
                        <button onClick={handleSubmit}>ส่งอีเมลเปลี่ยนรหัสผ่าน</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    )
}

export default ForgotPassword;