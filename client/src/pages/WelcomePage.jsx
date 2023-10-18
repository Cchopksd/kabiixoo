import React from 'react';
import Logo from '../images/kabiixooBanner.png';
import './WelcomePage.css';
import { Link } from 'react-router-dom';
import Pic from '../images/pic2.png';
import IconMessage from '../images/iconMessage.png';
import IconWebSearch from '../images/iconWebSearch.png';
import IconCustomerService from '../images/iconCustomerService.png';
import PersonWithPet from '../images/personWithPet.png';
import Footer from '../components/Footer';

const WelcomePage = () => {
    return (
        <div>
            <main className='wel-container'>
                <section className='wel-sec-1'>
                    <div className='wel-p1'>
                        <img className='wel-Logo' src={Logo} alt="" />
                        <label>เว็บไซต์ศูนย์กลางในการหาผู้ให้บริการที่พร้อม <br /> ดูแลสัตว์เลี้ยงที่คุณรัก</label>
                        <Link className='wel-link-home' to={'/home'}>
                            ค้นหาผู้ให้บริการ
                        </Link>
                    </div>
                    <div>
                        <img src={Pic} className='pic-sec1' alt="" />
                    </div>
                </section>
                <section className='wel-sec-2'>
                    <h1 className='header-sec-2'>ทำไมต้องใช้บริการของเรา</h1>
                    <article className='wel-sec-2-article'>
                        <div className='box-sec-2'>
                            <img className='icon-sec-2' src={IconMessage} alt="" />
                            <p className='sec-2-text'>ติดต่อกับผู้ให้บริการได้โดยตรง</p>
                        </div>
                        <div className='box-sec-2'>
                            <img className='icon-sec-2' src={IconWebSearch} alt="" />
                            <p className='sec-2-text'>การค้นหาบริการที่มีประสิทธิภาพ</p>
                        </div>
                        <div className='box-sec-2'>
                            <img className='icon-sec-2' src={IconCustomerService} alt="" />
                            <p className='sec-2-text'>สามารถติดต่อแอดมินได้ทันที</p>
                        </div>
                    </article>
                </section>
                <section className='wel-sec-3'>
                    <img src={PersonWithPet} alt="" />
                    <div className='sec-3-article'>
                        <article className='sec-3-content'>
                            <h2 className='header-sec-3'>เคยไหมกับปัญหา ?</h2>
                            <p className='sec-3-text'>ในช่วงวันหยุดเทศกาล หรือ ช่วงวันที่ไม่อยู่บ้าน และไม่สามารถ <br className='wel-br-none'/>
                                ดูแลน้องสัตว์เลี้ยงที่เรารักได้ จะหาผู้ที่รับฝากก็ไม่สะดวกและ<br className='wel-br-none'/>
                                ยุ่งยาก KabiiXoo พร้อมให้บริการ ผู้ให้บริการที่หลากหลาย และ<br className='wel-br-none'/>
                                ตรงตามความต้องการของคุณ ที่รวมอยู่ในเว็บไซต์ สามารถ<br className='wel-br-none'/>
                                ใช้บริการฝากสัตว์เลี้ยงได้ทันที ผ่าน KabiiXoo </p>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default WelcomePage;
