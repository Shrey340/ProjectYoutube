import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";

import { auth, provider, signInWithPopup, signOut } from "../../firebase"; // Firebase config

import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({ setSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menu_icon}
          alt="Menu"
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
        />
        <Link to="/">
                  
                  <h1 style={{color:"Black"}}>Youtube</h1>
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="nav-right flex-div" ref={dropdownRef}>
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notifications" />

        {user ? (
          <div className="user-dropdown">
            <img
              src={user.photoURL}
              alt="User"
              className="user-icon"
              title="Account"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-email">{user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
