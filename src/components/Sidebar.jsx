import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu4Line } from 'react-icons/ri';
import { FaRegWindowClose } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.API_BASE_URL || "https://vtu-xpwk.onrender.com";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Access the existingUser from Redux store to get the token
  const { existingUser } = useSelector((state) => state.user);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 cl2 text-white bg-gradient-to-r from-blue-500 to-purple-600 fixed top-4 right-4 z-50 rounded-md transition-transform hover:scale-105">
        {sidebarOpen ? <FaRegWindowClose className="text-2xl" /> : <RiMenu4Line className="text-2xl" />}
      </button>

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 right-0 z-40 w-[70%] bg-white text-black transform ${
          sidebarOpen ? '-translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-lg`}>
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex">
              <Link to="/" className="font-extrabold text-3xl text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"> 
                  Ambitioux
              </Link>
            </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white p-1 rounded-md focus:outline-none">
            <FaRegWindowClose className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-3 px-2">
          {navigation.map((item) => (
            <Link key={item.name} to={item.path} className="block hover:bg-gray-200 px-4 py-3 hover:text-blue-500 text-lg font-medium rounded-md duration-150 ease-in-out">
              {item.name}
            </Link>
          ))}

          {
            !existingUser ? (
              <div className="hidden lg:flex">
                <Link to="/login" className="block hover:bg-gray-200 px-4 py-3 hover:text-blue-500 text-lg font-medium rounded-md duration-150 ease-in-out">
                  Log In
                </Link>
              </div>
            ) : (
              <Link to={'/profile'} className={`block hover:bg-gray-200 px-4 py-3 hover:text-blue-500 text-lg font-medium rounded-md duration-150 ease-in-out`}>
                My Profile
              </Link>
            )
          }
        </nav>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default Sidebar;
