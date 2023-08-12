import React , {useEffect, useState, useContext} from "react";
import "./ProviderServiceProfile.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../services/authorize";
import { getUserId } from "../services/authorize";
import UserContext from "../contexts/UserProvider";
import Loading from '../components/Loading'

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
    // state ของ context api
    const { selectedChat, setSelectedChat, chats, setChats } = useContext(UserContext)

    // url parameter
    const params = useParams()

    // redirect หน้า
    const navigate = useNavigate()

    //useState ต่างๆ
    const [loginId, setLoginId] = useState("")
    const [serviceOwnerId, setServiceOwnerId] = useState("")
    const [serviceName, setServiceName] = useState("");
    const [introduceDesc, setIntroduceDesc] = useState("");
    const [serviceDesc, setServiceDesc] = useState("")
    const [serviceAddress, setServiceAddress] = useState("");
    const [serviceProvince, setServiceProvince] = useState("");

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

    const [servicePhone, setServicePhone] = useState("")
    const [serviceFacebook, setServiceFacebook] = useState("")
    const [serviceInstagram, setServiceInstagram] = useState("")
    const [serviceLine, setServiceLine] = useState("")

    const [providerName, setProviderName] = useState("");
    const [providerImage, setProviderImage] = useState("");
    const [serviceReview, setServiceReview] = useState([]);

    const [reviewArray, setReviewArray] = useState([]);

    const [images, setImages] = useState([])
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")
    const [configImages, setConfigImages] = useState(false)

    // โหลด api
    const [loading, setLoading] = useState(false)

    // แสดงรีวิวเมื่อแสดงรีวิว 5 อันขึ้นไป
    const [showMoreCount, setShowMoreCount] = useState(5);

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        loadData()
        axios.get(`${process.env.REACT_APP_API}/edit-service/${params.slug}`).then((res) => {
            setServiceName(res.data.svp_name)
            setIntroduceDesc(res.data.svp_introduce)
            setServiceDesc(res.data.svp_description)
            setServiceAddress(res.data.svp_address)
            setServiceProvince(res.data.svp_province)
            setConfirmBusiness(res.data.svp_verified)
            setServiceGrooming(res.data.svp_grooming)
            setServicePetWalk(res.data.svp_petWalk)
            setServicePool(res.data.svp_pool)
            setServicePetCar(res.data.svp_carService)
            setServicePetStuff(res.data.svp_petStuff)
            setServiceDog(res.data.svp_haveDog)
            setServiceCat(res.data.svp_haveCat)
            setServiceRabbit(res.data.svp_haveRabbit)
            setServiceBird(res.data.svp_haveBird)
            setServiceRoden(res.data.svp_haveRodent)
            setServiceReptile(res.data.svp_haveReptile)
            setServicePhone(res.data.svp_havePhone)
            setServiceFacebook(res.data.svp_facebook)
            setServiceInstagram(res.data.svp_instagram)
            setServiceLine(res.data.svp_line)
            setProviderName(`${res.data.svp_owner.mem_name} ${res.data.svp_owner.mem_surname}`)
            setProviderImage(res.data.svp_owner.mem_profileImage)
            setServiceOwnerId(res.data.svp_owner._id)

            if(!res.data.svp_img1){
                setImage1('https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg')
                setImage2('https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg')
                setImage3('https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg')
                setImage4('https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg')
            }
            else if (!res.data.svp_img2){
                setImage1(res.data.svp_img1)
                setImage2(res.data.svp_img1)
                setImage3(res.data.svp_img1)
                setImage4(res.data.svp_img1)
            }
            else if (!res.data.svp_img3){
                setImage1(res.data.svp_img1)
                setImage2(res.data.svp_img2)
                setImage3(res.data.svp_img1)
                setImage4(res.data.svp_img2)
            }
            else if (!res.data.svp_img4){
                setImage1(res.data.svp_img1)
                setImage2(res.data.svp_img2)
                setImage3(res.data.svp_img3)
                setImage4(res.data.svp_img1)
            }
            else {
                setImage1(res.data.svp_img1)
                setImage2(res.data.svp_img2)
                setImage3(res.data.svp_img3)
                setImage4(res.data.svp_img4)
            }
            configImages(true)
        }).catch((err) => {
            Swal.fire('แจ้งเตือน',err.response.data.error, 'error')
        })

        axios.get(`${process.env.REACT_APP_API}/review/${params.slug}`,
        {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((res) => {
            setReviewArray(res.data)
        }).catch((err) => {
            Swal.fire('แจ้งเตือน',err.response.data.error, 'error')
        })
    },[])

    // โหลด id ของ คน login
    const loadData = async () => {
        try{
            const id = await getUserId()
            setLoginId(id.data)
        }catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const newArray = [image1, image2, image3, image4];
        setImages(newArray);
        setConfigImages(false)
    },[image1, image2, image3, image4])

    //จัดการกับ chat
    const handleChat = async () => {
        try {
            if (loginId === serviceOwnerId) {
                Swal.fire("แจ้งเตือน", "ไม่สามารถแชทกับผู้ใช้งานคนเดียวกันได้", 'error')
                return
            }
            setLoading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/access-chat`, {loginId, serviceOwnerId},
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
            setSelectedChat(data)
            setLoading(false)
            navigate(`/chats/${loginId}`)
        }catch (error) {
            Swal.fire('แจ้งเตือน', 'ไม่มีผู้ให้บริการรายนี้', 'error')
        }
    }


    // configs ของ slider
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
            breakpoint: 850,
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

    return (
        <div>
            { loading && <Loading/>}
            <div className="ps-profile-container">
                <div className="ps-profile-img-slider-box">
                    <Slider {...settings}>
                        {images.map((item) => (
                            <div className="ps-profile-card">
                                <img src={item} key={item}/>
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
                                <img src={providerImage}/>
                                <label>{providerName}</label>
                            </div>
                            <div className="ps-profile-provider-btn-box">
                                {/* <Link className="ps-profile-link"> */}
                                    <div className="ps-profile-provider-chat-btn" role="button" onClick={handleChat}>
                                        <img src={require("../images/providerServiceProfilePage/chatIcon.png")}/>
                                        <label>แชทกับผู้ให้บริการ</label>
                                    </div>
                                {/* </Link> */}
                                <Link className="ps-profile-link" to={`/report-provider/${params.slug}`}>
                                    <div className="ps-profile-provider-report-btn" role="button">
                                        <img src={require("../images/providerServiceProfilePage/fileIcon.png")}/>
                                        <label>รายงานผู้ให้บริการ</label>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="ps-profile-part-4">
                        <div className="ps-profile-review-header">
                            <div>
                                <label className="ps-profile-title">{reviewArray.length}</label>
                                <label className="ps-profile-title">&emsp;การรีวิวและให้คะแนน</label>
                            </div>
                            <Link className="ps-profile-link" to={`/review/${params.slug}`}>
                                <div className="ps-profile-provider-review-btn" role="button">
                                    <img src={require("../images/providerServiceProfilePage/starIcon.png")}/>
                                    <label>เขียนรีวิว</label>
                                </div>
                            </Link>
                        </div>
                        <div className="ps-profile-review-content">
                            {reviewArray.slice(0, showMoreCount).map((item) => (
                                <div className="ps-profile-review-content-display">
                                    <div>
                                        {console.log(item.customer_id)}
                                        <img className="ps-profile-customer-image" src={item.customer_id.mem_profileImage} key={item.customer_id.mem_profileImage}/>
                                        <div className="ps-profile-review-content-name-display">
                                            <label key={item.customer_id.mem_name}>{`${item.customer_id.mem_name} ${item.customer_id.mem_surname}`}</label>
                                            <div>
                                                {Array.from({length: item.rev_point}, (_,index) =>{
                                                    return <img key={index} className="ps-profile-review-content-star" src={require("../images/providerServiceProfilePage/starIcon.png")}/>;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p key={item.rev_description}>{item.rev_description}</p>
                                    </div>
                                </div>
                            ))}
                            {reviewArray.length > showMoreCount && ( 
                                <div className='ps-profile-review-showMore-box'>
                                    <button className='ps-profile-reviewMore-button' onClick={() => setShowMoreCount(prevCount => prevCount + 9)}>
                                        แสดงรีวิวเพิ่ม
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProviderServiceProfile ;