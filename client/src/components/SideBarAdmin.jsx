import React from 'react';
import { useState, useEffect  } from 'react';
import backgroundAdmin from '../images/bgAdmin.png';
import imageLogo from '../images/asd.png';
import VerifyStore from './AdminComponents/VerifyStore';
import MangeAccount from './AdminComponents/MangeAccount';
import ReportingService from './AdminComponents/ReportingService';

const SideBarAdmin = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [data, setData] = useState(null);

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
        setIsButtonClicked(true)
    };


    useEffect(() => {
        fetchData();
    }, [selectedComponent]);

    const fetchData = () => {
        // ทำการเรียก API หรือดึงข้อมูลจาก backend ตาม selectedComponent
        // ตัวอย่างเพียงแสดงการเติมค่าตัวอย่างเข้าไปใน data state และแสดงผลลัพธ์
        if (selectedComponent === 'VerifyStore') {
            setData('ข้อมูลจาก Component A');
        } else if (selectedComponent === 'MangeAccount') {
            setData('ข้อมูลจาก Component B');
        } else if (selectedComponent === 'ReportingService') {
            setData('ข้อมูลจาก Component C');
        }
    };

    return (
        <div className='welcomeAdminPage'>
            <div className='sideMenu'>
                <ul className='menuOnSidebar'>
                    <li className='itemListAdmin'>
                        <button className={`btItem ${isButtonClicked ? 'clicked' : ''}`} onClick={() => handleComponentClick('VerifyStore')}>
                            จัดการบัญชีผู้ใช้งาน
                        </button>
                    </li>
                    <li className='itemListAdmin'>
                        <button className={`btItem ${isButtonClicked ? 'clicked' : ''}`} onClick={() => handleComponentClick('MangeAccount')}>
                            ยืนยันการมีหน้าร้าน
                        </button>
                    </li>
                    <li className='itemListAdmin'>
                        <button className={`btItem ${isButtonClicked ? 'clicked' : ''}`} onClick={() => handleComponentClick('ReportingService')}>
                            การรายงาน
                        </button>
                    </li>
                </ul>
                <div className='frameImageOnSidebar'>
                    <img className='imageOnSidebar' src={imageLogo} alt="Logo" />
                </div>
            </div>
            <div className='picAdminPage' style={{ backgroundImage: `url(${backgroundAdmin})` }}>
                <h1 className='welcomeAdmin'></h1>
                {selectedComponent === 'VerifyStore' && (
                    <div className='picAdminPage'>
                        <VerifyStore data={data} />
                    </div>
                )}
                {selectedComponent === 'MangeAccount' && (
                    <MangeAccount data={data} />
                )}
                {selectedComponent === 'ReportingService' && (
                    <div className='picAdminPage'>
                        <ReportingService data={data} />
                    </div>
                )}
            </div>
        </div>
    );
}


export default SideBarAdmin;