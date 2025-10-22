import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sample client data
const clients = [
  { id: 1, name: 'Client One', logo: 'https://via.placeholder.com/100', alt: 'Client One Logo' },
  { id: 2, name: 'Client Two', logo: 'https://via.placeholder.com/100', alt: 'Client Two Logo' },
  { id: 3, name: 'Client Three', logo: 'https://via.placeholder.com/100', alt: 'Client Three Logo' },
  { id: 4, name: 'Client Four', logo: 'https://via.placeholder.com/100', alt: 'Client Four Logo' },
  { id: 5, name: 'Client Five', logo: 'https://via.placeholder.com/100', alt: 'Client Five Logo' },
];

const ClientsLogos = () => {
  // Initialize AOS on page load
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl font-bold text-center text-gray-800"
          data-aos="fade-up"
        >
          Our Trusted Clients
        </h2>
        <p
          className="mt-2 text-center text-gray-600 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          We are proud to work with these amazing companies.
        </p>
        <div
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={client.logo}
                alt={client.alt}
                className="h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsLogos;
