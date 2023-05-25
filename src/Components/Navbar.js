import { NavLink } from 'react-router-dom';
import planetImage from '../assets/planet.png';

const Navbar = () => (

  <nav>
    <ul>
      <li
        className="head"
        style={{
          display: 'flex', gap: '0%', width: '30%', marginRight: 'auto',
        }}
      >
        <img src={planetImage} alt="planet-logo" width={55} height={55} />
        <h1>Space Travelers&apos; Hub</h1>
      </li>
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
      <li className="divider">
        <NavLink to="/myprofile" activeClassName="active">
          My Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Navbar;
