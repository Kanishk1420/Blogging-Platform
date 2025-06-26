import React, { useState, useContext, useEffect, useRef } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; 
import { DataContext } from "../../context/DataProvider";

const Header = () => {
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  
  // Separate states for desktop and mobile dropdowns
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Update the checkAuthAndProceed function to handle redirection properly
  const checkAuthAndProceed = (destination) => {
    console.log("Attempting to navigate to:", destination); // For debugging
    const accessToken = sessionStorage.getItem('accessToken');
    setMobileMenuOpen(false); // Close the menu regardless
    
    if (!accessToken) {
      console.log("No token found, redirecting to login"); // For debugging
      // Redirect to login if not authenticated
      navigate('/account', { state: { from: destination } });
    } else {
      console.log("Token found, proceeding to destination"); // For debugging
      // Proceed to destination if authenticated
      navigate(destination);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("name");
    navigate("/account");
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setShowMobileDropdown(false);
      }
      
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !event.target.classList.contains('hamburger-button')) {
        setMobileMenuOpen(false);
      }
    }

    // Add event listener when any dropdown or mobile menu is open
    if (showDropdown || showMobileDropdown || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showMobileDropdown, mobileMenuOpen]);

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

        {/* Desktop Navigation Links - hidden on mobile */}
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

        {/* User Account or Sign in - Right Aligned */}
        <div className="flex items-center ml-auto">
          {/* Hamburger menu button - visible only on mobile */}
          <button 
            className="md:hidden mr-4 hamburger-button focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <CloseIcon style={{ color: "#1565D8" }} />
            ) : (
              <MenuIcon style={{ color: "#1565D8" }} />
            )}
          </button>

          {/* User account/login section */}
          <div className="hidden md:flex items-center">
            {account.username ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
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
        </div>
      </Toolbar>

      {/* Mobile Menu - Slide in from right */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* User info at top of menu */}
          <div className="p-5 border-b">
            {account.username ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1565D8] flex items-center justify-center text-white text-2xl font-semibold">
                  {account.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-[#0749a5] font-semibold text-lg">
                  {account.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center px-5 py-1.5 border border-[#1565D8] text-base font-medium rounded-full text-[#1565D8] hover:bg-[#1565D8] hover:text-white transition-colors duration-200 w-full justify-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center px-6 py-1.5 border border-[#1565D8] text-base font-medium rounded-full text-[#1565D8] hover:bg-[#1565D8] hover:text-white transition-colors duration-200 no-underline w-full justify-center"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto py-4">
            <div
              onClick={() => navigate('/')}
              className="block px-6 py-3 text-gray-700 hover:text-[#1565D8] hover:bg-blue-50 text-base font-medium transition-colors duration-200 no-underline cursor-pointer"
            >
              Home
            </div>
            <div
              onClick={() => navigate('/about')}
              className="block px-6 py-3 text-gray-700 hover:text-[#1565D8] hover:bg-blue-50 text-base font-medium transition-colors duration-200 no-underline cursor-pointer"
            >
              About
            </div>
            
            {/* Pages submenu */}
            <div className="px-6 py-3">
              <div 
                className="flex justify-between items-center text-gray-700 hover:text-[#1565D8] text-base font-medium cursor-pointer"
                onClick={() => setShowMobileDropdown(!showMobileDropdown)} // Use the mobile-specific state
              >
                Pages
                <ArrowDropDownIcon />
              </div>
              {showMobileDropdown && ( // Use the mobile-specific state
                <div className="pl-4 mt-2 border-l-2 border-gray-200">
                  <div 
                    onClick={() => checkAuthAndProceed('/create')}
                    className="block py-2 text-gray-700 hover:text-[#1565D8] text-base no-underline cursor-pointer"
                  >
                    Create Post
                  </div>
                  <div
                    onClick={() => checkAuthAndProceed('/')}
                    className="block py-2 text-gray-700 hover:text-[#1565D8] text-base no-underline cursor-pointer"
                  >
                    All Posts
                  </div>
                </div>
              )}
            </div>
            
            <div
              onClick={() => checkAuthAndProceed('/contact')}
              className="block px-6 py-3 text-gray-700 hover:text-[#1565D8] hover:bg-blue-50 text-base font-medium transition-colors duration-200 no-underline cursor-pointer"
            >
              Contact
            </div>
          </div>
        </div>
      </div>

      {/* Optional overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </AppBar>
  );
};

export default Header;
