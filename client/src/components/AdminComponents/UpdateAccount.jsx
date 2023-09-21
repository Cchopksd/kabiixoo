import React from 'react';
import SideBarAdmin from './SideBarAdmin';
import './UpdateComponent.css'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateAccount = () => {
    const params = useParams()
    const [state, setState] = useState({
        mem_username: '',
        mem_password: '',
        mem_name: '',
        mem_surname: '',
        mem_email: '',
        // mem_profileImage:'',
        // mem_role: ''
    })
    // const { mem_username, mem_password, mem_name, mem_surname, mem_email, mem_role } = state

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/account/${params.mem_slug}`)
            .then(response => {
                // const { mem_username, mem_password, mem_name, mem_surname, mem_email, mem_role } = response.data
                setState({ ...response.data })
                // console.log(response.data)
            })
            .catch(err => alert(err))
    }, [params.mem_slug])

    const inputValue = name => event => {
        // console.log(name,"=", event.target.value)
        setState({ ...state, [name]: event.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios
            // .put(`${process.env.REACT_APP_API}/account/:mem_slug`, { mem_username, mem_password, mem_name, mem_surname, mem_email, mem_role })
            .patch(`${process.env.REACT_APP_API}/account/${params.mem_slug}`, state)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลเรียบร้อย',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }

    return (
        <div className='update-main'>
            <SideBarAdmin />
            <main className='update-frame'>
                <h1 className='text-header'>แก้ไขข้อมูลผู้ใช้งาน</h1>
                <form className='update-container' onSubmit={submitForm}>
                        <section className='sec-left'>
                            somethings <br />
                            Maybe picture <br />
                            input code here
                        </section>
                        <hr className='line-center' />
                        <section className='sec-right'>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">ชื่อผู้ใช้งาน :</label>
                                <input className='input-update' type="text" value={state.mem_username} onChange={inputValue('mem_username')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">รหัสผ่าน :</label>
                                <input className='input-update' type="text" value={state.mem_password} onChange={inputValue('mem_password')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">ชื่อ :</label>
                                <input className='input-update' type="text" value={state.mem_name} onChange={inputValue('mem_name')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">นามสกุล :</label>
                                <input className='input-update' type="text" value={state.mem_surname} onChange={inputValue('mem_surname')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">อีเมล :</label>
                                <input className='input-update' type="text" value={state.mem_email} onChange={inputValue('mem_email')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">วันเกิด :</label>
                                <input className='input-update' type="date" value={state.mem_birthDate} onChange={inputValue('mem_birthDate')} />
                            </div>
                            <div className='update-row'>
                                <label className='label-update' htmlFor="">เบอร์โทร :</label>
                                <input className='input-update' type="text" value={state.mem_phoneNumber} onChange={inputValue('mem_phoneNumber')} />
                            </div>
                            {/* Add other input fields for mem_password, mem_name, mem_surname, mem_email, mem_role */}
                            <input type="submit" value='อัพเดต' className="btn-update" />
                        </section>
                        {/* <input type="submit" value='อัพเดต' className="btn btn-primary" /> */}
                    </form>
            </main>
        </div>
    );
}

export default UpdateAccount;
