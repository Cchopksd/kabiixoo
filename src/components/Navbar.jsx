import React, { useState, useLayoutEffect } from "react";
import './Navbar.css'
import { Outlet, Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import {RiArrowDropDownLine} from "react-icons/ri"

const Navbar = () => {
    // state ของ การ login
    const [dropdownClicked, setDropdownClicked] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [userFullName, setUserFullName] = useState("สมหมาย ภักดี");
    const [email, setEmail] = useState("chinathip.chai@bumail.netadasdasdasdasdsadasasdsads");

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
            // if (size >= 850) {
            //     setClick(false);
            // }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <>
            <nav className="navbar">
                    <img className='img-logo' src={require('../images/logo.png')}/>
                    <div className="menu">
                        <ul className={click ? "nav-link active" : "nav-link"}>
                            <li className="mobile-spacing" onClick={closeMobileMenu}>
                                <Link to="/">ค้นหาการให้บริการ</Link>
                            </li>
                            <li className="mobile-spacing" onClick={closeMobileMenu}>
                                <Link to="/article">บทความ</Link>
                            </li>
                            <li className="mobile-spacing aboutMe" onClick={closeMobileMenu}>
                                <Link to="/about">เกี่ยวกับเรา</Link>
                            </li>
                            {isLogin ? 
                                <div>
                                    <li className={size <= 850 ? "mobile-spacing-login" : 'mobile-spacing'} onClick={closeMobileMenu}>
                                        <div className={size <= 850 ? "login-dropdown-desktop-none" : 'login-dropdown-display'} role="button" onClick={() => setDropdownClicked(!dropdownClicked)}>
                                            <img src={require("../images/dummy_profileImage.png")}/>
                                            <label>{userFullName}</label>
                                            <RiArrowDropDownLine color="#FFFFFF" size={30}/>
                                        </div>
                                        <div className={dropdownClicked && size >= 850 ? "login-dropdown" : "login-dropdown-none"}>
                                            <div className="login-dropdown-menu-border login-dropdown-top">
                                                <label>{email}</label>
                                            </div>
                                            <div className="login-dropdown-middle">
                                                <Link>แก้ไขข้อมูลส่วนตัว</Link>
                                            </div>
                                            <div className="login-dropdown-middle">
                                                <Link>ให้บริการรับฝากสัตว์เลี้ยง</Link>
                                            </div>
                                            <div className="login-dropdown-menu-border login-dropdown-middle">
                                                <Link>ประวัติการแชท</Link>
                                            </div>
                                            <div className="login-dropdown-bottom" role="button">
                                                <label>ออกจากระบบ</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"}>
                                        <Link>แก้ไขข้อมูลส่วนตัว</Link>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"}>
                                        <Link>ให้บริการรับฝากสัตว์เลี้ยง</Link>
                                    </li >
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"}>
                                        <Link>ประวัติการแชท</Link>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"}>
                                        <Link>ออกจากระบบ</Link>
                                    </li>
                                </div> :
                                <li className="mobile-spacing" onClick={closeMobileMenu}>
                                    <button className="btn-login" ><Link to="/signin">เข้าสู่ระบบ</Link></button>
                                </li>}
                        </ul>
                    </div>
                <div className="mobile-menu" onClick={handleClick}>
                    {click ? (
                        <FiX/>
                    ) : (
                        <FiMenu/>
                    )}
                </div>
            </nav>
            <Outlet/>
        </>
    );
}

export default Navbar;
