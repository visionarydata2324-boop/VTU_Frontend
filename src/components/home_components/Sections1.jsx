import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Sections1() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset from top of the viewport
    });
  }, []);

  const dataServices = [
    {
      id: 1,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg',
      head: 'MTN Data Plan',
      plan1: '500MB 30 Days - #130',
      plan2: '1GB 30 Days - #260',
      plan3: '2GB 30 Days - #520',
      tooltip: 'Affordable MTN data plans for everyone.',
    },
    {
      id: 2,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Airtel_logo-01.png/1200px-Airtel_logo-01.png',
      head: 'Airtel Data Plan',
      plan1: '750MB 30 Days - #150',
      plan2: '1.5GB 30 Days - #300',
      plan3: '3GB 30 Days - #600',
      tooltip: 'Stay connected with 9Mobile.',
    },
    {
      id: 3,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ95f7e_c6uxbGUyUn_jT1MCOySfCAoEjE8TA&s',
      head: 'Glo Data Plan',
      plan1: '500MB 30 Days - #130',
      plan2: '1GB 30 Days - #260',
      plan3: '2GB 30 Days - #520',
    },
    {
      id: 4,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ5NyP_4Se11SXnz9hvsbF829TqjE23u-0hg&s',
      head: '9Mobile Data Plan',
      plan1: '500MB 30 Days - #130',
      plan2: '1GB 30 Days - #260',
      plan3: '2GB 30 Days - #520',
    }
  ];

  return (
    <div className="bg-gray-100 py-20">
      <h1 className="text-center lg:text-5xl text-3xl font-bold md:mb-14 mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500" data-aos="fade-down">
        Explore Our Data Plans
      </h1>
      <div className="md:max-w-[90%] max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {dataServices.map((service) => (
            <div key={service.id} data-aos="zoom-in-up" className="relative border border-gray-200 rounded-xl shadow-lg bg-white p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src={service.logo} alt={`${service.head} logo`} className="mx-auto max-w-[80px] rounded-full mb-4"/>
              <h2 className="text-blue-800 text-center text-xl font-semibold">{service.head}</h2>
              <ul className="list-none text-center text-gray-700 space-y-1 mt-4">
                <li className="text-sm">{service.plan1}</li>
                <li className="text-sm">{service.plan2}</li>
                <li className="text-sm">{service.plan3}</li>
              </ul>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white text-xs p-2 rounded-lg shadow-md opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                {service.tooltip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
