// import React from "react";
import { Link } from "react-router-dom"; // If you are using React Router for navigation
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-[#F4F4F4] py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Address */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">&copy; JobPortal</p>
          <p className="text-sm text-lg">#10 Workshop, Yamuna Nagar, India</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="hover:text-[#FFCC00]">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#FFCC00]">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#FFCC00]">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-[#FFCC00]">
            Privacy Policy
          </Link>
          <Link to="/helpcenter" className="hover:text-[#FFCC00]">
            Help center
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFCC00]"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFCC00]"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFCC00]"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="text-center mt-3 text-sm font-semibold">
        <p>&copy; 2024 Manu Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
