import { NavLink } from 'react-router-dom';
import planetImage from '../assets/planet.png';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <img src={planetImage} alt="planet-logo" width={55} height={55} />
      </li>
      <li>
        <NavLink to="/" className="active">
          Rockets
        </NavLink>
      </li>
      <li>
        <NavLink to="/missions" className="active">
          Missions
        </NavLink>
      </li>
      <li>
        <NavLink to="/myprofile" className="active">
          My Profile
        </NavLink>
      </li>
    </ul>
  </nav>

);

export default Navbar;
