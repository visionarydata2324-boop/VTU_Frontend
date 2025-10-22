import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import BuyDataButton from './BuyDataButton';

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with custom options
  }, []);

  const { existingUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-400">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto md:max-w-[90%] max-w-full py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full space-y-8 lg:space-y-0" data-aos="fade-up">
            {/* Left Text Section */}
            <div className="lg:w-[45%] sm:w-[97%] w-full text-center lg:text-left" data-aos="fade-right">
              <h1 className="text-balance lg:text-6xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl leading-tight">
                Instant <span className="text-blue-600">Recharge</span> On{' '}
                <span className="text-purple-600">Ambitioux</span>
              </h1>
              <p className="mt-6 text-gray-700 text-lg font-medium leading-relaxed">
                Experience seamless and secure online top-ups with our fast and reliable service. Get started today and stay connected in just a few clicks.
              </p>
              {existingUser ? (
                <div className="mt-5">
                  <BuyDataButton />
                </div>
              ) : (
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6" data-aos="zoom-in">
                  <Link to="/login" className="rounded-md bg-blue-600 w-[150px] py-2 text-[16px] font-semibold text-white shadow-lg text-center transition-all transform hover:scale-105 hover:bg-blue-700">
                    Log In
                  </Link>
                  <Link to="/signup" className="rounded-md bg-green-500 w-[150px] py-2 text-[16px] font-semibold text-white shadow-lg text-center transition-all transform hover:scale-105 hover:bg-lime-500">
                    Register
                  </Link>
                </div>
              )}
            </div>
            
            {/* Right Image Section */}
            <div className="lg:w-1/2 flex justify-center items-center p-2" data-aos="fade-left">
              <img src="/home_hero.png" alt="Virtual Top Up" className="transition-transform rounded-xl duration-300 hover:scale-105 lg:max-w-md max-w-full h-auto"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}