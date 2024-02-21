import React from 'react';
import './Header.css'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
    const adminState = useSelector((state) => state.admin.admin);
    console.log('ADMIN NAME:',adminState)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/admin/users')
    }
    const handleLogout = () => {
        navigate('/admin')
    }
  return (
    <div className="sidebar">
      <div className="logo">
         NAME : {adminState} 
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a onClick={handleClick}>Users</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
}

export default Header;
