import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import BuyDataButton from '../home_components/BuyDataButton';

export default function AboutHero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const { existingUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-400">
      <div className="max-w-7xl mx-auto">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-20 sm:py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
              {/* Left Content */}
              <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                  Seamless <span className="text-blue-600">Top-Up</span> Experience
                </h1>
                <p className="mt-6 text-lg text-gray-700">
                  Recharge your mobile, buy data plans, and pay bills effortlessly with our reliable VTU platform.
                </p>
                {existingUser ? (
                  <div className="mt-6">
                    <BuyDataButton />
                  </div>
                ) : (
                  <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                    <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
                      Log In
                    </Link>
                    <Link to="/signup" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 flex justify-center items-center p-2" data-aos="fade-left">
                <img src="/vtu-hero.png" alt="Ambitioux VTU App Illustration" className="lg:max-w-md max-w-full h-auto rounded-lg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
