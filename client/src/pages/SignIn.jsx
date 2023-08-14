import React, { useEffect, useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import '../pages/SignIn.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
import { authenticate } from "../services/authorize";
import AnimatedPage from "../AnimatedPage";

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
                                <button className='bt_lwg' type="button"><FcGoogle className="iconGoogle"/>เข้าสู่ระบบผ่าน google</button>
                            </div>
                        <p className='plc_pvr'>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการของ <Link to="/term-of-service" >Kabixoo</Link> และ <Link to="/term-of-service">นโยบายความเป็นส่วนตัว</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
}

