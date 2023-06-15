import React , {useState} from "react";
import "./ProviderServiceProfile.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"

const SampleNextArrow = ({onClick}) => {
    return (
        <div className="arrow arrow-right" onClick={onClick}>
            <IoIosArrowForward/>
        </div>
    );
}

const SamplePrevArrow = ({onClick}) => {
    return (
        <div className="arrow arrow-left" onClick={onClick}>
            <IoIosArrowBack/>
        </div>
    );
}

const ProviderServiceProfile = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
            breakpoint: 1260,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 780,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    };

    // dummy data
    const imgArray = [
        {
            id: 1,
            imgPath: "https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg"
        },
        {
            id: 2,
            imgPath: "https://www.flytap.com/-/media/Flytap/new-tap-pages/travelling-with-animals/pets/flying-with-pets-og-image-1200x630.jpg"
        },
        {
            id: 3,
            imgPath: "https://www.thesprucepets.com/thmb/Cnp-fNbwbXVavQgjuUsCMSCk-m8=/1500x0/filters:no_upscale():strip_icc()/exotic-pets-for-apartment-living-1238589-hero-6bd87a75363e4da4b38f6c244644b1db.jpg"
        },
        {
            id: 4,
            imgPath: "https://cdn.shopify.com/s/files/1/0095/4253/3179/files/mobile-banne_-new.jpg?v=1614330110"
        }
    ];

    const reviewArray = [
        {
            customerName : "สมหมาย ภักดี",
            reviewPoint : 1,
            reviewDesc : "คุณแอลลี่ บริการดีเป็นกันเองมากครับ คุยง่าย น้องแมวของผมไม่เหงาเลยในตอนที่ผมต้องไปต่างจังหวัด แล้วฝากน้องไว้กับคุณแอลลี่ น้องอยู่สบายไม่ลำบาก น้องสบายตัวด้วยได้อาบน้ำตอนอากาศร้อนๆแบบนี้ เอาไปเลย 5 ดาวครับ",
            profileImg : "../images/dummy_profileImage.png"
        },
        {
            customerName : "สมหมาย ภักดี",
            reviewPoint : 2,
            reviewDesc : "คุณแอลลี่ บริการดีเป็นกันเองมากครับ คุยง่าย น้องแมวของผมไม่เหงาเลยในตอนที่ผมต้องไปต่างจังหวัด แล้วฝากน้องไว้กับคุณแอลลี่ น้องอยู่สบายไม่ลำบาก น้องสบายตัวด้วยได้อาบน้ำตอนอากาศร้อนๆแบบนี้ เอาไปเลย 5 ดาวครับ",
            profileImg : "../images/dummy_profileImage.png"
        },
        {
            customerName : "ยุรนันท์ เจิดรุจิกุล",
            reviewPoint : 1,
            reviewDesc : "ควย",
            profileImg : "../images/dummy_profileImage.png"
        }
    ];

    //useState ต่างๆ
    const [serviceName, setServiceName] = useState("รับฝากน้องแมวทุกสายพันธ์ By Ally");
    const [introduceDesc, setIntroduceDesc] = useState("สวัสดีค่ะ ชื่อแอลลี่นะคะ แอลลี่เป็นคนรักน้องแมวมากๆ ตั้งแต่เด็กแล้วคะ ตอนนี้เลี้ยงน้องแมวที่บ้านไว้อยู่ 3 ตัว ชื่อ น้องส้ม น้องชาไทย และ น้องคิงคอง น้องๆสามตัวที่บ้าน สนิทเป็นกันเองมาก น้องๆพร้อมตอนรับน้องแมว ที่จะมาอยู่ ด้วยกันเป็นเพื่อนๆ ไม่ให้ น้องแมวที่มาใช้ บริการ เหงานะคะ ถ้าท่านไหนสนใจใช้บริการสามารถเข้ามา พูดคุยกันก่อนได้ค่ะ"); 
    const [serviceDesc, setServiceDesc] = useState("ตอนนี้ที่บ้านรับฝากน้องแมวทุกสายพันธ์เลยคะ ราคาเริ่มต้นต่อคืนจะอยู่ที่คืนละ 500 บาท\nมีรายละเอียดของน้องแมวที่จะเข้ารับฝากตามนี้คะ\nน้องแมวฉีดวัคซีนครบแล้ว\nน้องแมวไม่ดุหรือทำร้ายแมวตัวอื่นๆ\nน้องแมวมีอายุ 4 เดือนขึ้นไป\nน้องแมวไม่มีโรคประจำตัว\nเจ้าของต้องเตรียมอาหารน้องแมวมาเองตามจำนวนวันที่เข้ารับฝาก\nมีบริการเพิ่มเติมคือ บริการกรูมมิ่ง หรือ อาบน้ำให้กับน้องแมวคะ และถ้าลูกค้าไม่ได้นำอาหารมาให้น้องแมวสามารถซื้ออาหารที่นี่ได้คะ ถ้าสนใจหากเกิดเหตุฉุกเฉินกับน้องแมวจะรับพาไปยังโรงพยาบาลสัตว์ที่ใกล้ที่สุดเพื่อความปลอดภัยของน้องแมวคะ และจะรีบติดต่อกับเจ้าของให้เร็วที่สุด");
    const [serviceAddress, setServiceAddress] = useState("64/123 ซอยหทัยราษฎร์64 ถนนหทัยราษฎร์ เขตคลองสามวา แขวงสามวาตะวันตก กรุงเทพมหาคร 10510");
    const [serviceProvince, setServiceProvince] = useState("กรุงเทพมหานคร");

    const [confirmBusiness, setConfirmBusiness] = useState(true);

    const [serviceGrooming, setServiceGrooming] = useState(true);
    const [servicePetWalk, setServicePetWalk] = useState(false);
    const [servicePool, setServicePool] = useState(false);
    const [servicePetCar, setServicePetCar] = useState(true);
    const [servicePetStuff, setServicePetStuff] = useState(true);

    const [serviceDog, setServiceDog] = useState(true);
    const [serviceCat, setServiceCat] = useState(true);
    const [serviceRabbit, setServiceRabbit] = useState(false);
    const [serviceBird, setServiceBird] = useState(false);
    const [serviceRoden, setServiceRoden] = useState(false);
    const [serviceReptile, setServiceReptile] = useState(false);

    const [servicePhone, setServicePhone] = useState("0834567642")
    const [serviceFacebook, setServiceFacebook] = useState("รับฝากน้องแมว By Ally")
    const [serviceInstagram, setServiceInstagram] = useState("รับฝากน้องแมว By Ally")
    const [serviceLine, setServiceLine] = useState("@catloverally")

    const [providerName, serProviderName] = useState("สายฝน ล่องทิพย์");
    const [serviceReview, setServiceReview] = useState([]);


    return (
        <div className="ps-profile-container">
            <div className="ps-profile-img-slider-box">
                <Slider {...settings}>
                    {imgArray.map((item) => (
                        <div className="ps-profile-card">
                            <img src={item.imgPath}/>
                        </div>
                    ))}
                </Slider>
                <div className="ps-profile-header-box">
                    <div className="ps-profile-name-box">
                        <label className="ps-profile-business-name">{serviceName}</label>
                        <div className={confirmBusiness ? "ps-profile-confirm-business-sign" : "ps-profile-confirm-business-sign-none"}>
                            <img src={require("../images/providerHomePage/confirmIcon.png")}/>
                            <label>มีหน้าร้าน</label>
                        </div>
                    </div>
                    <div className="ps-profile-province-box">
                        <img src={require("../images/providerServiceProfilePage/locationIcon.png")}/>
                        <label>{serviceProvince}</label>
                    </div>
                </div>
                <div className="ps-profile-part-1">
                    <div className="ps-profile-introduce-box">
                        <label className="ps-profile-title">คำแนะนำตัว</label>
                        <p>{introduceDesc}</p>
                    </div>
                    <div className="ps-profile-serviceDesc-box">
                        <label className="ps-profile-title">รายละเอียดการให้บริการ</label>
                        <p>{serviceDesc}</p>
                    </div>
                    <div className="ps-profile-serviceAddress-box">
                        <label className="ps-profile-title">ที่ตั้งของผู้ให้บริการ</label>
                        <p>{serviceAddress}</p>
                    </div>
                </div>
                <div className="ps-profile-part-2">
                    <div className="ps-profile-moreService-box">
                        <label className="ps-profile-title">บริการเพิ่มเติม</label>
                        <div className="ps-profile-moreService-item">
                            <div className={serviceGrooming ? "ps-profile-moreService-display" : "ps-profile-moreService-display-none"}>
                                <label>บริการกรูมมิ่ง (อาบน้ำตัดขน)</label>
                            </div>
                            <div className={servicePetWalk ? "ps-profile-moreService-display" : "ps-profile-moreService-display-none"}>
                                <label>พาสัตว์เลี้ยงเดินเล่น</label>
                            </div>
                            <div className={servicePool ? "ps-profile-moreService-display" : "ps-profile-moreService-display-none"}>
                                <label>สระว่ายน้ำสัตว์เลี้ยง</label>
                            </div>
                            <div className={servicePetCar ? "ps-profile-moreService-display" : "ps-profile-moreService-display-none"}>
                                <label>รถรับส่งสัตว์เลี้ยง</label>
                            </div>
                            <div className={servicePetStuff ? "ps-profile-moreService-display" : "ps-profile-moreService-display-none"}>
                                <label>อาหารและของใช้สัตว์เลี้ยง</label>
                            </div>
                        </div>
                    </div>
                    <div className="ps-profile-petType-box">
                        <label className="ps-profile-title">ประเภทสัตว์เลี้ยงที่รับฝาก</label>
                        <div className="ps-profile-petType-item">
                            <div className={serviceDog ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>สุนัข</label>
                                <img src={require("../images/createServicePage/dogIcon.png")}/>
                            </div>
                            <div className={serviceCat ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>แมว</label>
                                <img src={require("../images/createServicePage/catIcon.png")}/>
                            </div>
                            <div className={serviceRabbit ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>กระต่าย</label>
                                <img src={require("../images/createServicePage/catIcon.png")}/>
                            </div>
                            <div className={serviceBird ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>นก</label>
                                <img src={require("../images/createServicePage/birdIcon.png")}/>
                            </div>
                            <div className={serviceRoden ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>สัตว์ฟันแทะ</label>
                                <img src={require("../images/createServicePage/rodenIcon.png")}/>
                            </div>
                            <div className={serviceReptile ? "ps-profile-petType-display" : "ps-profile-petType-display-none"}>
                                <label>สัตว์เลื้อยคลาน</label>
                                <img src={require("../images/createServicePage/reptileIcon.png")}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-profile-part-3">
                    <div className="ps-profile-contact-box">
                        <label className="ps-profile-title">ช่องทางการติดต่อ</label>
                        <div className={servicePhone ? "ps-profile-contact-display" : "ps-profile-contact-display-none"}>
                            <img src={require("../images/providerServiceProfilePage/phoneIcon.png")}/>
                            <label>:</label>
                            <label>{servicePhone}</label>
                        </div>
                        <div className={serviceFacebook ? "ps-profile-contact-display" : "ps-profile-contact-display-none"}>
                            <img src={require("../images/createServicePage/facebookIcon.png")}/>
                            <label>:</label>
                            <label>{serviceFacebook}</label>
                        </div>
                        <div className={serviceInstagram ? "ps-profile-contact-display" : "ps-profile-contact-display-none"}>
                            <img src={require("../images/createServicePage/instagramIcon.png")}/>
                            <label>:</label>
                            <label>{serviceInstagram}</label>
                        </div>
                        <div className={serviceLine ? "ps-profile-contact-display" : "ps-profile-contact-display-none"}>
                            <img src={require("../images/createServicePage/lineIcon.png")}/>
                            <label>:</label>
                            <label>{serviceLine}</label>
                        </div>
                    </div>
                    <div className="ps-profile-provider-box">
                        <label className="ps-profile-title">บัญชีผู้ให้บริการ</label>
                        <div className="ps-profile-provider-display">
                            <img src={require("../images/dummy_profileImage.png")}/>
                            <label>{providerName}</label>
                        </div>
                        <div className="ps-profile-provider-btn-box">
                            <div className="ps-profile-provider-chat-btn" role="button">
                                <img src={require("../images/providerServiceProfilePage/chatIcon.png")}/>
                                <label>แชทกับผู้ให้บริการ</label>
                            </div>
                            <div className="ps-profile-provider-report-btn" role="button">
                                <img src={require("../images/providerServiceProfilePage/fileIcon.png")}/>
                                <label>รายงานผู้ให้บริการ</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-profile-part-4">
                    <div className="ps-profile-review-header">
                        <div>
                            <label className="ps-profile-title">{serviceReview.length}</label>
                            <label className="ps-profile-title">&emsp;การรีวิวและให้คะแนน</label>
                        </div>
                        <div className="ps-profile-provider-review-btn" role="button">
                            <img src={require("../images/providerServiceProfilePage/starIcon.png")}/>
                            <label>เขียนรีวิว</label>
                        </div>
                    </div>
                    <div className="ps-profile-review-content">
                        {reviewArray.map((item) => (
                            <div className="ps-profile-review-content-display">
                                <div>
                                    <img src={require("../images/dummy_profileImage.png")}/>
                                    <div className="ps-profile-review-content-name-display">
                                        <label>{item.customerName}</label>
                                        <div>
                                            {Array.from({length: item.reviewPoint}, (_,index) =>{
                                                return <img className="ps-profile-review-content-star" src={require("../images/providerServiceProfilePage/starIcon.png")}/>;
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>{item.reviewDesc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProviderServiceProfile ;