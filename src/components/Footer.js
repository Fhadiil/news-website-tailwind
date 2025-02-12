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

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              About Us
            </h5>
            <p className="text-gray-600">
              We are The News, your go-to source for the latest news, articles,
              and updates from around the world. Stay informed with unbiased and
              in-depth reporting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h5>
            <nav className="flex flex-col space-y-3">
              {[
                "Home",
                "Business",
                "Technology",
                "Politics",
                "Sports",
                "Entertainment",
              ].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              Follow Us
            </h5>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, url: "https://facebook.com" },
                { icon: FaTwitter, url: "https://twitter.com" },
                { icon: FaInstagram, url: "https://instagram.com" },
                { icon: FaLinkedin, url: "https://linkedin.com" },
              ].map(({ icon: Icon, url }) => (
                <a
                  key={url}
                  href={url}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} The News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
