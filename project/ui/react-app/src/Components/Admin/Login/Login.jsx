import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../../redux/adminAuthSlice';


function AdminLogin() {
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleLogin = (e) =>{
             e.preventDefault()
             dispatch(loginAdmin({email,password}))
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '40px', textAlign: 'center', width: '300px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Username</label>
           
            <input onChange={(e)=>setEmail(e.target.value)} type="text" id="username" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} placeholder="Enter your username" />
         
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
           
            <input  onChange={(e)=>setPassword(e.target.value)}  type="password" id="password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} placeholder="Enter your password" />
          
          </div>
          <button onClick={handleLogin} type="submit" style={{ backgroundColor: '#007bff', border: 'none', borderRadius: '5px', color: '#fff', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
