import React, {useEffect, useState, useContext } from 'react';
import { FaStar } from "react-icons/fa";
import "../pages/Review.css";
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, getToken } from "../services/authorize";
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import AnimatedPage from "../AnimatedPage";
import UserContext from '../contexts/UserProvider';

const Review = () => {

    // state ของ contextAPI
    const {dropdownClicked, setDropdownClicked} = useContext(UserContext);

    // redirect
    const navigate = useNavigate()

    // url parameter
    const params = useParams()

    // state ของผู้รีวิว
    const [reviewerId, setReviewerId] = useState("")

    // state ของบริการ
    const [businessName, setBusinessName] = useState("");
    const [providerImage, setProviderImage] = useState("");
    const [reviewDesc, setReviewDesc] = useState("")

    // state เก็บคะแนนรีวิว
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    // state เช็คว่า fetch api
    const [loading, setLoading] = useState(false)

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        setDropdownClicked(false)
        loadData()
    },[])

    const loadData = async () => {
        // ดึงข้อมูล id ของผู้ทำการรีวิว
        try{
            const id = await getUserId()
            setReviewerId(id.data)
        }catch (error) {
            console.error(error);
        }
        // ดึงชื่อประกาศการให้บริการ
        axios.get(`${process.env.REACT_APP_API}/edit-service/${params.slug}`).then((res) => {
            setBusinessName(res.data.svp_name)
            setProviderImage(res.data.svp_owner.mem_profileImage)
        })
    }

    const submitReview = async (event) => {
        event.preventDefault()
        setLoading(true)

        // ส่ง api ไปรีวิว
        await axios.post(`${process.env.REACT_APP_API}/review/${params.slug}`,{
            reviewerId, reviewDesc, rating
        },{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then(async (res) => {
            setLoading(false)
            await Swal.fire('แจ้งเตือน', res.data.message, 'success')
            navigate(`/provider-profile/${params.slug}`)
        }).catch((err) => {
            setLoading(false)
            Swal.fire('แจ้งเตือน', err.response.data.error, 'error')
        })
    }

    return(
        <AnimatedPage>
            { loading && <Loading/>}
            <div className='review-container'>
                <div className='review-title'>
                    <label>ส่งรีวิวหรือคำแนะนำให้กับ</label>
                    <label className='review-business-name'>{businessName}</label>
                </div>
                <div className='review-img-center'>
                    <img className="review-provider-image" src={providerImage}></img>
                </div>
                <div className='review-star-center'>
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (<label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue} 
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <FaStar className="review-star" 
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                            size={35}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                    })}
                </div>
                <div className='review-writeReview-label'>
                    <label>เขียนรีวิว</label>
                </div>
                <div className='review-comment-center'>
                    <textarea className='review-comment-box' rows={5} cols={40} value={reviewDesc} onChange={(event) => {setReviewDesc(event.target.value)}}
                    placeholder='กรอกการรีวิว'/>
                </div>
                <div className='review-center'>
                    <button className='review-button' onClick={submitReview}>ส่งรีวิวและคะแนน</button>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}

export default Review;