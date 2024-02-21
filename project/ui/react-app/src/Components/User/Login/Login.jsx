import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/userAuthSlice';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({email,password}))
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Log In</button>
        <button onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default Login;
