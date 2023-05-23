import './App.css';
import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import Missions from './Components/Missions';
import Navbar from './Components/Navbar';
import Rockets from './Components/Rockets';
import MyProfile from './Components/Profile';

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
