import React, { useEffect } from 'react';
import { Outlet,Link } from 'react-router-dom';
import '../pages/SignIn.css';
import { FcGoogle } from "react-icons/fc";


const SignIn = () => {
    useEffect(() => {
        document.body.classList.add('signin-page');
        return () => {
            document.body.classList.remove('signin-page');
        };
    }, []);

    return (
        <div className="loginFormContainer">
            <form className="login_form">
                <div className='loginForm'>
                    <div className='lBUser'>
                        <label className="labelUsername">ชื่อผู้ใช้งาน</label>
                        <label className="linkSignUp">ยังไม่มีบัญชี <Link to='/SignUp'>สมัครสมาชิก</Link></label>
                    </div>
                    <div className='inputUsername'>
                        <input className="inputTextUsername" id="username" type="text" placeholder="กรอกชื่อผู้ใช้งาน"/>
                    </div>
                    <br />
                    <div className='lBPwd'>
                        <label className="labelPassword">รหัสผ่าน</label>
                    </div>
                    <div className='inputPass'>
                        <input className="inputTextPass" id="password" type="password" placeholder="กรอกรหัสผ่าน"/>
                    </div>
                    <div className='frameBtSignIn'>
                        <button className="btSignIn" type="button">เข้าสู่ระบบ</button>
                    </div>
                    <div className='xt_1_hr'>
                        <hr className='line'></hr>
                        <div className="label1">เข้าใช้งานผ่าน</div>
                        <hr className='line'></hr>
                    </div>
                <div className='lg_google'>
                    <button className='bt_lwg' type="button"><FcGoogle className="iconGoogle"/>เข้าสู่ระบบผ่าน google</button>
                </div>
                <p className='plc_pvr'>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการของ <Link to="https://chat.openai.com/" target="_blank" >Kabixoo</Link> และ <Link to=" ">นโยบายความเป็นส่วนตัว</Link></p>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
