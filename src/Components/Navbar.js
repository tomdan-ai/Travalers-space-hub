import { NavLink } from 'react-router-dom';
import planetImage from '../assets/planet.png';

const Navbar = () => {
    return (
        <nav>
        <ul>
          <li>
            <img src={planetImage} alt="planet-logo" width={55} height={55} />
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
          <li>
            <NavLink to="/myprofile" activeClassName="active">
              My Profile
            </NavLink>
          </li>
        </ul>
      </nav>

    )
};

export default Navbar;
