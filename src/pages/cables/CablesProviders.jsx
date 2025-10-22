// Cables.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const cableProvider = [
  {
    id: "dstv",
    name: "DSTV",
    logo: "/images/ds.jpeg",
  },
  {
    id: "gotv",
    name: "GOTV",
    logo: "/images/gotv.jpg",
  },
  {
    id: "startimes",
    name: "Startimes",
    logo: "/images/startimes.jpg",
  },
//   {
//     id: "mytv",
//     name: "MyTv",
//     logo: "/images/mytv.png",
//   },
];

export default function CablesProviders() {
  const navigate = useNavigate();

  const handleClick = (provider) => {
    navigate("/profile/cable-packages/cable-providers", { state: { provider } });
  };

  return (
    <div className="p-6">
      {/* Heading & Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          TV Cable Providers
        </h2>
        <p className="text-gray-600 mt-2 w-sm mx-auto">
          Choose your preferred cable provider below to explore available
          subscription packages. Enjoy seamless access to TV entertainment at
          your fingertips.
        </p>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cableProvider.map((cable) => (
          <div
            key={cable.id}
            onClick={() => handleClick(cable.id)}
            className="cursor-pointer relative border-green-400 rounded-xl h-44 bg-cover bg-center shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundImage: `url(${cable.logo})` }}
          >
            {/* Optional overlay (light fade effect) */}
            <div className="absolute inset-0 bg-black/10 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
