import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import FirebaseContext from './Store/Context';
import { auth, firestore } from './Firebase/config';
import { Context } from './Store/Context';
import Post from './Store/PostContext';

function App() {
  return (
    <div>
      <Post>
      <Context>
      <FirebaseContext.Provider value={{ auth, firestore }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/viewpost' element={<ViewPost />} />
          </Routes>
        </Router>
      </FirebaseContext.Provider>
      </Context>
      </Post>
    </div>
  );
}

export default App;
