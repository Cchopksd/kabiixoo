import React from "react";
import './Navbar.css'
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <img className='img-logo' src={require('../images/logo.png')}/>
                <div className="menu">
                    <ul className="nav-link">
                        <li>
                            <Link to="/">ค้นหาการให้บริการ</Link>
                        </li>
                        <li>
                            <Link to="/article">บทความ</Link>
                        </li>
                        <li>
                            <Link to="/about">เกี่ยวกับเรา</Link>
                        </li>
                    </ul>
                </div>
                <button className="btn-login" ><Link to="/signin">เข้าสู่ระบบ</Link></button>
            </nav>
            <Outlet/>
        </>
    );
}

export default Navbar;
