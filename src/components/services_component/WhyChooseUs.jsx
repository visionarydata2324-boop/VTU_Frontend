import React from "react";
import {
  FiShield,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiLayout,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    title: "Instant and Secure Transactions",
    description: "Enjoy lightning-fast transactions with top-grade encryption for peace of mind.",
    icon: <FiShield className="text-blue-500 text-3xl mb-4 mx-auto" />,
  },
  {
    title: "24/7 Support System",
    description: "Our dedicated support team is available round the clock to assist you.",
    icon: <FiClock className="text-pink-500 text-3xl mb-4 mx-auto" />,
  },
  {
    title: "Affordable Prices",
    description: "Access VTU services at the most competitive rates in the market.",
    icon: <FiDollarSign className="text-blue-500 text-3xl mb-4 mx-auto" />,
  },
  {
    title: "Reliable Uptime",
    description: "Count on us with consistent service availability and system reliability.",
    icon: <FiTrendingUp className="text-pink-500 text-3xl mb-4 mx-auto" />,
  },
  {
    title: "User-Friendly Dashboard",
    description: "Navigate easily with a clean, intuitive interface designed for everyone.",
    icon: <FiLayout className="text-blue-500 text-3xl mb-4 mx-auto" />,
  },
  {
    title: "Fast Wallet Funding",
    description: "Top up your wallet in seconds and continue transactions without delay.",
    icon: <FiZap className="text-pink-500 text-3xl mb-4 mx-auto" />,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="mt-20 lg:p-8 p-3 bg-gray-100 rounded-lg" data-aos="fade-up">
      <h3 className="text-2xl font-bold text-gray-800 mb-10 text-center">
        Why Choose Us
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-gray-700 text-center"
          >
            {feature.icon}
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
