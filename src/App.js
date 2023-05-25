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
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
