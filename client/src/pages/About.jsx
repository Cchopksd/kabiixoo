import React, { useEffect, useRef, useState, useContext } from 'react';
import AnimatedPage from '../AnimatedPage';
import './About.css'
import Footer from '../components/Footer'
import UserContext from '../contexts/UserProvider';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

const About = () => {

    const userName = useRef(null);
    const userEmail = useRef(null);
    const userMessage = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');


    const { dropdownClicked, setDropdownClicked } = useContext(UserContext);

    useEffect(() => {
        setDropdownClicked(false)
        document.body.classList.add('about-page');
        return () => {
            document.body.classList.remove('about-page');
        };
    }, []);

    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!name) {
            // setNameError('Name is required');\
            Swal.fire({
                title: 'กรอกชื่อและนามสกุล',
                timer: 1500,
            })
        }

        else if (!email) {
            //setEmailError('Email is required');
            Swal.fire({
                title: 'กรอกอีเมล',
                timer: 1500,
            })
        }
        else if (!isValidEmail(email)) {
            //setEmailError('Invalid email format');
            Swal.fire({
                title: 'รูปแบบอีเมลไม่ถูกต้อง',
                timer: 1500,
            })
        }

        else if (!content) {
            // setNameError('Name is required');
            Swal.fire({
                title: 'กรอกรายละเอียด',
                timer: 1500,
            })
        }

        if (name && email && isValidEmail(email) && content) {
            emailjs.sendForm('service_d5jffbg', 'template_gubz1xy', form.current, 'B8xFvKx2Y1ta4yhOt')
            .then((result) => {
                Swal.fire({
                    title: 'แบบฟอร์มถูกส่งเรียบร้อยแล้ว',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                })
                setName('');
                setEmail('');
                setContent('');
            }, (error) => {
                console.log(error.text);
            });
        }

    };

    const isValidEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(value);
    };


    return (
        <AnimatedPage>
            <div className='about-container'>
                <label className='about-header-text'>เกี่ยวกับเรา KabiiXoo</label>
                <div className='about-content-box'>
                    <img src={require("../images/aboutUsPage/universityLogo.png")} />
                    <p>
                        เว็บไซต์นี้จัดทำขึ้นมาเพื่อใช้เป็นโครงงานในการจบการศึกษาของพวกเราทีม KabiiXoo ครับ ซึ่งมีสมาชิกในทีมด้วยกันทั้งหมด 3 คน โดยเว็บไซต์นี้จะเป็นศูนย์กลางข้อมูลการรับฝากสัตว์เลี้ยงและการบริการ
                        เกี่ยวกับสัตว์ รวมถึงช่วยในการเป็นสื่อกลางให้กับลูกค้า และ ผู้ให้บริการ ในการเลือกใช้บริการรับฝากสัตว์เลี้ยง ซึ่งหวังว่าเว็บไซต์ นี้จะเป็นประโยชน์ แก่ผู้ที่ใช้งานเว็บไซต์ ไม่ว่าจะเป็น ทั้งบุคคลธรรมดา หรือ บุคคลที่เป็น เจ้าของ ธุรกิจด้านการรับเลี้ยงสัตว์เลี้ยง ทีมผู้จัดทำขอขอบคุณครับ
                    </p>
                </div>

                <label className='about-subheader-text'>ทีมผู้จัดทำเว็บไซต์</label>
                <div className='about-team-box'>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/soting.png')} />
                        <label className='about-team-name'>นายชินาธิป ไชยถาวร</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/chopper.jpg')} />
                        <label className='about-team-name'>นายกษิดิศ สุวรรณฤทธิ์เดช</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/ohm.png')} />
                        <label className='about-team-name'>นายยุรนันท์ เจิดรุจิกุล</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                </div>

                <label className='about-header-text'>ติดต่อผู้ให้บริการ</label>
                <form className='form-contact' ref={form} onSubmit={sendEmail}>
                    <div className='contact-column'>
                        <label className='label-contact'>ชื่อจริงและนามสกุล</label>
                        <input ref={userName} className='input-contact' onChange={(e) => setName(e.target.value)} value={name} name="name" />
                    </div>
                    <div className='contact-column'>
                        <label className='label-contact'>ที่อยู่อีเมล</label>
                        <input ref={userEmail} className='input-contact' onChange={(e) => setEmail(e.target.value)} value={email} name="recipient" />
                        {/* {emailError && <span className="error">{emailError}</span>} */}
                    </div>
                    <div className='contact-column'>
                        <label className='label-contact'>ข้อความที่ต้องการติดต่อเรา</label>
                        <textarea className='input-contact textArea' onChange={(e) => setContent(e.target.value)} value={content} name="message" />
                    </div>
                    <input ref={userMessage} className='submit-contact' type="submit" name="message" value='ยืนยัน' />
                </form>
            </div>
            <Footer />
        </AnimatedPage>
    );
}

export default About;