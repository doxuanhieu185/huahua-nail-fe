import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";



const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuItems = ["Services", "Bookings", "About Us", "Contact"];

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <header className="bg-[#FFF0F5] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={require("../assets/huahua-nail.png")}
                alt="Nail Salon Logo"
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-[#4A4A4A] hover:text-[#FFB6C1]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFD1DC] flex items-center justify-center">
                    <FaUser className="w-5 h-5" />
                  </div>
                  <FaChevronDown className="w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[#4A4A4A] hover:bg-[#FFF0F5]"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-[#4A4A4A] hover:bg-[#FFF0F5]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="bg-[#FFD1DC] text-white px-6 py-2 rounded-full hover:bg-[#FFB6C1] transition-colors duration-200"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="border-2 border-[#FFD1DC] text-[#4A4A4A] px-6 py-2 rounded-full hover:bg-[#FFD1DC] hover:text-white transition-colors duration-200"
                >
                  Register
                </a>
              </div>
            )}

            {/* Shopping Cart */}
            <div className="relative">
              <FaShoppingCart className="w-6 h-6 text-[#4A4A4A] hover:text-[#FFB6C1] cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[#FFB6C1] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#4A4A4A] hover:text-[#FFB6C1]"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <a
                    href="/login"
                    className="bg-[#FFD1DC] text-white px-6 py-2 rounded-full hover:bg-[#FFB6C1] transition-colors duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="border-2 border-[#FFD1DC] text-[#4A4A4A] px-6 py-2 rounded-full hover:bg-[#FFD1DC] hover:text-white transition-colors duration-200"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-[#4A4A4A] hover:text-[#FFB6C1]"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
