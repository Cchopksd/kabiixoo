import React, {useEffect} from 'react';
import AnimatedPage from '../AnimatedPage';
import './About.css'
import Footer from '../components/Footer'

const About = () => {

    useEffect(() => {
        document.body.classList.add('about-page');
        return () => {
            document.body.classList.remove('about-page');
        };
    }, []);

    return (
        <AnimatedPage>
            {/* <div className='about-background-container'>
                <img src={require('../images/aboutUsPage/background.jpg')}/>
            </div> */}
            <div className='about-container'>
                <label className='about-header-text'>เกี่ยวกับเรา KabiiXoo</label>
                <div className='about-content-box'>
                    <img src={require("../images/aboutUsPage/universityLogo.png")}/>
                    <p>
                        เว็บไซต์นี้จัดทำขึ้นมาเพื่อใช้เป็นโครงงานในการจบการศึกษาของพวกเราทีม KabiiXoo ครับ ซึ่งมีสมาชิกในทีมด้วยกันทั้งหมด 3 คน โดยเว็บไซต์นี้จะเป็นศูนย์กลางข้อมูลการรับฝากสัตว์เลี้ยงและการบริการ
                        เกี่ยวกับสัตว์ รวมถึงช่วยในการเป็นสื่อกลางให้กับลูกค้า และ ผู้ให้บริการ ในการเลือกใช้บริการรับฝากสัตว์เลี้ยง ซึ่งหวังว่าเว็บไซต์ นี้จะเป็นประโยชน์ แก่ผู้ที่ใช้งานเว็บไซต์ ไม่ว่าจะเป็น ทั้งบุคคลธรรมดา หรือ บุคคลที่เป็น เจ้าของ ธุรกิจด้านการรับเลี้ยงสัตว์เลี้ยง ทีมผู้จัดทำขอขอบคุณครับ
                    </p>
                </div>
                <label className='about-subheader-text'>ทีมผู้จัดทำเว็บไซต์</label>
                <div className='about-team-box'>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/soting.png')}/>
                        <label className='about-team-name'>นายชินาธิป ไชยถาวร</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/chopper.jpg')}/>
                        <label className='about-team-name'>นายกษิดิศ สุวรรณฤทธิ์เดช</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                    <div className='about-team-single'>
                        <img src={require('../images/aboutUsPage/ohm.png')}/>
                        <label className='about-team-name'>นายยุรนันท์ เจิดรุจิกุล</label>
                        <div className='about-team-content'>
                            <label>นักศึกษาชั้นปีที่ 4</label>
                            <label>สาขา วิทยาการคอมพิวเตอร์</label>
                            <label>มหาวิทยาลัยกรุงเทพ</label>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}

export default About;