import React from "react";
import "./Footer.css";

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
                    <label className="information-legal">Information Legal</label>
                    <label className="l-text">|</label>
                    <label className="privacy-cookie">Privacy & Cookie Policy</label>
                </div>
            </div>
    );
}

export default Footer;