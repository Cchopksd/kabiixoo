import React, { useEffect, useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import '../pages/SignIn.css';
import { FcGoogle } from "react-icons/fc";

export default function SignIn()  {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            username: data.get('username'),
            password: data.get('password'),
        }

        // fetch("http://localhost:3333/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(jsonData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log("Success:", data);
        // })
        // .catch ((error) => {
        //     console.error("Error:", error);
        // });
        async function postJSON(data) {
            try {
                const response = await fetch("http://localhost:3333/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            });

            const data = await response.json();
            if (data.status == "ok") {
                localStorage.setItem('token',data.token)
                window.location = '/src/pages/Home.jsx'
                alert("login successful")
            } else {
                alert("login failed")
            }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        postJSON(data);
    };

    useEffect(() => {
        document.body.classList.add('signin-page');
        return () => {
            document.body.classList.remove('signin-page');
        };
    }, []);

    return (
        <div className="loginFormContainer">
            <form className="login_form" onSubmit={handleSubmit}>
                <div className='loginForm'>
                    <div className='lBUser'>
                        <label className="labelUsername">ชื่อผู้ใช้งาน</label>
                        <label className="linkSignUp">ยังไม่มีบัญชี <Link to='/SignUp'>สมัครสมาชิก</Link></label>
                    </div>
                    <div className='inputUsername'>
                        <input className="inputTextUsername"
                        name="username"
                        type="text"
                        placeholder="กรอกชื่อผู้ใช้งาน"
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
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
                <p className='plc_pvr'>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการของ <Link to="https://chat.openai.com/" target="_blank" >Kabixoo</Link> และ <Link to=" ">นโยบายความเป็นส่วนตัว</Link></p>
                </div>
            </form>
        </div>
    );
}

