import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

function Layout() {
    const userType = localStorage.getItem('user_type');
    return (
        <div className={`layout-container ${userType !== 'admin' ? 'non-admin-layout' : ''}`}>
            <Navbar />
            <div className={`layout-content ${userType === 'admin' ? 'with-sidebar' : ''} ${userType !== 'admin' ? 'tourist-loggedout-bg' : ''}`}>
                <Outlet />
            </div>
            {userType !== 'admin' && <Footer />}
        </div>
    );
}

export default Layout;
