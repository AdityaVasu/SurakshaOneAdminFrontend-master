import { Link } from "react-router-dom"; // Use Link from react-router-dom if you are using it for navigation
import "../../css/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="/assets/log.png" alt="logo" width="10%"/>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
