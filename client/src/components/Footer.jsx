import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
            <div className="footer-container">
                <div className="contact-item">
                    <hr className='footer-line'></hr>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img className="footer-contact-img" src={require("../images/footerImage/FacebookIcon.png")}/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img className="footer-contact-img" src={require("../images/footerImage/TwitterIcon.png")}/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img className="footer-contact-img" src={require("../images/footerImage/InstagramIcon.png")}/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img className="footer-contact-img" src={require("../images/footerImage/LinkedInIcon.png")}/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img className="footer-contact-img" src={require("../images/footerImage/DiscordIcon.png")}/>
                    </a>
                    <hr className='footer-line'></hr>
                </div>
                <div className="footer-logo-container">
                    <img className="footer-logo-img" src={require("../images/footerImage/logo.png")}/>
                </div>
                <div>
                    <label className="copyright-label">Copyright © 2023 KabiiXoo</label>
                </div>
                <div className="term-of-service">
                    <Link to={'/term-of-service'} className="information-legal">Information Legal</Link>
                    <label className="l-text">|</label>
                    <a href='/term-of-service' className="privacy-cookie">Privacy & Cookie Policy</a>
                </div>
            </div>
    );
}

export default Footer;