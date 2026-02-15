import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className="main">
      <div className="nav-left">
        <h3>ResuLyser</h3>
        <Link to="/home">Home</Link>
        <Link to="/about Us">About Us</Link>
        <Link to="/Contact Us">Contact</Link>
      </div>
      <div className="nav-right">
        <Link to="/registration">Create Account</Link>
        <Link to="/signin">SignIn</Link>
      </div>
    </div>
  );
}

export default Navbar;
