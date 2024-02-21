import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import Profile from './Components/User/Profile/Profile';
import Home from './Components/User/Home/Home';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';


import AdminLogin from './Components/Admin/Login/Login';
import AdminHome from './Components/Admin/Home/Home';
import Users from './Components/Admin/Users/Users';
import { loginUser } from './redux/userAuthSlice';


const verifyUser = async () => {
  const token = Cookies.get('token');
  if (token) {
    const response = await fetch('http://localhost:4000/user/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.message;
    } else {
      return false
    }
  }
  return false;
};

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await verifyUser();
      setUser(userData);
    };

    fetchUser();
  }, []);
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/signup" element={user === false ? <Signup /> : user === false ? <Signup /> : <Navigate to='/home' />} />
          <Route path="/home" element={user === true ? <Home /> : user === false ? <Navigate to='/' /> : <Home/>} />
          <Route path="/" element={user === false ? <Login /> : user === false ? <Login /> : <Navigate to='/home' />} />
          <Route path="/profile" element={user === true ? <Profile user={user} /> : user === false ? <Navigate to='/' /> : <Profile user={user}/>} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/users' element={<Users />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
