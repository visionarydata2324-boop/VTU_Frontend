import React from 'react';
import { Link } from 'react-router-dom';

function BuyDataButton() {
  return (
    <Link to="/profile" className="relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-transform duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:scale-110 hover:shadow-xl">
      Buy Data Now
      <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
    </Link>
  );
}

export default BuyDataButton;
