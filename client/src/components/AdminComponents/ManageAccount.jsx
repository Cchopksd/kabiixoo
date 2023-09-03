import React from 'react';
import {FaSearch} from 'react-icons/fa'
import '../AdminComponents/ManageAccount.css'

const ManageAccount = () => {
    return (
        <div className='manageContainer' >
            <h1 className='headerAccount'>จัดการบัญชีผู้ใช้งาน</h1>
            <div className='searchLine'>
                <input className='searchAccount' type='search' placeholder='ค้นหาชื่อ, นามสกุล, ชื่อผู้ใช้งาน หรือ อีเมล'/>
                <button className='submitAccount' type='submit'><FaSearch/></button>
            </div>
            <div className='frameGroup'>
                <ul className='groupFilter'>
                    <li className='nameFilter-id'>ไอดี</li>
                    <li className='nameFilter-profile'>รูปโปรไฟล์</li>
                    <li className='nameFilter-name'>ชื่อ</li>
                    <li className='nameFilter-surname'>นามสกุล</li>
                    <li className='nameFilter-username'>ชื่อผู้ใช้งาน</li>
                    <li className='nameFilter-email'>อีเมล</li>
                </ul>
                <div className='boardAccount'>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default ManageAccount;