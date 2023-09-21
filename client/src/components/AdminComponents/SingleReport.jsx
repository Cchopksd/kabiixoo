import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin'
import './SingleComponent.css'
import Swal from 'sweetalert2';
import AnimatedPage from '../../AnimatedPage';

const SingleReport = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const [report, setReport] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/report/${(params.slug)}`)
            .then(response => {
                setReport(response.data);
                console.log(response);
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
            title: 'Are you sure you want to delete',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReport(slug)
            }
        })
    }

    return (
        <AnimatedPage>
            <div className='singleContainer'>
                <SideBarAdmin />
                <main className='inContainer text-center'>
                    <h1 className='text-center' style={{ margin: '0 auto' }}>รายละเอียดแบบฟอร์มการมีหน้าร้าน</h1>
                    <section className='sec-header'>
                        <div className='row-header'>
                            <p className='col'>เลขที่รายงาน :</p>
                            <p className='col'>ผู้ร้องเรียน : {report.reporter_id?.mem_username}</p>
                            <p className='col'>อีเมลล์ผู้ร้องเรียน : {report.reporter_id?.mem_email}</p>
                        </div>
                        <div className='row-header'>
                            <p className='col'>ผู้ถูกร้องเรียน : {report.provider_id?.mem_username}</p>
                            <p className='col fixed-col'>หัวข้อการถูกรายงาน : {report.rep_title}</p>
                            <button className='col col-delete' onClick={() => confirmDelete(report.rep_slug)}>ลบการร้องเรียน</button>
                        </div>
                    </section>
                    <section className='sec-body' >
                        <h2 >เนื้อหาการถูกรายงาน </h2>
                        <hr className='opacity-br'/>
                        <div className='body-description'>
                            <div><img className='size-img-report' src={report.rep_image1} alt="" /></div>
                            <div><img className='size-img-report' src={report.rep_image2} alt="" /></div>
                            <div><img className='size-img-report' src={report.rep_image3} alt="" /></div>
                            <p>{report.rep_description}</p>
                        </div>
                    </section>
                </main>

                {/* {JSON.stringify(report)} */}
            </div>
        </AnimatedPage>
    );
}

export default SingleReport;
