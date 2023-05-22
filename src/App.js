import './App.css';
import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import MyProfile from './Components/Profile';

const App = () => (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Rockets
            </NavLink>
          </li>
          <li>
            <NavLink to="/missions" activeClassName="active">
              Missions
            </NavLink>
          </li>
          <li>
            <NavLink to="/myprofile" activeClassName="active">
              My Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={MyProfile} />
        <Route path="/missions" element={MyProfile} />
        <Route path="/myprofile" element={MyProfile} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
