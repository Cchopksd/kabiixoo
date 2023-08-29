import AnimatedPage from '../AnimatedPage'
import './ForgotChangePassword.css'
import Footer from '../components/Footer'

const ForgotChangePassword = () => {
    return (
        <AnimatedPage>
            <div className='forgot-change-container'>
                <label className='forgot-change-header'>เปลี่ยนรหัสผ่านใหม่</label>
                <div className='forgot-change-box'>
                    <div className='forgot-change-sub-box'>
                        <img src={require('../images/forgotChangePasswordPage/forgotChangePhoto.png')} alt="reset-password"/>
                        <div className='forgot-change-input-box'>
                            <label>เปลี่ยนรหัสผ่าน</label>
                            <input type="text"/>
                            <label>ยืนยันเปลี่ยนรหัสผ่าน</label>
                            <input type="text" />
                        </div>
                    </div>
                    <button>ส่งรหัสผ่านใหม่</button>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    )
}

export default ForgotChangePassword