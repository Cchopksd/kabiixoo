import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoChevronBackSharp } from "react-icons/io5";
import SideBarAdmin from './SideBarAdmin'
import './SingleComponent.css'
import Swal from 'sweetalert2';
import AnimatedPage from '../../AnimatedPage';

const SingleVerify = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const [verified, setVerified] = useState('')
    const [BUImageLoaded, setBUImageLoaded] = useState(false);
    const [LIImageLoaded, setLIImageLoaded] = useState(false);
    const imgBusiness1Ref = useRef(null);
    const imgBusiness2Ref = useRef(null);
    const imgBusiness3Ref = useRef(null);

    const imgLicense1Ref = useRef(null);
    const imgLicense2Ref = useRef(null);
    const imgLicense3Ref = useRef(null);

    useEffect(() => {
        const imagesBusiness = [imgBusiness1Ref.current, imgBusiness2Ref.current, imgBusiness3Ref.current];
        const imagesLicense = [imgLicense1Ref.current, imgLicense2Ref.current, imgLicense3Ref.current];

        const BUImages = [...imagesBusiness];
        const LIImages = [...imagesLicense];

        BUImages.forEach((img) => {
            if (img) {
                img.addEventListener('load', () => {
                    setBUImageLoaded(true);
                });
            }
        });

        LIImages.forEach((img) => {
            if (img) {
                img.addEventListener('load', () => {
                    setLIImageLoaded(true);
                });
            }
        });
    }, []);


    const goBack = () => {
        navigate(-1);
    };

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
            title: 'ยืนยันที่จะลบแบบฟอร์มนี้',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReport(slug)
            }
        })
    }

    const verifyBusiness = (id) => {
        axios.put(`${process.env.REACT_APP_API}/verify/${id}`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'แจ้งเตือน!',
                    text: 'ยืนยันการมีหน้าร้านเรียบร้อย',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/store');
                    }
                })
            })
            .catch((err) => {
                Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.message,
                    'error'
                );
            });
    }

    const confirmBusiness = (id) => {
        Swal.fire({
            title: 'ยืนยันการมีหน้าร้าน',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                verifyBusiness(id)
            }
        })
    }



    return (
        <AnimatedPage>
            <div className='singleContainer'>
                <SideBarAdmin />
                <main className='inContainer text-center'>
                    <button onClick={goBack} className='step-back'><IoChevronBackSharp className='icon-back' />ย้อนกลับ</button>
                    <h1 className='text-center' style={{ margin: '0 auto' }}>รายละเอียดแบบฟอร์มการมีหน้าร้าน</h1>
                    <section className='sec-header'>
                        <div className='row-header'>
                            <p className='col'>ชื่อร้าน : {verified.conf_businessName}</p>
                            <p className='col'>อีเมล : {verified.service_id?.svp_owner?.mem_email}</p>
                            <button className='col col-confirm' onClick={() => confirmBusiness(verified._id)}>ยืนยัน</button>
                        </div>
                        <div className='row-header'>
                            <p className='col'>ชื่อ : {verified.service_id?.svp_owner?.mem_name}</p>
                            <p className='col '>นามสกุล : {verified.service_id?.svp_owner?.mem_surname}</p>
                            <button className='col col-delete' onClick={() => confirmDelete(verified._id)}>ปฎิเสธ</button>
                        </div>
                    </section>
                    <section className='sec-body' >
                        <h2>เนื้อหาการยืนยันการมีหน้าร้าน</h2>
                        <hr className='opacity-br' />
                        <article className='body-description'>
                            <div className='img-row-single'>
                                <div><img ref={imgBusiness1Ref} className='size-img-report' src={verified.conf_businessImage1} alt="" /></div>
                                <div><img ref={imgBusiness2Ref} className='size-img-report' src={verified.conf_businessImage2} alt="" /></div>
                                <div><img ref={imgBusiness3Ref} className='size-img-report' src={verified.conf_businessImage3} alt="" /></div>
                            </div>
                            {BUImageLoaded ? (
                                <h3 style={{ textAlign: 'center' }}>รูปถ่ายหน้าร้านหรือสถานที่ประกอบกิจการ</h3>
                            ) : null}
                            <div className='img-row-single'>
                                <div><img ref={imgLicense1Ref} className='size-img-report' src={verified.conf_licenseImage1} alt="" /></div>
                                <div><img ref={imgLicense2Ref} className='size-img-report' src={verified.conf_licenseImage2} alt="" /></div>
                                <div><img ref={imgLicense3Ref} className='size-img-report' src={verified.conf_licenseImage3} alt="" /></div>
                            </div>
                            {LIImageLoaded ? (
                                <h3 style={{ textAlign: 'center' }}>รูปใบอนุญาติการค้าหรือใบอนุญาติกิจการเกี่ยวกับสัตว์</h3>
                            ) : null}
                            <p className='color-text-admin-p'>{verified.conf_description}</p>
                    </article>
                </section>
            </main>
        </div>
        </AnimatedPage >
    );
}

export default SingleVerify;
