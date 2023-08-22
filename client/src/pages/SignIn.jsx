import React, { useEffect, useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import '../pages/SignIn.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
import { authenticate } from "../services/authorize";
import AnimatedPage from "../AnimatedPage";
import { gapi } from 'gapi-script'
// import { GoogleLogin } from 'react-google-login'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import googleButton from '../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { LoginSocialGoogle } from 'reactjs-social-login'

const googleNavigate = (url) => {
    window.location.href = url
}

const googleAuth = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/googleAuth`, {method:'post'})
    const data = await response.json()
    console.log(data)
    googleNavigate(data.url)
}

export default function SignIn()  {

    const clientId = "487675977490-hbu4phrdsshvjedtsp1j94urp0ec8fj8.apps.googleusercontent.com"

    // ใช้ redirect page
    const navigate = useNavigate();

    // state ต่างๆ
    const [state,setState] = useState({
        username: "",
        password: ""
    })

    // Destructuring
    const {username, password} = state

    // เปลี่ยนค่าตามการพิมพ์
    const inputValue = name => event => {
        setState({...state,[name]:event.target.value});
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        await axios.post(`${process.env.REACT_APP_API}/signin`, {username,password})
        .then(async (res) => {
            await Swal.fire(
                'แจ้งเตือน',
                'เข้าสู่ระบบสำเร็จ',
                'success'
              )
              setState({...state,username:"",password:""})
              authenticate(res,()=>navigate('/'))
            //   location.reload();
        }).catch((err) => {
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
            )
        })
    }

    useEffect(() => {
        document.body.classList.add('signin-page');
        return () => {
            document.body.classList.remove('signin-page');
        };
    }, []);

    // useEffect(() => {
    //     // google login
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId : 'clientId',
    //             scope : ''
    //         })
    //     }
    //     gapi.load("client:auth2", initClient)
    // },[])

    // google login success
    const onSuccess = async (res) => {
        console.log("login yang")
        // ตัวแปรที่จะส่งไปหลังบ้าน
        const email = res.profileObj.email
        const imageUrl = res.profileObj.imageUrl
        const givenName = res.profileObj.givenName
        const familyName = res.profileObj.familyName

        await axios.post(`${process.env.REACT_APP_API}/googleAuth`,{
            email, imageUrl, givenName, familyName
        }).then(async (res) => {
            await Swal.fire(
                'แจ้งเตือน',
                'เข้าสู่ระบบสำเร็จ',
                'success'
            )
            setState({...state,username:"",password:""})
            authenticate(res,()=>navigate('/'))
        }).catch((err) => {
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
            )
        })
    }

    // google login fail
    const onFailure = async () => {
        await Swal.fire('แจ้งเตือน','เข้าสู่ระบบด้วย Google ไม่สำเร็จ', 'error')
    }

    return (
        <AnimatedPage>
            <div className='page'>
                <div className="loginFormContainer">
                    <div className='logoContainer'>
                        <img src={require('../images/login_logo.png')} className='logoSize'></img>
                    </div>
                    <form className="login_form" onSubmit={submitLogin}>
                        <div className='loginForm'>
                            <div className='lBUser'>
                                <label className="labelUsername">ชื่อผู้ใช้งาน</label>
                                <label className="linkSignUp">ยังไม่มีบัญชี <Link to='/signup'>สมัครสมาชิก</Link></label>
                            </div>
                            <div className='inputUsername'>
                                <input className="inputTextUsername"
                                name="username"
                                type="text"
                                placeholder="กรอกชื่อผู้ใช้งาน"
                                value={username}
                                onChange={inputValue("username")}
                                />
                            </div>
                            <br />
                            <div className='lBPwd'>
                                <label className="labelPassword">รหัสผ่าน</label>
                            </div>
                            <div className='inputPass'>
                                <input className="inputTextPass"
                                        name="password"
                                        type="password"
                                        placeholder="กรอกรหัสผ่าน"
                                        value={password}
                                        onChange={inputValue("password")}
                                />
                            </div>
                            <div className='frameBtSignIn'>
                                <button className="btSignIn"
                                type="submit"
                                variant="contained"
                                >เข้าสู่ระบบ</button>
                            </div>
                            <div className='xt_1_hr'>
                                <hr className='line'></hr>
                                    <div className="label1">เข้าใช้งานผ่าน</div>
                                <hr className='line'></hr>
                            </div>
                            <div className='lg_google'>
                                <LoginSocialGoogle client_id='487675977490-hbu4phrdsshvjedtsp1j94urp0ec8fj8.apps.googleusercontent.com'
                                    scope='openid profile email'
                                    discoveryDocs='claims_supported'
                                    access_type='offline'
                                    onResolve={async ({ provider, data }) => {
                                        console.log(provider, data)
                                        const email = data.email
                                        const imageUrl = data.picture
                                        const givenName = data.given_name
                                        const familyName = data.family_name

                                        console.log(email, imageUrl, givenName, familyName)

                                        await axios.post(`${process.env.REACT_APP_API}/googleAuth`,{
                                            email, imageUrl, givenName, familyName
                                        }).then(async (res) => {
                                            await Swal.fire(
                                                'แจ้งเตือน',
                                                'เข้าสู่ระบบสำเร็จ',
                                                'success'
                                            )
                                            setState({...state,username:"",password:""})
                                            authenticate(res,()=>navigate('/'))
                                        }).catch((err) => {
                                            Swal.fire(
                                                'แจ้งเตือน',
                                                "ผิดพลาด",
                                                'error'
                                            )
                                        })
                                    }}
                                    onReject={(err) => {
                                        console.log(err)
                                    }}>
                                        <GoogleLoginButton/>
                                </LoginSocialGoogle>
                            </div>
                        <p className='plc_pvr'>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการของ <Link to="/term-of-service" >Kabixoo</Link> และ <Link to="/term-of-service">นโยบายความเป็นส่วนตัว</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
}

