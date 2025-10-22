import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Network logos mapping
const networkLogos = {
  MTN: "/mtn.jpg",
  AIRTEL: "/airtel.jpg",
  GLO: "/glo.jpg",
  "9MOBILE": "/9mobile.webp",
};

export default function BuyDataNow() {
  const location = useLocation();
  const data = location.state; // Retrieve data from navigation

  console.log(data)
  let navigate = useNavigate(); // Initialize useNavigate hook
  // Log the data to ensure it's available
  // console.log("Data in BuyDataNow:", data);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }
  return (
    <div className="flex justify-center my-14 px-2">
      <div className="w-96 border border-gray-200 shadow-xl rounded-xl bg-white transition transform hover:scale-105 duration-300">
        <div className="absolute top-2 left-2 z-10">
          <button className="bg-red-600 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
        </div>
        {/* Network Banner */}
        <div className="relative p-4">
          <img
            src={networkLogos[data.network] || networkLogos[data.networkProvider] || ""}
            alt={data.network}
            className="w-full h-[200px] object-cover rounded-xl"
          />
          <span className="absolute top-3 right-3 bg-white text-gray-700 px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
            {data.network}
          </span>
        </div>

        {/* Plan Details */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">{data.size}</h2>
          <div className="border-t my-2"></div>

          <div className="flex justify-between gap-3 text-gray-600">
            <p><strong>Duration:</strong> {data.duration}</p>
            <p><strong>Price:</strong> ₦{data.price}</p>
          </div>

          {/* Buy Now Button (Navigate with Data) */}
          <Link to="make-payment"  state={data} className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-300">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
