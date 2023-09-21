import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation from react-router-dom
import { BiLogOut } from "react-icons/bi";
import logoKabiixoo from "../../images/logoKabiixoo.png"
import '../AdminComponents/SideBarAdmin.css'
import { logout } from "../../services/authorize"
import UserContext from '../../contexts/UserProvider';

const SideBarAdmin = () => {

    // Context API
    const {isAdmin, setIsAdmin, setHaveService} = useContext(UserContext)

    // redirect
    const navigate = useNavigate();

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setSelectedLink(path);
    };

    // logout ของ admin
    const handleAdminLogout = () => {
        logout(() => {
            navigate("/")
            setIsAdmin(false)
            setHaveService(false)
            // reload หน้าเว็บ
            window.location.reload(true)
        })
    }

    return (
        <nav className='sideMenu'>
            <ul className='optionSelect'>
                <li className='frame-link'>
                    <Link
                        to='/account'
                        className={`optionClicked ${selectedLink === '/account' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/account')}
                    >
                        จัดการบัญชีผู้ใช้งาน
                    </Link>
                </li>
                <li className='frame-link'>
                    <Link
                        to='/store'
                        className={`optionClicked ${selectedLink === '/store' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/store')}
                    >
                        ยืนยันการมีหน้าร้าน
                    </Link>
                </li>
                <li className='frame-link'>
                    <Link
                        to='/reporting'
                        className={`optionClicked ${selectedLink === '/reporting' ? 'selected' : ''}`}
                        onClick={() => handleLinkClick('/reporting')}
                    >
                        การรายงาน
                    </Link>
                </li>
                <li className='frame-link'>
                    <Link className='logoutAdmin' onClick={handleAdminLogout}>
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
