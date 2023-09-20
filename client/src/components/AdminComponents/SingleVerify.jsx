import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin'
import './SingleComponent.css'
import Swal from 'sweetalert2';

const SingleVerify = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const [verified, setVerified] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/verify/${(params._id)}`)
            .then(response => {
                setVerified(response.data);
            }).catch(err => alert(err));
    }, [params.slug])

    const deleteReport = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/verify/${id}`)
            .then(response => {
                Swal.fire('Deleted!', response.data.message, "success")
                navigate('/store');
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
        <div className='singleContainer'>
            <SideBarAdmin />
            <main className='inContainer text-center'>
                <h1 className='text-center' style={{ margin: '0 auto' }}>รายละเอียดการรายงาน</h1>
                <section className='sec-header'>
                    <div className='row-header'>
                        <p className='col'>เลขที่รายงาน :</p>
                        <p className='col'>อีเมล : {verified.service_id?.svp_owner?.mem_email}</p>
                        <button className='col col-confirm'>ยืนยัน</button>
                    </div>
                    <div className='row-header'>
                        <p className='col'>ชื่อ : {verified.service_id?.svp_owner?.mem_name}</p>
                        <p className='col '>นามสกุล : {verified.service_id?.svp_owner?.mem_surname}</p>
                        <button className='col col-delete' onClick={() => confirmDelete(verified._id)}>ปฎิเสธ</button>
                    </div>
                </section>
                <section className='sec-body' >
                    <h2>เนื้อหาการยืนยันการมีหน้าร้าน</h2>
                    <hr className='opacity-br'/>
                    <div className='body-description'>
                        <div><img className='size-img-report' src={verified.conf_businessImage1} alt="" /></div>
                        <div><img className='size-img-report' src={verified.conf_businessImage2} alt="" /></div>
                        <div><img className='size-img-report' src={verified.conf_businessImage3} alt="" /></div>
                        <h3 style={{textAlign:'center'}}>รูปถ่ายหน้าร้านหรือสถานที่ประกอบกิจการ</h3>
                        <div><img className='size-img-report' src={verified.conf_licenseImage1} alt="" /></div>
                        <div><img className='size-img-report' src={verified.conf_licenseImage2} alt="" /></div>
                        <div><img className='size-img-report' src={verified.conf_licenseImage3} alt="" /></div>
                        <p>{verified.conf_description}</p>
                    </div>
                </section>
            </main>

        </div>
    );
}

export default SingleVerify;
