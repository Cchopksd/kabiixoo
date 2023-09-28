import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { IoChevronBackSharp } from "react-icons/io5";
import SideBarAdmin from './SideBarAdmin'
import './SingleComponent.css'
import Swal from 'sweetalert2';
import AnimatedPage from '../../AnimatedPage';

const SingleReport = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const [report, setReport] = useState('')

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/report/${(params.slug)}`)
            .then(response => {
                setReport(response.data);
            }).catch(err => alert(err));
    }, [params.slug])

    const deleteReport = (rep_slug) => {
        axios.delete(`${process.env.REACT_APP_API}/report/${rep_slug}`)
            .then(response => {
                Swal.fire('Deleted!', response.data.message, "success")
                navigate('/reporting');
            }).catch(err => alert(err));
    }

    const confirmDelete = (slug) => {
        Swal.fire({
            title: 'ยืนยันที่จะลบการรายงานนี้',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReport(slug)
            }
        })
    }
 

    console.log(report.serviceInfo?.svp_name);

    return (
        <AnimatedPage>
            <div className='singleContainer'>
                <SideBarAdmin />
                <main className='inContainer text-center'>
                <button onClick={goBack} className='step-back'><IoChevronBackSharp className='icon-back' />ย้อนกลับ</button>
                    <h1 className='text-center' style={{ margin: '0 auto' }}>รายละเอียดการรายงาน</h1>
                    <section className='sec-header'>
                        <div className='row-header'>
                            <p className='col'>ผู้ร้องเรียน : {report.reportInfo?.reporter_id?.mem_name} {report.reporter_id?.mem_surname}</p>
                            <p className='col'>ผู้ถูกร้องเรียน : {report.reportInfo?.provider_id?.mem_name} {report.provider_id?.mem_surname}</p>
                            <p className='col fixed-col2'>ชื่อ : {report.serviceInfo?.svp_name}</p>
                        </div>
                        <div className='row-header'>
                            <p className='col'>อีเมลล์ผู้ถูกร้องเรียน : {report.reportInfo?.provider_id?.mem_email}</p>
                            <p className='col fixed-col'>หัวข้อการถูกรายงาน : {report.reportInfo?.rep_title}</p>
                            <button className='col col-delete' onClick={() => confirmDelete(report.rep_slug)}>ลบการร้องเรียน</button>
                        </div>
                    </section>
                    <section className='sec-body' >
                        <h2 >เนื้อหาการถูกรายงาน </h2>
                        <hr className='opacity-br'/>
                        <div className='body-description'>
                            <div className='img-row-single'>
                                <div><img className='size-img-report' src={report.rep_image1} alt="" /></div>
                                <div><img className='size-img-report' src={report.rep_image2} alt="" /></div>
                                <div><img className='size-img-report' src={report.rep_image3} alt="" /></div>
                            </div>
                            <p className='color-text-admin-p'>{report.rep_description}</p>
                        </div>
                    </section>
                </main>
            </div>
        </AnimatedPage>
    );
}

export default SingleReport;
