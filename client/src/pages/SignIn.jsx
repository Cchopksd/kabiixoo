import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../pages/SignIn.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
import { authenticate } from "../services/authorize";
import AnimatedPage from "../AnimatedPage";
import { LoginSocialGoogle } from 'reactjs-social-login'
import UserContext from '../contexts/UserProvider';

export default function SignIn()  {

    // ใช้ redirect page
    const navigate = useNavigate();

    // state ต่างๆ
    const [state,setState] = useState({
        username: "",
        password: ""
    })

    // Destructuring
    const {username, password} = state

    // Context api
    const {isAdmin, setIsAdmin, dropdownClicked, setDropdownClicked} = useContext(UserContext);

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
            if (res.data.mem_role === "admin") {
                setIsAdmin(true)
                authenticate(res,()=>navigate('/administrator-homepage'))
            }else {
                authenticate(res,()=>navigate('/'))
            }
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
        setDropdownClicked(false)
        document.body.classList.add('signin-page');
        return () => {
            document.body.classList.remove('signin-page');
        };
    }, []);

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
                                placeholder="กรอกชื่อผู้ใช้งาน หรือ อีเมล"
                                value={username}
                                onChange={inputValue("username")}
                                />
                            </div>
                            <br/>
                            <div className='lBPwd'>
                                <label className="labelPassword">รหัสผ่าน</label>
                                <label className="linkForgot"><Link to='/forgot-password'>ลืมรหัสผ่าน</Link></label>
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
                                <LoginSocialGoogle
                                // render
                                client_id='487675977490-hbu4phrdsshvjedtsp1j94urp0ec8fj8.apps.googleusercontent.com'
                                // vercel
                                // client_id='487675977490-j8orkt7qj9cis7htae05btgbca0kjg2d.apps.googleusercontent.com'
                                    scope='openid profile email'
                                    discoveryDocs='claims_supported'
                                    access_type='online'
                                    onResolve={async ({ provider, data }) => {
                                        const email = data.email
                                        const imageUrl = data.picture
                                        const givenName = data.given_name
                                        const familyName = data.family_name

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
                                                "เกิดข้อผิดพลาด",
                                                'error'
                                            )
                                        })
                                    }}
                                    onReject={(err) => {
                                        Swal.fire(
                                            'แจ้งเตือน',
                                            "เกิดข้อผิดพลาด",
                                            'error'
                                        )
                                    }}>
                                        <button className='bt_lwg' type="button"><FcGoogle className="iconGoogle"/>เข้าสู่ระบบผ่าน google</button>
                                </LoginSocialGoogle>
                            </div>
                        <p className='plc_pvr'>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการของ <Link to="/term-of-service" >Kabiixoo</Link> และ <Link to="/term-of-service">นโยบายความเป็นส่วนตัว</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
}

