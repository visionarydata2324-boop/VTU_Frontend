import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function Section3() {
  useEffect(() => {
    AOS.init();
  }, []);

  const services = [
    { logo: '/buyData.jpg', title: 'Data Bundles' },
    { logo: '/buyAirtime.png', title: 'VTU Airtime Top up' },
    { logo: 'tvSub.jpg', title: 'Cable Subscription' },
    { logo: 'epins.jpg', title: 'Exam Scratch Card' },
    { logo: 'electric.png', title: 'Electricity Bills Payment' },
    { logo: 'payment-gateway.jpg', title: 'Automatic Payment Gateway' },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-green-100 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-20 -z-10"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 relative inline-block" data-aos="fade-up">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Our Services
          </span>
          <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2"></span>
        </h2>
        <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
          Experience fast and prompt delivery of all our services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4" data-aos="zoom-in" data-aos-delay="300">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
            <div className="w-[6rem] h-[6rem] text-white rounded-full flex items-center justify-center mb-4 animate-bounce">
              <img src={service.logo} alt="" className='max-w-full object-contain rounded-full'/>
            </div>
            {/* Service Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">
              Seamlessly delivered with the highest standards of efficiency.
            </p>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
        <Link to={'/services'}>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300">
            Explore More Services
          </button>
        </Link>
      </div>
    </div>
  );
}
