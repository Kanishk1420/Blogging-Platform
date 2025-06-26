import React, { useState, useContext, useEffect, useRef } from "react"; // Added useEffect and useRef
import { AppBar, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataContext } from "../../context/DataProvider";

const Header = () => {
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Add ref for dropdown

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/account");
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    // Add event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
        borderBottom: "1px solid #f0f0f0",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
      elevation={0}
    >
      <Toolbar className="flex items-center px-6 py-2">
        {/* Logo - Left Aligned */}
        <div className="flex-shrink-0 mr-8">
          <Link to="/" className="flex items-center no-underline">
            <span className="text-2xl font-bold text-[#1565D8]">Bloggify</span>
          </Link>
        </div>

        {/* Navigation Links - Centered with proper spacing */}
        <div className="hidden md:flex items-center space-x-12 flex-grow justify-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-[#1565D8] px-2 py-2 text-base font-medium transition-colors duration-200 no-underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-[#1565D8] px-2 py-2 text-base font-medium transition-colors duration-200 no-underline"
          >
            About
          </Link>
          <div className="relative" ref={dropdownRef}>
            {" "}
            {/* Add ref to dropdown container */}
            <button
              className="flex items-center text-gray-700 hover:text-[#1565D8] px-2 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Pages
              <ArrowDropDownIcon />
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <Link
                    to="/create"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 no-underline"
                  >
                    Create Post
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 no-underline"
                  >
                    All Posts
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-[#1565D8] px-2 py-2 text-base font-medium transition-colors duration-200 no-underline"
          >
            Contact
          </Link>
        </div>

        {/* User Info & Logout - Right Aligned with ml-auto */}
        <div className="flex items-center ml-auto">
          {account.username ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {/* Avatar circle with first letter of username */}
                <div className="w-8 h-8 rounded-full bg-[#1565D8] flex items-center justify-center mr-2 text-white font-semibold">
                  {account.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#0749a5] font-semibold text-base">
                    {account.username}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-5 py-1.5 border border-[#1565D8] text-base font-medium rounded-full text-[#1565D8] hover:bg-[#1565D8] hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/account"
              className="inline-flex items-center px-6 py-1.5 border border-[#1565D8] text-base font-medium rounded-full text-[#1565D8] hover:bg-[#1565D8] hover:text-white transition-colors duration-200 no-underline"
            >
              Sign in
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
