import React from "react";
import "./Article.css";

const Article = () => {
    return(
        <div className="container">
            <div className="title">
                <label className="title-style">บทความเกี่ยวกับสัตว์เลี้ยง</label>
            </div>
            <div className="article-container">
                <div className="article-card">
                    <img className="img-style" src={require("../images/articlePage/popularPet.png")}/>
                    <label className="topic-title">ความนิยมการเลี้ยงสัตว์เลี้ยง</label>
                    <p className="desciption">
                        ในโลกของเรานั้นมีสัตว์เลี้ยงต่างๆมากมายเลยนะครับไม่ว่าจะเป็นสัตว์เล็กสัตว์ใหญ่ซึ่งในแต่ละบ้านนั้นก็จะเลี้ยงสัตว์มากมาย สำหรับบทความนี้นะครับพวกเราจะพาทุกคนไปพบกับสัตว์...
                    </p>
                    <button className="read-button">อ่านบทความ</button>
                </div>
                <div className="article-card">
                    <img className="img-style" src={require("../images/articlePage/petBoarding.png")}/>
                    <label className="topic-title">การให้บริการรับฝากสัตว์เลี้ยง</label>
                    <p className="desciption">
                    การบริการเกี่ยวกับสัตว์เลี้ยงนั้นมีมากมายหลายรูปแบบไม่ว่าจะเป็นการเลี้ยง การขายอุปกรณ์หรืออาหารสัตว์ แต่ในปัจจุบัน มีบริการแบบใหม่ที่เรียกกว่าบริการรับฝากสัตว์เลี้ยง ที่ช่วยให้...
                    </p>
                    <button className="read-button">อ่านบทความ</button>
                </div>
                <div className="article-card card-3">
                    <img className="img-style" src={require("../images/articlePage/petDisease.png")}/>
                    <label className="topic-title">โรคภัยไข้เจ็บของสัตว์เลี้ยง</label>
                    <p className="desciption">
                    น้องๆสัตว์เลี้ยงที่น่ารักของใครหลายๆคนนั้นเปรียบเสมือนลูกของแต่ละบ้านที่คนเอ็นดูและไม่อยากให้น้องๆนั้นเจ็บป่วยดังนั้นโรคภัยไข้เจ็บของสัตว์เลี้ยงจึงต้องมีความระมัดระวังไม่ให้เกิด...
                    </p>
                    <button className="read-button">อ่านบทความ</button>
                </div>
            </div>
        </div>
    );
}

export default Article;