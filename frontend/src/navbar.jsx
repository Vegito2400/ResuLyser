import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/login", {
          method:"GET",
          headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="main">
      <div className="nav-left">
        <h3>ResuLyser</h3>
        <Link to="/">Home</Link>
        <Link to="/about Us">About Us</Link>
        <Link to="/Contact Us">Contact</Link>
      </div>
      {!user ? (
        <div className="nav-right">
          <Link to="/registration">Create Account</Link>
          <Link to="/signin">SignIn</Link>
        </div>
      ) : (
        <div className="nav-right">
          <span style={{ color: '#cbd5e1', marginRight: '0.6rem' }}>Hi, {user.name}</span>
          <a onClick={handleLogout} style={{ cursor: 'pointer', color: '#93c5fd' }}>Logout</a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
