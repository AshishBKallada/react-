import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import FirebaseContext from './Store/Context';
import { auth, firestore } from './Firebase/config';
import { Context } from './Store/Context';

function App() {
  return (
    <div>
      <Context>
      <FirebaseContext.Provider value={{ auth, firestore }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
          </Routes>
        </Router>
      </FirebaseContext.Provider>
      </Context>
    </div>
  );
}

export default App;
