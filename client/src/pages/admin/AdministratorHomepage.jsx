import React from 'react';
import './AdministratorHomepage.css';
import SideBarAdmin from '../../components/AdminComponents/SideBarAdmin'

const AdministratorHomepage = () => {

    return (
        <div className='defaultAdmin'>
            <SideBarAdmin />
            <div className='backgroundPageAdmin'>
                <h1 className='headerWelcome'>ยินดีต้อนเข้ารับสู่ระบบของผู้ดูแลระบบคาบิซู</h1>
            </div>
        </div>
    );
}

export default AdministratorHomepage;
