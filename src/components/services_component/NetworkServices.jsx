import React from "react";
import { Link } from "react-router-dom";

const services = ["MTN", "AIRTEL", "GLO", "9MOBILE"];

// Get background color based on network
const getBgColor = (network) => {
  switch (network) {
    case "MTN":
      return "bg-yellow-400";
    case "AIRTEL":
      return "bg-red-700";
    case "GLO":
      return "bg-green-600";
    case "9MOBILE":
      return "bg-green-600";
    default:
      return "bg-gray-900";
  }
};

// Get text color based on network
const getTextColor = (network) => {
  switch (network) {
    case "MTN":
      return "text-gray-800";
    default:
      return "text-white";
  }
};

const NetworkServices = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Choose Your Network
      </h2>

      {/* Service Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {services.map((network) => (
          <Link
            key={network}
            to="services"
            state={{ network }} // ✅ v6 way of passing state
            className={`flex items-center justify-center w-full h-40 sm:h-48 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${getBgColor(network)} ${getTextColor(network)}`}
          >
            <span className="text-2xl font-bold">{network}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NetworkServices;
