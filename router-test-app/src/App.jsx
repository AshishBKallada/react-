
import React, { useState } from 'react';
import './App.css';
import Profile from './Components/profile';
import About from './Components/about';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppContext } from './Components/AppContext';
function App() {

  const [state, setState] = useState(20)
  const navigate = useNavigate()
  return (
    <div className="App">
      <button onClick={() => navigate('/profile')}>Profile Page</button>
      <button onClick={() => navigate('/about')}>About Page</button>
      <AppContext.Provider value={{data:state}}>
        <Routes>
          <Route element={<About />} path='/about' />
          <Route element={<Profile data={state} />} path='/profile' />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}


export default App


