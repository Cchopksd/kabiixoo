import React, {useContext, useEffect} from "react";
import "./ArticleOne.css";
import {Link } from 'react-router-dom';
import Footer from "../components/Footer";
import AnimatedPage from "../AnimatedPage";
import UserContext from '../contexts/UserProvider';

const ArticleOne = () => {
    // state ของ contextAPI
    const {dropdownClicked, setDropdownClicked} = useContext(UserContext);

    useEffect(() => {
        setDropdownClicked(false)
    },[])

    return (
        <AnimatedPage>
            <div className="article-1-container">
                <label className="article-1-header-label">โรคภัยไข้เจ็บของสัตว์เลี้ยง</label>
                <img src={require("../images/articleOnePage/headerImg1.png")}/>
                <p>
                    ในปัจจุบันเราจะพบว่า ความนิยมในการเลี้ยงสัตว์เลี้ยงเพิ่มมากขึ้น โดยเฉพาะน้องหมาน้องแมว และรวมไป
                    ถึงสัตว์เลี้ยงพิเศษต่างๆ ซึ่งบทความนี้เราจะพาเจ้าของสัตว์เลี้ยงไปทำความรู้จักกับการป้องกันโรคใกล้ตัว
                    ของสัตว์เลี้ยงกันครับ โดยบทความนี้จะพูดถึงแค่ส่วนน้องหมาน้องแมวเท่านั้นครับ ทั้งนี้การป้องกันโรคใน
                    บทความนี้ใช้ข้อมูลอ้างอิงตามปัจจุบันนะครับ ประเทศไทยเป็นประเทศที่อากาศเปลี่ยนแปลงบ่อยเดี๋ยว
                    อากาศร้อนบ้างฝนบ้าง อาจส่งผลให้สัตว์เลี้ยงเกิดอาการเจ็บป่วยได้ เจ้าของสัตว์เลี้ยงจึงจำเป็นต้องคอย
                    สังเกตและใส่ใจสัตว์เลี้ยงเป็นพิเศษ นอกจากเรื่อง เห็บ หมัด ที่ทำให้ปวดหัวอยู่บ่อย ๆ
                </p>
                <div>
                    ในส่วนของการป้องกันโรค จะพูดถึงโรคติดเชื้อเป็นหลัก ทั้งนี้การแบ่งประเภทการป้องกัน จะแบ่งออกได้เป็น 3 กลุ่มใหญ่ ได้แก่&ensp;&ensp;
                    <label className="article-1-title">การทำวัคซีน</label>
                    &ensp;,&ensp;
                    <label className="article-1-title">ป้องกันเห็บหมัด</label>
                    &ensp;และ&ensp;
                    <label className="article-1-title">ถ่ายพยาธิ</label>
                </div>
                <img src={require("../images/articleOnePage/headerImg2.png")}/>
                <label className="article-1-title">โรคที่มีโอกาสเกิดขึ้นในน้องหมาและน้องแมวบ่อยครั้ง</label>
                <p>
                    ถ้าหากน้องหมาและน้องแมวของเรามีอาการผิดปกติที่เราสังเกตเห็นหรืออาจจะไม่เห็น บางทีอาจจะเป็น
                    อาการของโรคต่างๆที่อาจจะเกิดขึ้นได้ ซึ่งในบทความนี้จะให้ข้อมูลเบื้องต้นเกี่ยวกับโรคต่าง ๆ ดังนี้ครับ
                </p>
                <div className="article-1-info-box">
                    <label className="article-1-title">1. โรคที่เกี่ยวกับผิวหนัง</label>
                    <p>
                        สภาพอาการที่อับชื้นเป็นตัวการสำคัญที่จะทำให้สุนัขเกิดโรคผิวหนังได้ง่าย โดยทั่วไปโรคผิวหนังที่พบใน
                        บ้านเราส่วนมากจะมาจากหลายสาเหตุรวมกัน เช่น เป็นเชื้อรา ติดเชื้อแบคทีเรีย หรือขี้เรื้อนรูขุมขน 
                        ดังนั้นเจ้าของควรจะหมั่นดูแลเรื่องผิวหนังและขนของน้องหมาให้ดี ต้องเช็ดให้แห้ง อย่าปล่อยให้เปียก
                        หรือชื้น หากพบว่าสุนัขมีตุ่มคัน มีอาการเกาหรือสะบัดหูบ่อย ๆ มากผิดปกติ ควรจะรีบพาไปหาหมอ
                    </p>
                    <img src={require("../images/articleOnePage/infoImg1.png")}/>
                </div>
                <div className="article-1-info-box">
                    <label className="article-1-title">2. โรคที่เกี่ยวกับระบบทางเดินหายใจ </label>
                    <p>
                        โรคเกี่ยวกับระบบทางเดินหายใจที่น่ากลัวก็คือ โรคปอดบวม จะเริ่มแสดงอาการ เช่น ซึม เบื่ออาหาร 
                        จมูกแห้ง ไอ มีไข้สูง น้ำมูก น้ำตาไหล หายใจลำบาก เป็นต้น โรคนี้ส่วนใหญ่เกิดจากการติดเชื้อทั้งเชื้อ
                        แบคทีเรียและเชื้อไวรัสซึ่งสามารถทำให้สัตว์ป่วยและตายได้ ดังนั้นสัตว์เลี้ยงตัวไหนขี้หนาวอาจจะต้องหา
                        เสื้อให้เขาใส่ในช่วงกลางคืนหรือช่วงที่ฝนตกแล้วอากาศเย็น และถ้าสังเกตว่าเขามีอาการไอหรือ
                        มีน้ำมูกไหลควรจะพาไปหาหมอทันที
                    </p>
                    <img src={require("../images/articleOnePage/infoImg5.png")}/>
                </div>
                <div className="article-1-info-box">
                    <label className="article-1-title">3. ไข้ เห็บ และ หมัด </label>
                    <p>
                        เป็นโรคอันดับต้นๆ ในสัตว์เลี้ยงก็ว่าได้ ถ้าเทียบกับการเจ็บป่วยด้วยโรคอื่น ๆ “เห็บ” เป็นทั้งพาหะนำโรค 
                        คือ พยาธิในเม็ดเลือดหรือไข้เห็บ และยังทำให้สัตว์อ่อนแอ โลหิตจาง เนื่องจากเห็บจะดูดเลือดและส่งผล
                        ให้ภูมิคุ้มกันของสัตว์ลดต่ำลง ทำให้สุนัขติดเชื้อและเกิดโรคได้ง่าย ยิ่งภูมิอากาศในบ้านเราที่ร้อนชื้นเหมาะ
                        สำหรับการแพร่พันธุ์ของเห็บ ทำให้ช่วงหน้าฝนน้องหมาเกิดการเจ็บป่วยเนื่องจากเห็บเพิ่มมากขึ้น 
                        การกำจัดเห็บจึงเป็นเรื่องที่สำคัญมาก และในปัจจุบันมีหลายรูปแบบในการกำจัดเห็บหมัด ดังนั้นเจ้าของ
                        ควรทำเข้าใจในการใช้ให้ถูกต้อง หรือ ปรึกษาสัตว์แพทย์ก่อนใช้ รวมไปถึงการทำความสะอาดกรง หรือ 
                        สถานที่บริเวณที่สัตว์เลี้ยงอยู่ด้วย เพื่อตัดวงจรชีวิตเจ้าเห็บหมัด
                    </p>
                    <img src={require("../images/articleOnePage/infoImg4.png")}/>
                </div>
                <div className="article-1-info-box">
                    <label className="article-1-title">4. พยาธิในเม็ดเลือด</label>
                    <p>
                        โรคนี้จะเกิดจากเห็บที่มีเชื้อไปกัดสุนัขหรือสุนัขกินตัวเห็บเข้าร่างกาย จะมีอาการ ซึม เบื่ออาหาร มีไข้ 
                        เลือดหยุดไหลยาก สีเหงือกและเยื่อเมือกซีดกว่าปกติ อาจมีภาวะตัวเหลือง เลือดกำเดาไหล ปัสสาวะมีเลือดปน
                        บางรายอาจพบปัญหาตับหรือไตอักเสบร่วมด้วย และอาจพบการติดเชื้อพยาธิเม็ดเลือดเข้าสู่ระบบประสาท 
                        ทำให้สุนัขมีอาการทางประสาทจนอาจตาบอดเฉียบพลันได้ นอกจากนี้ในบางรายอาจพบภาวะภูมิคุ้มทำลาย
                        เม็ดเลือดแดงและเกล็ดเลือดตัวเองแต่โรคนี้สามารถรักษาให้หายได้ถ้ามาพบสัตวแพทย์และรักษาอย่างทันท่วงที
                    </p>
                    <img src={require("../images/articleOnePage/infoImg3.png")}/>
                </div>
                <div className="article-1-info-box">
                    <label className="article-1-title">5. โรคเกี่ยวกับระบบทางเดินอาหาร </label>
                    <p>
                        ไม่ว่าจะเป็นท้องเสีย อาเจียน อาหารเป็นพิษ หรือโรคที่ร้ายแรง เช่น โรคลำไส้อักเสบ ซึ่งพบได้ในสุนัขทุกช่วงอายุ 
                        สาเหตุที่เกิดขึ้นได้หลัก ๆ มาจากการกินอาหารที่มีการปนเปื้อนของเชื้อโรคเข้าไป หรือการตั้งอาหารทิ้งไว้นานใน
                        สภาพอากาศที่ชื้นทำให้มีพวกเชื้อแบคทีเรียลงไปเจริญเติบโต ยิ่งช่วงหน้าฝนที่มีความชื้นเชื้อโรคก็จะเจริญเติบโตได้ดี
                    </p>
                    <img src={require("../images/articleOnePage/infoImg2.png")}/>
                </div>
                <div className="article-1-ref-box">
                    <label className="article-1-title">ที่มาของข้อมูลและรูปภาพประกอบ</label>
                    <Link className="article-1-link" to="https://news.trueid.net/detail/d1x69wk6WvPO" target="_blank" >https://news.trueid.net/detail/d1x69wk6WvPO</Link>
                    <Link className="article-1-link" to="https://boxmeaww.com/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AD%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B9%" target="_blank" >https://boxmeaww.com</Link>
                    <Link className="article-1-link" to="https://www.talingchanpet.net/%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%9A%E0%B8%AD%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82%E0%B9%81%E0%B8%A5%E0%B8%B0/" target="_blank" >https://www.talingchanpet.net</Link>
                    <Link className="article-1-link" to="https://www.juscoratchada.com/%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7%E0%B8%AA%E0%B8%B2%E0%B8%A3/%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B9%87%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A2-2/" target="_blank" >https://www.juscoratchada.com</Link>
                    <Link className="article-1-link" to="https://www.jojohouse.com/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%A5%E0%B8%B3%E0%B9%84%E0%B8%AA%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%9A%E0%B8%AA%E0%B8%99%E0%B8%82/" target="_blank" >https://www.jojohouse.com</Link>
                    <Link className="article-1-link" to="https://pet.kapook.com/view255082.html" target="_blank" >https://pet.kapook.com</Link>
                </div>
            </div>
            <Footer/>
        </AnimatedPage>
    );
}
export default ArticleOne;