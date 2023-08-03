import React from 'react';
import Select from 'react-select';
import { useEffect,useState} from 'react';
import {FaSearch} from 'react-icons/fa'
import SearchBar from '../components/SearchBar';
import '../pages/Home.css'
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {

    // บริการ จาก child
    const [servicesArr, setServicesArr] = useState([])

    const [searchText, setSearchText] = useState(false)

    const providerArray = [
        {
            id : 1,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 5,
            province: "กรุงเทพมหานคร",
            confirmBusiness: false,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: true,
            facebook: true,
            instagram: false,
            line: true,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id : 2,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 2,
            province: "กรุงเทพมหานคร",
            confirmBusiness: true,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: true,
            facebook: true,
            instagram: true,
            line: true,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id : 3,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 4,
            province: "กรุงเทพมหานคร",
            confirmBusiness: false,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: false,
            facebook: true,
            instagram: false,
            line: true,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id : 4,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 1,
            province: "กรุงเทพมหานคร",
            confirmBusiness: true,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: true,
            facebook: false,
            instagram: true,
            line: true,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id : 5,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 3,
            province: "กรุงเทพมหานคร",
            confirmBusiness: true,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: true,
            facebook: true,
            instagram: false,
            line: false,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id : 6,
            businessName : "รับฝากน้องแมวทุกสายพันธ์ By Ally",
            point: 5,
            province: "กรุงเทพมหานคร",
            confirmBusiness: true,
            introduceDesc: "สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ",
            phone: true,
            facebook: true,
            instagram: false,
            line: true,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
    ]

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

    // คลิก เลือกบริการ
    const selectedService = (slug) => {

    }

    return (
        <div>
            {/* <Navbar/> */}
            <div className='home'>
                <div className='xtf'>
                    <h1 className='text-find'>ค้นหาผู้ให้บริการ<br/>ที่ตรงตามความต้องการของคุณได้เลย</h1>
                </div>
                <SearchBar onDataSend={handleDataFromChild} onSearch={handleOnSearch}/>
                <div className={searchText ? 'home-provider-list-box' : "home-provider-list-box-none"}>
                    { searchText && <label className='home-title'>รายการผู้ให้บริการจากการค้นหา</label>}
                    <div className='home-provider-list'>
                        { searchText && servicesArr.length > 0 ? 
                            servicesArr.map((item) => (
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
                </div>
            </div>
            <div className={!searchText ? "home-footer-none" : "home-footer"}>
                <Footer/>
            </div>
        </div>
    );
};

export default Home;