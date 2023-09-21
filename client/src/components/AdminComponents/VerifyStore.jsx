import React, { useState, useEffect } from 'react';
import SideBarAdmin from './SideBarAdmin';
import '../AdminComponents/ManageAccount.css';
import axios from 'axios';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../AnimatedPage';

const VerifyStore = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(10); // Number of items per page
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/verify`)
            .then((response) => {
                // console.log(response);
                setUsers(response.data);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteReport = (conf_slug) => {
        // console.log(id)
        axios.delete(`${process.env.REACT_APP_API}/verify/${conf_slug}`)
            .then(response => {
                Swal.fire('Deleted!', response.data.message, "success")
                fetchData()
            }).catch(err => {
                console.error('Error:', err); // Log the error for debugging
                alert('An error occurred while deleting the document.');
            });
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

    const filteredUsers = users.filter((user) => {
        const username = user.conf_businessName || '';
        const email = user.svp_owner?.mem_name || '';
        const name = user.svp_owner?.mem_surname || '';
        const owner = user.svp_owner?.mem_email || '';

        return (
            username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const pageCount = Math.ceil(filteredUsers.length / perPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = filteredUsers.slice(offset, offset + perPage);

    return (
        <AnimatedPage>
            <div className='mainContent'>
                <SideBarAdmin />
                <div className='manageContainer'>
                    <h1 className='headerAccount'>ตรวจสอบและยืนยันการมีหน้าร้าน</h1>
                    <div className='searchLine'>
                        <input
                            className='searchAccount'
                            type='search'
                            placeholder='ค้นหาชื่อ, นามสกุล, ชื่อผู้ใช้งาน หรือ อีเมล'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className='table table-striped frameGroup'>
                        <thead className='fixed-height-tr'>
                            <tr className='groupFilter'>
                                <th scope='col' className='borderColor' style={{ width: '10%', paddingLeft: '10px' }}>ไอดี</th>
                                <th scope='col'>ชื่อร้าน</th>
                                <th scope='col'>ชื่อจริง</th>
                                <th scope='col'>นามสกุล</th>
                                <th scope='col'>อีเมล</th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody className="fixed-height-tbody">
                            {currentPageData.map((user, index) => (
                                <tr key={user.mem_id} className='fixed-height-tr' style={{ height: '60px' }}>
                                    <th scope='row' className='vertical-align' style={{ paddingLeft: '10px' }}>{offset + index + 1}</th>
                                    <td className='vertical-align'>{user.conf_businessName || 'N/A'}</td>
                                    <td className='vertical-align'>{user.service_id?.svp_owner?.mem_name || 'N/A'}</td>
                                    <td className='vertical-align'>{user.service_id?.svp_owner?.mem_surname || 'N/A'}</td>
                                    <td className='vertical-align'>{user.service_id?.svp_owner?.mem_email || 'N/A'}</td>
                                    <td className='vertical-align'>
                                        <Link to={`/store/id/${user._id}`} className='account-button-design' style={{ background: '#DBC36C' }}>ตรวจสอบ</Link>
                                    </td>
                                    <td className='vertical-align'>
                                        <button className='account-button-design' style={{ background: '#5BBC5F' }}>ยืนยัน</button>
                                    </td>
                                    <td className='vertical-align'>
                                        <button className='account-button-design' onClick={() => confirmDelete(user._id)} style={{ background: '#B73953' }}>ปฎิเสธ</button>
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
        </AnimatedPage>
    );
}

export default VerifyStore;
