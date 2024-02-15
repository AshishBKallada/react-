import React, { useState, useContext, useEffect } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import FirebaseContext from '../../Store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Store/Context';
import { onAuthStateChanged } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { auth } = useContext(FirebaseContext)
  const navigate = useNavigate()

  ///////////////
  const { setUser } = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  //////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      alert('user logged')
      console.log(userCredential)
    })
    navigate('/')
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
