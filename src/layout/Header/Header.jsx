import React from 'react'

export default function Header() {
  
  return (
    <header className="text-white z-10 top-0 sticky bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 duration-150 hover:text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5a3.75 3.75 0 01-7.5 0M19.5 9c0-3.533-2.167-6.797-5.7-7.825a.75.75 0 00-.6 0C6.667 2.203 4.5 5.467 4.5 9c0 3.75-1.5 6-1.5 6h18s-1.5-2.25-1.5-6z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1"> 3</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvHOqSGRmj_SeRuzMpVCHbYeBtLAYKJmk3Vg&s" alt="User" className="w-8 h-8 object-fill rounded-full" />
              <span className="hidden md:inline font-medium">
                Admin
              </span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden hidden group-hover:block">
              <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={() => alert("Logged out")}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
