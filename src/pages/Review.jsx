import React, {useState } from 'react';
import { FaStar } from "react-icons/fa";
import "../pages/Review.css";

const Review = () => {
    const [businessName, setBusinessName] = useState("สมศักดิ์");

    // state เก็บคะแนนรีวิว
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return(
        <div className='container'>
            <div className='title'>
                <label>ส่งรีวิวหรือคำแนะนำให้กับ</label>
                <label className='business-name'>{businessName}</label>
            </div>
            <div className='img-center'>
                <img className="provider-image" src={require('../images/dummy_profileImage.png')}></img>
            </div>
            <div className='star-center'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (<label>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar className="star" 
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                        size={35}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                })}
            </div>
            <div className='writeReview-label'>
                <label>เขียนรีวิว</label>
            </div>
            <div className='comment-center'>
                <textarea className='comment-box' rows={5} cols={40}/>
            </div>
            <div className='review-center'>
                <button className='review-button'>ส่งรีวิวและคะแนน</button>
            </div>
        </div>
    );
}

export default Review;