import AnimatedPage from "../AnimatedPage"
import './ForgotPassword.css'
import Footer from "../components/Footer"

const ForgotPassword = () => {
    return (
        <AnimatedPage>
            <div className="forgot-container">
                <label className="forgot-header">เปลี่ยนรหัสผ่าน ด้วยอีเมล</label>
                <div className="forgot-box">
                    <img src={require('../images/forgotPasswordPage/forgotPhoto.png')} alt="forgot-photo" />
                    <div className="forgot-input-box">
                        <label>อีเมล (ที่ใช้ในการสมัครสมาชิก)</label>
                        <input type="text" />
                        <button>ส่งอีเมลเปลี่ยนรหัสผ่าน</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    )
}

export default ForgotPassword;