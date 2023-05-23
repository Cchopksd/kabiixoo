import React, { useState } from "react";
import './Navbar.css'
import { Outlet, Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                            <li className="mobile-spacing" onClick={closeMobileMenu}>
                                <button className="btn-login" ><Link to="/signin">เข้าสู่ระบบ</Link></button>
                            </li>
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
