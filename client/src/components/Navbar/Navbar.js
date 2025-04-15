import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authSlice";
import { UilSearch } from "@iconscout/react-unicons";
import debounce from "lodash.debounce";
import axios from "axios";

import "./Navbar.css";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const id = currentUser._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchUsers = async (searchTerm) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/search?q=${searchTerm}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
        
      );
      setResults(res.data);
      console.log(res.data);
      
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchUsers, 500), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) debouncedSearch(value);
    else setResults([]);
  };

  const handleSelectUser = (userId) => {
    navigate(`/profile/${userId}`);
    setQuery("");
    setResults([]);
  };

  const handleHomeClick = () => navigate("/");
  const handleUploadClick = () => navigate("/upload");
  const handleProfileClick = () => navigate(`/profile/${id}`);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <div className="container">
        <h2 className="log" onClick={handleHomeClick}>
          Social
        </h2>

        <div className="search-bar">
          <UilSearch style={{ color: "#555", paddingTop: "5px" }} />
          <input
            type="search"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search by @userId or name"
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((user) => (
                <li key={user._id} onClick={() => handleSelectUser(user._id)}>
                  <img src={user.profilePicture} alt="profile" />
                  <div>
                    <span>@{user.userId}</span>
                    <small>{user.username}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="create">
          <label className="btn btn-primary" onClick={handleLogout}>
            Logout
          </label>
          <div className="profile-photo">
            <img
              onClick={handleProfileClick}
              src={currentUser.profilePicture}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
