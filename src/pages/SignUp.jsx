import React from 'react';
import '../pages/SignUp.css'
import { useRef, useState } from 'react';

const SignUp = () => {

    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    const handleChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <div className='frame-signUp'>
            <div className='backGroundImage'>
                <img className="pic-backGround" src={require('../images/asd.png')}/>
            </div>
                <div className="regisFormContainer">
                    <div className='pvl_1'>
                        <h1 className="lbRegis">สร้างบัญชีผู้ใช้งาน</h1>
                    </div>
                    <form className="signUpFormHorizontal">
                        <div className='largeForm'>

                            <div className='regisName'>
                                <div>
                                    <label className="lbRegisName">ชื่อ</label>
                                </div>
                                <input className="inputRegisName" id="name" type="text" placeholder="กรอกชื่อ" required/>
                            </div>

                            <div className='regisSurname'>
                                <div>
                                    <label className="lbRegisSurName">นามสกุล</label>
                                </div>
                                <input className="inputRegisSurName" id="surName" type="text" placeholder="กรอกนามสกุล" required/>
                            </div>

                            {/* <div className='regisImage'>
                                <button>
                                    Uplode
                                    <input className="inputRegisImage" id="image"  type="file" required/>
                                </button>
                            </div> */}

                            <div className='regisEmail'>
                                <div>
                                    <label className="lbRegisEmail">อีเมลล์</label>
                                </div>
                                <input className="inputRegisEmail" id="email" type="email" placeholder="กรอกอีเมลล์" required />
                            </div>

                            <div className='regisBirthDay'>
                                <div>
                                    <label className="lbRegisBirthDay">วันเกิด</label>
                                </div>
                                <input className='inputBirthDay' type="date" onChange={handleChange} ref={dateInputRef} required/>
                            </div>

                            <div className='regisTel'>
                                <div>
                                    <label className="lbRegisPhone">เบอร์โทรศัพท์</label>
                                </div>
                                <input className="inputRegisPhone" id="phone" type="tel" placeholder="กรอกเบอร์โทรศัพท์" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required/>
                            </div>
                            <div className='regisUsername'>
                                <div>
                                    <label className="lbRegisUsername">ชื่อผู้ใช้งาน</label>
                                </div>
                                <input className="inputRegisUsername" id="username" type="text" placeholder="กรอกชื่อผู้ใช้งาน" required/>
                            </div>
                            <div className='regisPassword'>
                                <div>
                                    <label className="lbRegisPassword">รหัสผ่าน</label>
                                </div>
                                <input className="inputRegisPassword" id="password" type="password" placeholder="กรอกรหัสผ่าน" required/>
                            </div>
                            <div className='regisConfirmPassword'>
                                <div>
                                    <label className="lbRegisConfirmPassword">ยืนยันรหัสผ่าน</label>
                                </div>
                                <input className="inputRegisConfirmPassword" id="confirmPassword" type="password" placeholder="ยืนยันรหัสผ่าน" required/>
                            </div>
                            <div className='regisApprove'>
                                <input className="vehicleApprove" type='checkbox' required/>
                                <label className="lbRegisApprove">ฉันยืนยันว่าได้อ่านและยอมรับ ข้อกำหนดในการให้บริการของ <a href=''>KabiiXoo</a><br /> และ <a href=''>นโยบายความเป็นส่วนตัว</a></label>
                            </div>
                            <div className='regisSubmit'>
                                <input className="inputRegisSubmit" type='submit' value='สมัครสมาชิก'/>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default SignUp;