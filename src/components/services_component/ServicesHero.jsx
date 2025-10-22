import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from "react-redux";
import BuyDataButton from "../home_components/BuyDataButton";

export default function ServicesHero() {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    const { existingUser } = useSelector((state) => state.user);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-400 text-black py-20 px-6 lg:px-12">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 space-y-12 lg:space-y-0">
        {/* Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            <span className="text-black">Seamless </span>
            <span className="text-blue-600">VTU Recharge</span>
            <span className="text-purple-600"> & Bill Payments</span>
          </h1>
          <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8">
            Experience fast, secure, and reliable mobile top-ups and bill payments for all your needs. Stay connected with our easy-to-use VTU services.
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
        <div className="md:w-1/2 flex justify-center items-center p-2" data-aos="fade-left">
            <img src="/home_hero.png" alt="Virtual Top Up" className="transition-transform rounded-xl duration-300 hover:scale-105 lg:max-w-md max-w-full h-auto"/>
        </div>
      </div>
    </section>
  );
}
