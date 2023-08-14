import React from "react";
import "./ArticleThree.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"
import {Link } from 'react-router-dom';
import Footer from "../components/Footer";
import AnimatedPage from "../AnimatedPage";

const SampleNextArrow = ({onClick}) => {
    return (
        <div className="article-3-arrow article-3-arrow-right" onClick={onClick}>
            <IoIosArrowForward/>
        </div>
    );
}

const SamplePrevArrow = ({onClick}) => {
    return (
        <div className="article-3-arrow article-3-arrow-left" onClick={onClick}>
            <IoIosArrowBack/>
        </div>
    );
}

const ArticleThree = () => {

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

    const imgArray = [
        {
            id: 1,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/d9491d7394.webp"
        },
        {
            id: 2,
            imgPath: "https://img.pptvhd36.com/thumbor/2021/12/07/7d1cb5d3ec.webp"
        },
        {
            id: 3,
            imgPath: "https://www.brandbuffet.in.th/wp-content/uploads/2021/10/Pet-Humanization_Cat-Lover_1.jpg"
        },
        {
            id: 4,
            imgPath: "https://www.brandbuffet.in.th/wp-content/uploads/2021/10/Pet-Humanization_Pet-Food_2.jpg"
        }
    ];
    return (
        <AnimatedPage>
            <div className="article-3-container">
                <label className="article-3-header-label">ความนิยมการเลี้ยงสัตว์เลี้ยง</label>
                <img src={require("../images/articleThreePage/headerImg.png")}/>
                <p>
                    ถ้าพูดถึงเรื่องของครอบครัวนั้น การตั้งเป้าหมายในชีวิตด้านครอบครัวของใครหลาย ๆ คนนั้นอาจจะเป็น
                    การมีลูกหลานเพื่อสืบต่อกันไป แต่กับกลุ่มคนบางกลุ่มอาจจะไม่ได้มีเป้าหมายนั้นครับ คนบางคนอาจจะไม่ได้
                    ต้องการที่จะมีลูกในปัจจุบันด้วยปัจจัยหลาย ๆ อย่าง แต่พวกเขาอาจจะต้องการสัตว์เลี้ยงสักตัวเพื่อมาเติม
                    เต็มความเป็นครอบครัวที่เปรียบเสมือนลูกให้กับตัวเอง เนื่องจากวิธีการดำรงชีวิตของปัจจุบันนั้นแตกต่าง
                    ไปจากอดีต ทำให้คนมีความคิดต่าง ๆ ที่ใหม่และแตกต่างจากก่อน
                </p>
                <p>
                    เหตุผลหลัก ๆ ที่ทำให้ผู้คนสมัยนี้สนใจที่จะเลี้ยงสัตว์ ก็คงจะเพราะว่า น้อง ๆ สัตว์เลี้ยงนั้นมีหน้าตาที่น่ารัก
                    ทำให้เหล่าผู้คนนั้นหลงรัก และอีกทั้งยังขี้อ้อน ทำให้เหล่าเจ้าของที่เลี้ยงนั้นรู้สึกผูกพัน และมีความสุข 
                    และในขณะเดียวกันเหล่าน้องๆ สัตว์เลี้ยงนั้นก็เปรียบเสมือนกับเพื่อน ในยามที่เจ้าของต้องการเพื่อคลาย
                    เหงาและบรรเทาความทุกข์จากสิ่งที่ต่างๆ ที่เจอมาได้ การเลี้ยงสัตว์จึงเป็นประโยชน์อย่างมาก
                </p>
                <p>
                    แต่ก่อนผู้คนมักปฎิบัติกับสัตว์เลี้ยงให้เป็นแบบ เจ้านายและสัตว์เลี้ยงธรรมดา ที่สัตว์เลี้ยงต้องมีหน้าที่
                    เฝ้าบ้านหรือปกป้องเจ้าของเหมือนกับ "ชินจัง" ที่มีเจ้า "ชิโร่" อยู่ข้างๆเสมอ ซึ่งปัจจุบันการปฎิบัติแบบนี้ได้
                    ลดลงไปอย่างมาก ผู้คนในสมัยนี้ดูแลสัตว์เลี้ยงแบบดีมาก ๆ ดั่งลูกคนหนึ่ง และเปรียบตัวเองเป็นดั่งพ่อ
                    และแม่ให้กับสัตว์ตัวนั้น ซึ่งเรียกความสัมพันธ์นี้ว่า "Pet Parent" ซึ่งเจ้าของนั้นพร้อมที่จะดูแลไม่ว่าในเรื่อง
                    ของสุขภาพ อาหารการกิน หรือ การมีกิจกรรมร่วมกันกับสัตว์เลี้ยง เปรียบเหมือนการเลี้ยงเด็กคนหนึ่ง
                    ให้เติบโตมาอย่างดี
                </p>
                <p className="article-3-border">
                    ในปัจจุบันคนไทยหันมาเลี้ยงสัตว์กันมากยิ่งขึ้น ซึ่งส่วนมากคนไทยจะนิยมเลี้ยง น้องหมา และ น้องแมว 
                    จากข้อมูลของสมาคมอุตสาหกรรมผลิตภัณฑ์สัตว์เลี้ยงไทย และกรมปศุสัตว์ พบว่าในปี ค.ศ.2020 
                    ประเทศไทยจำนวนสัตว์เลี้ยงทั้งหมดประมาณ 15 ล้านตัว ซึ่งคิดเป็นสุนัข จำนวน 9 ล้านตัว เพิ่มจากปี 
                    ค.ศ.2019 ที่มีเพียงแค่ 2 ล้านตัว และมีแมวทั้งหหมด 3 ล้านตัว เพิ่มจากปี ค.ศ.2019 ที่มีเพียงแค่ 8 
                    แสนตัว ซึ่งน้องแมวนั้นมีแนวโน้มที่จะมีผู้คนเลี้ยงมากขึ้นในปีต่อ ๆ ไปเนื่องจากแมวสามารถอาศัยอยู่
                    ในบ้านได้ง่าย และงบประมาณในการดูแลไม่มาก
                </p>
                <label className="article-3-title-center">" ไม่ใช่สัตว์เลี้ยง ไม่ได้เป็นแค่เพื่อน "</label>
                <p>
                    จากผลวิจัยของ Krungthai COMPASS นั้นให้นิยามคำว่า “Pet Humanization” คือพฤติกรรมการ
                    เลี้ยงสัตว์ที่เปรียบเสมือนเป็น “สมาชิก” คนหนึ่งในครอบครัว ซึ่งจะแตกต่างกับการเลี้ยงสัตว์ที่เป็น
                    เพียงแค่ “สัตว์เลี้ยง” ที่มีไว้ให้ดูเล่น หรือ เลี้ยงไว้ใช้งาน ซึ่ง “Pet Humaniztion” นั้นไม่ได้มองสัตว์
                    เป็นเพียงแค่ “เพื่อน” แต่มองให้เหมือนดั่ง “ลูก” ที่ครอบครัวพร้อมจะดูแลและซัพพอร์ทในเรื่อง
                    ต่างๆที่จำเป็นต่อสัตว์
                </p>
                <Slider {...settings}>
                        {imgArray.map((item) => (
                            <div className="article-3-profile-card">
                                <img src={item.imgPath}/>
                            </div>
                        ))}
                </Slider>
                <p className="article-3-space">
                    พฤติกรรมของ Pet Humanization นั้นจะให้ความสำคัญต่อสัตว์เลี้ยงค่อนข้างสูง และยอมที่จะเสียเงิน
                    เพื่อซื้อของใช้ให้กับสัตว์เลี้ยง รวมถึงค่ารักษาพยาบาลให้กับสัตว์เลี้ยง ในยามที่สัตว์เลี้ยงนั้นเจ็บป่วย 
                    จึงสอดคล้องกับผลการสำรวจของ Morgan Stanley Research ที่บอกว่าเกือบ 70% ของเจ้าของสัตว์
                    เลี้ยงในยุคปัจจุบันนั้นให้ความสำคัญต่อสัตว์เลี้ยงอย่างมาก เปรียบเสมือนสมาชิกในครอบครัว และอีก 
                    66% ของเจ้าของสัตว์เลี้ยงมีความรักความผูกพันกับสัตว์เลี้ยงของตนมาก ซึ่ง 47% ของเจ้าของสัตว์
                    เลี้ยงยังมองสัตว์เลี้ยงของตนเป็นเสมือนลูกอีกด้วย
                </p>
                <p>
                    นอกจากนี้ 37% ของเจ้าของสัตว์เลี้ยงพร้อมที่จะจ่ายเงินสำหรับสิ่งของที่ต้องการเพื่อนำมาให้กับสัตว์
                    เลี้ยงของตัวเอง ซึ่งการกระทำแบบนี้ Morgan Stanley ให้คำนิยามการเลี้ยงดังกล่าวว่า “Petriarchy”
                    หรือที่พวกเราคุ้นหูกันว่า “ทาส” ของสัตว์ต่างๆ โดย Pet Humanization มากกว่า 75% 
                    จะอยู่ในช่วงอายุ 18–34 ปี
                </p>
                <div className="article-3-ref-box">
                    <label className="article-3-title">ที่มาของข้อมูลและรูปภาพประกอบ</label>
                    <Link className="article-3-link" to="https://www.parentsone.com/wp-content/uploads/2018/11/1-%E0%B8%A3%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B8%87.jpg.webp" target="_blank" >https://www.parentsone.com/wp-content/uploads</Link>
                    <Link className="article-3-link" to="https://www.pptvhd36.com/news/%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B8%A9%E0%B8%90%E0%B8%81%E0%B8%B4%E0%B8%88/162026" target="_blank" >https://www.pptvhd36.com/news/</Link>
                    <Link className="article-3-link" to="https://www.brandage.com/article/29294/Pet-Humanization-" target="_blank" >https://www.brandage.com/article/29294/Pet-Humanization-</Link>
                    <Link className="article-3-link" to="https://urbancreature.co/owning-pets-vs-having-kids/" target="_blank" >https://urbancreature.co/owning-pets-vs-having-kids/</Link>
                    <Link className="article-3-link" to="https://www.parentsone.com/pet-take-care-child/" target="_blank" >https://www.parentsone.com/pet-take-care-child/</Link>
                    <Link className="article-3-link" to="https://www.brandbuffet.in.th/2021/10/pet-humanization-trend/" target="_blank" >https://www.brandbuffet.in.th/2021/10/pet-humanization-trend/</Link>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}
export default ArticleThree;