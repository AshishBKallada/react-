import React, { useState } from 'react';
import { signupUser } from '../../../redux/userAuthSlice';
import { useDispatch } from 'react-redux';

function Signup() {
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')

  const dispatch = useDispatch()

   const handleRegister =(e) =>{
    e.preventDefault()
    dispatch(signupUser({name,email,password}))
    console.table(name,email,password)
   }
  return (
    <div>
         <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form >
        <h3>SignUp Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter a name" id="username" value={name} onChange={(e)=>{setName(e.target.value)}} />

        <label htmlFor="username">Email</label>
        <input type="text" placeholder="Email " id="email" value={email}  onChange={(e)=>{setEmail(e.target.value)}} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Set Password" id="password" value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>

        <button onClick={handleRegister} type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
