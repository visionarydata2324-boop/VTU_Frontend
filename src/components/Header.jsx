import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';

// Navigation setup
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { existingUser } = useSelector((state) => state.user);

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex">
          <Link to="/" className="font-extrabold lg:text-3xl text-2xl text-gray-900 transition duration-300 ease-in-out transform hover:scale-110">
            Ambitioux
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link key={item.name} to={item.path} className="text-lg font-semibold text-gray-900 transition duration-300 ease-in-out transform hover:scale-105">
              {item.name}
            </Link>
          ))}
          {/* Dynamic 'Create Account' or 'Profile' Link */}
          <Link to={existingUser ? '/profile' : '/signup'} className="text-lg font-semibold text-gray-900 transition duration-300 ease-in-out transform hover:scale-105">
            {existingUser ? '' : 'Create Account'}
          </Link>
        </div>

        {/* Right-side buttons */}
        <div className="flex gap-6 items-center">
          {
            !existingUser ? (
              <div className="hidden lg:flex">
                <Link to="/login" className="text-white cl2 px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                  Log In
                </Link>
              </div>
            ) : (
              <Link to={'/profile'} className={`lg:bg-gradient-to-r from-blue-500 to-purple-600 lg:text-white m1-2 mr-10 p-2 rounded-full`}>
                <FaUserAlt />
              </Link>
            )
          }

          {/* Mobile Menu (Sidebar) */}
          <div className="lg:hidden block">
            <Sidebar />
          </div>
        </div>
      </nav>
    </header>
  );
}
