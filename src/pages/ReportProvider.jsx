import React, {useState} from "react";
import "./ReportProvider.css"
import ImageUploader from "../components/ImageUploader";

const ReportProvider = () => {

    const [businessName,setBusinessName] = useState("ร้านเวลแคร์ด๊อก");
    const [reportTopic,setReportTopic] = useState("");
    const [reportDesc,setReportDesc] = useState("");

    return (
        <div className="report-container">
            <div className="report-title-box">
                <label className="report-title">รายงานผู้ให้บริการ</label>
                <label className="business-name-report">{businessName}</label>
            </div>
            <img className="report-img-display" src={require("../images/dummy_profileImage.png")}/>
            <div className="report-topic-box">
                <label className="report-info-header">หัวข้อการรายงาน</label>
                <input className="input-report-topic" type="text" value={reportTopic} onChange={(event)=>setReportTopic(event.target.value)}/>
            </div>
            <div className="report-description-box">
                <label className="report-info-header">รายละเอียดการรายงาน</label>
                <textarea className="input-description-topic" value={reportDesc} onChange={(event)=>setReportDesc(event.target.value)}></textarea>
            </div>
            <div className="report-img-box">
                <label className="report-info-header">รูปภาพประกอบ (ถ้ามี)</label>
                <ImageUploader/>
            </div>
            <button className="comfirm-report-btn">ส่งรายงาน</button>
        </div>
    );
}

export default ReportProvider;