import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "Business",
    "Technology",
    "Politics",
    "Sports",
    "Entertainment",
  ];

  return (
    <div className="w-full bg-white shadow-sm">
      {/* Top Bar with Date */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-sm text-gray-500 text-center">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-4">
          {/* Logo */}
          <div className="text-center mb-4">
            <Link to="/" className="text-3xl font-bold text-gray-900">
              The News
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full lg:justify-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } lg:block w-full lg:w-auto`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase()}`}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                <FaSearch className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                <FaUser className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
