import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import './Navbar.css'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import {RiArrowDropDownLine} from "react-icons/ri"
import UserContext from "../contexts/UserProvider";
import axios from "axios";
import { logout } from "../services/authorize"
import { getUserId } from "../services/authorize";

const Navbar = () => {

    // redirect
    const navigate = useNavigate();

    // state ของ contextAPI
    const { username, haveService, setHaveService } = useContext(UserContext);

    // state ของ การ login
    const [dropdownClicked, setDropdownClicked] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userFullName, setUserFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage]=  useState("")
    const [slug,setSlug] = useState("")

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [size, setSize] = useState(0);

    // state ของ สมาชิกที่มีบริการ
    const [userId, setUserId] = useState()


    // ขนาดของหน้าจอ
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // นำข้อมูลมาใช้ใน navbar
    const getUserInfo = async () => {
        await axios.post(`${process.env.REACT_APP_API}/get-user-login`,{username}).then(res => {
            setEmail(res.data.mem_email)
            setUserImage(res.data.mem_profileImage)
            setSlug(res.data.mem_slug)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadData()
        getUserInfo()
        if (username) {
            setIsLogin(true)
            setUserFullName(username)
        }
    },[username]) // ,isLogin,userFullName

    // เมื่อ userid เปลี่ยนแปลงให้มาทำ block นี้ กัน async
    useEffect(() => {
        // ยิง api เพื่อเช็คว่ามีบริการไหม
        axios.post(`${process.env.REACT_APP_API}/check-service`,{userId}
        // ,
        //     {
        //         headers: {
        //             authorization: `Bearer ${getToken()}`
        //         }
        //     }
        ).then((res) => {
            setHaveService(res.data.status)
        }).catch((res) => {
            setHaveService(res.response.data.status)
        })
    },[userId])

    // โหลดข้อมูลเพื่อใช้ในการแสดงผล
    const loadData = async () => {
        try{
            const id = await getUserId()
            setUserId(id.data)
        }catch (error) {
            console.error(error);
        }
    } 

    return (
        <>
            <nav className="navbar">
                    <Link to="/">
                        <img className='img-logo' src={require("../images/logo.png")}/>
                    </Link>
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
                                            <img src={userImage}/>
                                            <label>{userFullName.length > 10 ? userFullName.substring(0, 11) + "..." : userFullName}</label>
                                            <RiArrowDropDownLine color="#FFFFFF" size={30}/>
                                        </div>
                                        <div className={dropdownClicked && size >= 850 ? "login-dropdown" : "login-dropdown-none"}>
                                            <div className="login-dropdown-menu-border login-dropdown-top">
                                                <label>{email}</label>
                                            </div>
                                            <div className="login-dropdown-middle">
                                                <Link to={`/edit-profile/${slug}`} onClick={() => setDropdownClicked(!dropdownClicked)}>แก้ไขข้อมูลส่วนตัว</Link>
                                            </div>
                                            <div className="login-dropdown-middle">
                                                <Link to={haveService ? `/provider-home/${userId}`:'/create-service'} onClick={() => setDropdownClicked(!dropdownClicked)}>ให้บริการรับฝากสัตว์เลี้ยง</Link>
                                            </div>
                                            <div className="login-dropdown-menu-border login-dropdown-middle">
                                                <Link to={`/chats/${userId}`} onClick={() => setDropdownClicked(!dropdownClicked)}>การสนทนา</Link>
                                            </div>
                                            <div className="login-dropdown-bottom" role="button" onClick={() => logout(() => {
                                                navigate("/")
                                                setDropdownClicked(!dropdownClicked)
                                                setHaveService(false)
                                                // reload หน้าเว็บ
                                                window.location.reload(true)
                                            })}>
                                                <label>ออกจากระบบ</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"} onClick={closeMobileMenu}>
                                        <Link to={`/edit-profile/${slug}`}>แก้ไขข้อมูลส่วนตัว</Link>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"} onClick={closeMobileMenu}>
                                        <Link to={haveService ? `/provider-home/${userId}`:'/create-service'}>ให้บริการรับฝากสัตว์เลี้ยง</Link>
                                    </li >
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"} onClick={closeMobileMenu}>
                                        <Link to={`/chats/${userId}`} >การสนทนา</Link>
                                    </li>
                                    <li className={click ? size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none" : size <= 850 ? "mobile-spacing" :"mobile-dropdown-display-none"} onClick={closeMobileMenu}>
                                        <Link onClick={() => logout(() => {
                                            navigate("/")
                                            setHaveService(false)
                                            // reload หน้าเว็บ
                                            window.location.reload(true)
                                        })}>ออกจากระบบ</Link>
                                    </li>
                                </div> :
                                <li className="mobile-spacing" onClick={closeMobileMenu}>
                                    <a href='/signin'><button className="btn-login" >เข้าสู่ระบบ</button></a>
                                    {/* <button className="btn-login" ></button> */}
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
