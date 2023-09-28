import React, { useEffect, useState, useContext } from "react";
import "../pages/Article.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Loading from "../components/Loading"
import AnimatedPage from "../AnimatedPage";
import UserContext from '../contexts/UserProvider';

const Article = () => {

    // โหลดหน้า
    const [loading, setLoading] = useState(false)

    // state ของ contextAPI
    const {dropdownClicked, setDropdownClicked} = useContext(UserContext);

    // เมื่อเข้าสู้หน้า
    useEffect(() => {
        setDropdownClicked(false)
    },[])

    return(
        <AnimatedPage>
            {loading && <Loading/>}
            {/* <AnimatedPage> */}
                <div className="container">
                    <div className="title">
                        <label className="title-style">บทความเกี่ยวกับสัตว์เลี้ยง</label>
                    </div>
                    <div className="article-container">
                        <div className="article-card">
                            <img className="img-style" src={require("../images/articlePage/popularPet.png")}/>
                            <label className="topic-title">ความนิยมการเลี้ยงสัตว์เลี้ยง</label>
                            <p className="desciption">
                                ถ้าพูดถึงเรื่องของครอบครัวนั้น การตั้งเป้าหมายในชีวิตด้านครอบครัวของใครหลาย ๆ คนนั้นอาจจะเป็น การมีลูกหลานเพื่อสืบต่อกันไป แต่กับกลุ่มคนบางกลุ่มอาจจะไม่ได้มีเป้าหมายนั้นครับ คนบางคนอาจจะไม่ได้ ต้องการที่จะมีลูกในปัจจุบันด้วยปัจจัยหลาย ๆ อย่าง แต่พวกเขาอาจจะต้องการสัตว์เลี้ยงสักตัวเพื่อมาเติม เต็มความเป็นครอบครัวที่เปรียบเสมือนลูกให้กับตัวเอง เนื่องจากวิธีการดำรงชีวิตของปัจจุบันนั้นแตกต่าง ไปจากอดีต ทำให้คนมีความคิดต่าง ๆ ที่ใหม่และแตกต่างจากก่อน
                            </p>
                            <Link to='/article-3'><button className="read-button">อ่านบทความ</button></Link>
                        </div>
                        <div className="article-card">
                            <img className="img-style" src={require("../images/articlePage/petBoarding.png")}/>
                            <label className="topic-title">การให้บริการรับฝากสัตว์เลี้ยง</label>
                            <p className="desciption">
                                บริการรับฝากสัตว์เลี้ยงในไทยหมายถึงบริการที่ให้เจ้าของสัตว์เลี้ยงส่งสัตว์เข้ามาในสถานที่ที่มีผู้ดูแลเพื่อ ดูแลสัตว์เลี้ยง ซึ่งบริการรับฝากสัตว์เลี้ยงมีหลายรูปแบบ รวมถึงศูนย์รับฝากสัตว์เลี้ยง, โรงแรมสัตว์เลี้ยง, บ้านเลี้ยงสัตว์, และบริการดูแลสัตว์เลี้ยงที่บ้านของผู้ให้บริการ บริการเหล่านี้อาจมีค่าใช้จ่ายและเงื่อนไขที่ แตกต่างกันไปตามสถานที่และบริการที่เลือกใช้
                            </p>
                            <Link to='/article-2'><button className="read-button">อ่านบทความ</button></Link>
                        </div>
                        <div className="article-card card-3">
                            <img className="img-style" src={require("../images/articlePage/petDisease.png")}/>
                            <label className="topic-title">โรคภัยไข้เจ็บของสัตว์เลี้ยง</label>
                            <p className="desciption">
                                ในปัจจุบันเราจะพบว่า ความนิยมในการเลี้ยงสัตว์เลี้ยงเพิ่มมากขึ้น โดยเฉพาะน้องหมาน้องแมว และรวมไป ถึงสัตว์เลี้ยงพิเศษต่างๆ ซึ่งบทความนี้เราจะพาเจ้าของสัตว์เลี้ยงไปทำความรู้จักกับการป้องกันโรคใกล้ตัว ของสัตว์เลี้ยงกันครับ โดยบทความนี้จะพูดถึงแค่ส่วนน้องหมาน้องแมวเท่านั้นครับ ทั้งนี้การป้องกันโรคใน บทความนี้ใช้ข้อมูลอ้างอิงตามปัจจุบันนะครับ ประเทศไทยเป็นประเทศที่อากาศเปลี่ยนแปลงบ่อยเดี๋ยว อากาศร้อนบ้างฝนบ้าง อาจส่งผลให้สัตว์เลี้ยงเกิดอาการเจ็บป่วยได้ เจ้าของสัตว์เลี้ยงจึงจำเป็นต้องคอย สังเกตและใส่ใจสัตว์เลี้ยงเป็นพิเศษ นอกจากเรื่อง เห็บ หมัด ที่ทำให้ปวดหัวอยู่บ่อย ๆ
                            </p>
                            <Link to='/article-1'><button className="read-button">อ่านบทความ</button></Link>
                        </div>
                    </div>
                </div>
            {/* </AnimatedPage>           */}
            <Footer/>
        </AnimatedPage>
    );
}

export default Article;