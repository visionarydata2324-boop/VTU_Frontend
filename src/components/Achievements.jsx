import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Achievements = () => {
  // Initialize AOS and counter animations
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const counters = document.querySelectorAll('[data-count]');
    const animateCounters = () => {
      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-count');
          const current = +counter.innerText;
          const increment = target / 100;

          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
    };

    // Trigger counters animation after the page loads
    animateCounters();
  }, []);

  return (
    <div className="bg-gray-50 py-12">

      <div className="mt-12 text-center xl:max-w-[90%] max-w-[97%] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600" data-aos="fade-up">Our Achievements</h2>
        <p className="text-lg text-gray-700 mt-2" data-aos="fade-up"> Trusted by customers worldwide for seamless digital solutions</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300" data-aos="zoom-in">
            <p className="text-6xl font-bold text-blue-600" data-count="2000">0</p>
            <p className="text-lg text-gray-700 mt-2">Happy Customers</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300"data-aos="zoom-in"data-aos-delay="100">
            <p className="text-6xl font-bold text-blue-600"data-count="5000">0</p>
            <p className="text-lg text-gray-700 mt-2">Successful Top-Ups</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300" data-aos="zoom-in" data-aos-delay="200">
            <p className="text-6xl font-bold text-blue-600" data-count="150">0</p>
            <p className="text-lg text-gray-700 mt-2">Global Partners</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300" data-aos="zoom-in" data-aos-delay="300">
            <p className="text-6xl font-bold text-blue-600" data-count="10000">0</p>
            <p className="text-lg text-gray-700 mt-2">Transactions Processed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
