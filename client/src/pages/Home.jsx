import React from 'react';
import Select from 'react-select';
import { useEffect, useState, useRef } from 'react';
import {FaSearch} from 'react-icons/fa'
import SearchBar from '../components/SearchBar';
import '../pages/Home.css'
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import AnimatedPage from "../AnimatedPage";

const Home = () => {
    // เลื่อนหน้าจอ
    const providerListBoxRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(false)

    // บริการ จาก child
    const [servicesArr, setServicesArr] = useState([])

    const [searchText, setSearchText] = useState(false)

    // แสดงผู้ให้บริการเพิ่มเติมเมื่อ 9 คนขึ้นไป
    const [showMoreCount, setShowMoreCount] = useState(3);

    useEffect(() => {
        document.body.classList.add('home-page');
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);


    // รับข้อมูลจาก child
    const handleDataFromChild = (data) => {
        setServicesArr(data)
    }

    // รับค่าแสดงผลคำหลังค้นหา
    const handleOnSearch = (data) => {
        setSearchText(data)
    }

    // เมื่อ searchText เป็น true
    useEffect(() => {
        const handleScrollToProviderListBox = () => {
            if (providerListBoxRef.current) {
                providerListBoxRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };
    
        // เมื่อ searchText เป็น true ให้ทำการเลื่อนหน้าจอมาที่ div ที่มี className เป็น "home-provider-list-box"
        if (searchText) {
            handleScrollToProviderListBox();
        }
    }, [searchText]);

    return (
        <AnimatedPage>
            <div className='home'>
                <div className='xtf'>
                    <h1 className='text-find'>ค้นหาผู้ให้บริการ<br/>ที่ตรงตามความต้องการของคุณได้เลย</h1>
                </div>
                <SearchBar onDataSend={handleDataFromChild} onSearch={handleOnSearch}/>
                <div ref={providerListBoxRef} className={searchText ? 'home-provider-list-box' : "home-provider-list-box-none"}>
                    { searchText && <label className='home-title'>รายการผู้ให้บริการจากการค้นหา</label>}
                    <div className='home-provider-list'>
                        { searchText && servicesArr.length > 0 ? 
                            servicesArr.slice(0, showMoreCount).map((item) => (
                                <Link to={`/provider-profile/${item.svp_slug}`} className='home-link'>
                                    <div className='home-provider-item' role='button' key={item._id}>
                                        <div className='home-provider-img-box'>
                                            <img src={item.svp_img1 ? item.svp_img1 : "https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg"}/>
                                        </div>
                                        <div className='home-provider-info-box'>
                                            <div className='home-business-name-box'>
                                                <label className='home-business-name'>{item.svp_name}</label>
                                                <div className={item.svp_verified ? 'home-confirm-business-sign' : 'home-confirm-business-sign-none'}>
                                                    <img src={require("../images/providerHomePage/confirmIcon.png")}/>
                                                    <label>มีหน้าร้าน</label>
                                                </div>
                                            </div>
                                            <div className='home-star-box'>
                                                <div>
                                                    {Array.from({length: item.svp_point}, (_,index) =>{
                                                        return <img className="home-star" src={require("../images/providerServiceProfilePage/starIcon.png")}/>;
                                                    })}
                                                </div>
                                                <div className="home-province-box">
                                                    <img src={require("../images/providerServiceProfilePage/locationIcon.png")}/>
                                                    <label>{item.svp_province}</label>
                                                </div>
                                            </div>
                                            <p>
                                                {item.svp_introduce}
                                            </p>
                                            <div className='home-contact-box'>
                                                <img className={item.svp_havePhone ? "home-phone-display" : "home-phone-display-none"} src={require("../images/providerServiceProfilePage/phoneIcon.png")}/>
                                                <img className={item.svp_facebook ? "home-facebook-display" : "home-facebook-display-none"} src={require("../images/providerServiceProfilePage/facebookIcon.png")}/>
                                                <img className={item.svp_instagram ? "home-instagram-display" : "home-instagram-display-none"} src={require("../images/providerServiceProfilePage/instagramIcon.png")}/>
                                                <img className={item.svp_line ? "home-line-display" : "home-line-display-none"} src={require("../images/providerServiceProfilePage/lineIcon.png")}/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )) : 
                            <div className='home-notFound'>
                                <img src={require('../images/notFound.png')}/>
                                <label>ไม่พบข้อมูลผู้ให้บริการ</label>
                            </div>
                        }
                    </div>
                    {servicesArr.length > showMoreCount && ( 
                        <div className='home-showMore-box'>
                            <button className='home-showMore-button' onClick={() => setShowMoreCount(prevCount => prevCount + 9)}>
                                แสดงผู้ให้บริการเพิ่ม
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={!searchText ? "home-footer-none" : "home-footer"}>
                <Footer/>
            </div>
        </AnimatedPage>
    );
};

export default Home;