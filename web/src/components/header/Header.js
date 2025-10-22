import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#ded1c7] py-4"> 
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img  
            src="/images/logo.png" 
            alt="SKY EXPERIENCE Logo"
            className="h-10 md:h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/") ? "text-orange-500" : "text-gray-800"}`}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/about") ? "text-orange-500" : "text-gray-800"}`}
          >
            About us
          </Link>
          <Link 
            to="/booking" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/booking") ? "text-orange-500" : "text-gray-800"}`}
          >
            Flight
          </Link>
          <Link 
            to="/contact" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/contact") ? "text-orange-500" : "text-gray-800"}`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop BOOK NOW Button */}
        <Link 
          to="/booking" 
          className="hidden md:block bg-[#a43518] hover:scale-110 transition-all duration-300 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-orange-600"
        >
          BOOK NOW
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            className="text-gray-800 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white mt-2 mx-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
        <div className="flex flex-col gap-0 p-4">
          <Link 
            to="/" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/about") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            About us
          </Link>
          <Link 
            to="/booking" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/booking") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            Flight
          </Link>
          <Link 
            to="/contact" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/contact") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link 
            to="/booking" 
            className="bg-[#a43518] text-white px-4 py-3 rounded-full font-bold text-center mt-2 hover:bg-orange-600 transition-colors"
            onClick={closeMobileMenu}
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </header>
  );
}