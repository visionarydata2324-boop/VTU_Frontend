import React from "react";
import { FaUserPlus, FaWallet, FaListAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  { label: "Create Account", icon: <FaUserPlus /> },
  { label: "Fund Wallet", icon: <FaWallet /> },
  { label: "Choose Service", icon: <FaListAlt /> },
  { label: "Confirm & Done", icon: <FaCheckCircle /> },
];

export default function HowItWorks() {
  return (
    <div className="mt-20 px-4 bg-white lg:p-8 p-3 rounded-lg" data-aos="fade-up">
      <h3 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
        How It Works
      </h3>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-pink-500 text-white text-xl rounded-full flex items-center justify-center mb-4 shadow-md">
              {step.icon}
            </div>
            <p className="text-gray-800 font-semibold text-lg">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
