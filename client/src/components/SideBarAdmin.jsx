import React, { useState } from 'react';
import imageLogo from '../images/asd.png';
import VerifyStore from './AdminComponents/VerifyStore';
import MangeAccount from './AdminComponents/MangeAccount';
import ReportingService from './AdminComponents/ReportingService';
import DefaultComponent from './AdminComponents/DefaultComponent';
import '../components/sideBarAdmin.css';

const SideBarAdmin = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [selectedButton, setSelectedButton] = useState(false); // Add this line

    const handleComponentChange = (componentName, buttonId) => {
        setActiveComponent(componentName);
        setSelectedButton(buttonId); // Set the selected button ID
    };

    let currentComponent;

    if (activeComponent === 'A') {
        currentComponent = <VerifyStore />;
    } else if (activeComponent === 'B') {
        currentComponent = <MangeAccount />;
    } else if (activeComponent === 'C') {
        currentComponent = <ReportingService />;
    } else {
        currentComponent = <DefaultComponent />;
    }

    return (
        <div className='welcomeAdminPage'>
        <div className='sideMenu'>
            <div className='optionSelect'>
            <button className={selectedButton === 1 ? 'optionClicked selected' : 'optionClicked'} onClick={() => handleComponentChange('A', 1)}>จัดการบัญชีผู้ใช้งาน</button>
            <button className={selectedButton === 2 ? 'optionClicked selected' : 'optionClicked'} onClick={() => handleComponentChange('B', 2)}>ยืนยันการมีหน้าร้าน</button>
            <button className={selectedButton === 3 ? 'optionClicked selected' : 'optionClicked'} onClick={() => handleComponentChange('C', 3)}>การรายงาน</button>
            </div>
            <img src={imageLogo} alt="" />
        </div>
        <div className='mainContent'>{currentComponent}</div>
        </div>
    );
};

export default SideBarAdmin;
