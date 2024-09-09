import './Footer.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo2.png';

function Footer() {
    return (
        <footer className="unique-footer">
            <div className="container-fluid text-center text-md-start">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <img src={logo} className="img-fluid unique-footer-logo" alt="Logo" />
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <h6 className="text-uppercase unique-footer-title mb-4">
                                    <i className="fa-solid fa-ankh me-2"></i>Pharaohs Legacy
                                </h6>
                                <p className="unique-footer-text">
                                    "Pharaohs Legacy" serves as a one-stop destination for tourists interested in exploring the ancient heritage of Egypt while enhancing the tourism experience.
                                </p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <h6 className="text-uppercase unique-footer-title mb-4">Contact</h6>
                                <p className="unique-footer-text"><i className="fa-solid fa-house me-2"></i>Banks Center St, New Cairo 1, Cairo Governorate 4730112, Egypt</p>
                                <p className="unique-footer-text"><i className="fa-solid fa-envelope me-2"></i>support@pharaohslegacy.com</p>
                                <p className="unique-footer-text"><i className="fa-solid fa-phone me-2"></i>+20 1XX XXX XXXX</p>
                                <div>
                                    <Link to="" className="me-4 unique-footer-link">
                                        <i className="fa-brands fa-facebook"></i>
                                    </Link>
                                    <Link to="" className="me-4 unique-footer-link">
                                        <i className="fa-brands fa-twitter"></i>
                                    </Link>
                                    <Link to="" className="me-4 unique-footer-link">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </Link>
                                    <Link to="" className="me-4 unique-footer-link">
                                        <i className="fa-brands fa-instagram"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase unique-footer-title mb-4">Main Pages</h6>
                        <ul className="footer-links">
                            <li><Link to="/aboutus" className="unique-footer-link">About Us</Link></li>
                            <li><Link to="/events" className="unique-footer-link">Events</Link></li>
                            <li><Link to="/historicalplaces" className="unique-footer-link">Historical Places</Link></li>
                            <li><Link to="/historicalcontent" className="unique-footer-link">Historical Content</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-4 unique-footer-bottom">
                © 2024 Copyright:  
                <Link className="unique-footer-link fw-bold" to="https://mdbootstrap.com/">  PharaohsLegacy.com</Link>
            </div>
        </footer>
    );
}

export default Footer;
