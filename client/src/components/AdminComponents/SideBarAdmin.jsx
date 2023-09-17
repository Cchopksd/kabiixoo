import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { BiLogOut } from "react-icons/bi";
import logoKabiixoo from "../../images/logoKabiixoo.png"
import '../AdminComponents/SideBarAdmin.css'

const SideBarAdmin = () => {
    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setSelectedLink(path);
    };

    return (
        <nav className='sideMenu'>
            <ul className='optionSelect'>
                <li>
                    <Link
                        to='/account'
                        className={`optionClicked ${selectedLink === '/account' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/account')}
                    >
                        จัดการบัญชีผู้ใช้งาน
                    </Link>
                </li>
                <li>
                    <Link
                        to='/store'
                        className={`optionClicked ${selectedLink === '/store' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/store')}
                    >
                        ยืนยันการมีหน้าร้าน
                    </Link>
                </li>
                <li>
                    <Link
                        to='/reporting'
                        className={`optionClicked ${selectedLink === '/reporting' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/reporting')}
                    >
                        การรายงาน
                    </Link>
                </li>
                <li>
                    <Link to="/" className='logoutAdmin'>
                        <BiLogOut className='iconLogOut'/>ออกจากระบบ
                    </Link>
                </li>
            </ul>
            <Link to="/administrator-homepage">
                <img className='logoAdmin' src={logoKabiixoo} alt="" />
            </Link>
        </nav>
    );
};

export default SideBarAdmin;
