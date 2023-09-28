import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../AdminComponents/ManageComponent.css';
import SideBarAdmin from './SideBarAdmin';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const ManageAccount = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(10); // Number of items per page
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/accounts`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = (slug) => {
        axios.delete(`${process.env.REACT_APP_API}/account/${slug}`)
            .then(response => {
                Swal.fire('แจ้งเตือน!', response.data.message, "ลบบัญขีผู้ใช้งานสำเร็จ")
                fetchData()
            }).catch(err => alert(err));
    }

    const confirmDelete = (slug) => {
        Swal.fire({
            title: 'ยืนยันเพื่อลบบัญชีผู้ใช้งาน',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(slug)
            }
        })
    }


    const suspendedUser = (slug) => {
        axios.put(`${process.env.REACT_APP_API}/account/${slug}`)
        .then((user) => {
            console.log(user)
                Swal.fire({
                    icon: 'success',
                    title: 'แจ้งเตือน!',
                    text: 'แก้ไขสถานะเรียบร้อย',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetchData();
                        }
                    });
            })
        .catch((err) => {
            Swal.fire(
                    'แจ้งเตือน',
                    err.response.data.message,
                    'error'
                );
        });
    };


    const confirmSuspended = (slug) => {
        Swal.fire({
            title: 'แก้ไข้สถานะ',
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                suspendedUser(slug)
            }
        })
    }

    const filteredUsers = users.filter((user) => {
        const name = user.mem_name || '';
        const surname = user.mem_surname || '';
        const username = user.mem_username || '';
        const email = user.mem_email || '';

        return (
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const pageCount = Math.ceil(filteredUsers.length / perPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = filteredUsers.slice(offset, offset + perPage);

    return (
        <div className='mainContent'>
            <SideBarAdmin />
            <div className='manageContainer'>
                <h1 className='headerAccount'>จัดการบัญชีผู้ใช้งาน</h1>
                <div className='searchLine'>
                    <input
                        className='searchAccount'
                        type='search'
                        placeholder='กรอกข้อมูลการค้นหาตามหัวข้อตาราง'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className='table table-striped frameGroup'>
                    <thead className='fixed-height-tr'>
                        <tr className='groupFilter'>
                            <th scope='col' className='borderColor' style={{width:'7%',paddingLeft:'10px'}}>ลำดับที่</th>
                            <th scope='col'>รูปโปรไฟล์</th>
                            <th scope='col'>ชื่อจริง</th>
                            <th scope='col'>นามสกุล</th>
                            <th scope='col'>ชื่อผู้ใช้งาน</th>
                            <th scope='col'>อีเมล</th>
                            <th scope='col'>สถานะ</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="fixed-height-tbody">
                        {currentPageData.map((user, index) => (
                            <tr key={user.mem_id} className='fixed-height-tr' style={{height:'60px'}}>
                                <th scope='row' className='vertical-align' style={{paddingLeft:'10px'}}>{offset + index + 1}</th>
                                <td className='vertical-align '><img className='account-image' src={user.mem_profileImage} alt="" /></td>
                                <td className='vertical-align '>{user.mem_name}</td>
                                <td className='vertical-align '>{user.mem_surname}</td>
                                <td className='vertical-align '>{user.mem_username}</td>
                                <td className='vertical-align '>{user.mem_email}</td>
                                <td className='vertical-align '>{user.isSuspended ? 'ถูกระงับใช้' : 'ปกติ'}</td>
                                <td className='vertical-align '>
                                    <Link to={`/account/edit/${user.mem_slug}`}><button className='account-button-design' style={{ background: '#DBC36C' }}>แก้ไขข้อมูล</button></Link>
                                </td>
                                <td>
                                <button className='account-button-design' style={{ background: '#D29965' }} onClick={() => confirmSuspended(user.mem_slug)} >{user.isSuspended ? 'ปลดล็อก' : 'ระงับใช้'}</button>
                                </td>
                                <td>
                                    <button className='account-button-design' onClick={() => confirmDelete(user.mem_slug)} style={{ background: '#B73953' }}>ลบบัญชี</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pagination-info'>
                    <p>
                        {currentPage + 1} จากทั้งหมด {pageCount} หน้า
                    </p>
                    <ReactPaginate
                        previousLabel={<span className="custom-label">{'<'}</span>}
                        nextLabel={<span className="custom-label">{'>'}</span>}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination__link'}
                        nextLinkClassName={'pagination__link'}
                        disabledClassName={'pagination__link--disabled'}
                        activeClassName={'pagination__link--active'}
                        pageClassName={'pagination__page'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageAccount;
