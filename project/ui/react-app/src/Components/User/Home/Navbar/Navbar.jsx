import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const user  = useSelector(state => state.user.user);
    console.log('2',user);

    const { name } = user || {};
        const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };
    const handleLogout =() => {
        Cookies.remove('token');
        window.location.href = '/'
    } 
    return (
        <nav className="navbar">
            <div className="navbar-logo">B A S S H E A D S</div>
            <ul className="navbar-links">
                <li><a href="/" className="navbar-link">Home</a></li>
                <li><a onClick={handleProfileClick} className="navbar-link">Profile</a></li>
                <li><a href="/about" className="navbar-link">NAME:{user}</a></li>
                <li><a href="/services" className="navbar-link">Services</a></li>
                <li><a href="/contact" className="navbar-link">Contact</a></li>
                {name && <li><a href="/" className="navbar-link">{name}</a></li>}

                <li><a onClick={handleLogout} className="navbar-link">Logout</a></li>

            </ul>
        </nav>
    );
}

export default Navbar;
