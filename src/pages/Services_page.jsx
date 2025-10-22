import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesHero from '../components/services_component/ServicesHero';
import WhyChooseUs from '../components/services_component/WhyChooseUs';
import HowItWorks from '../components/services_component/HowItWorks';

const services = [
  { logo: '/buyData.jpg', title: 'Data Bundles' },
  { logo: '/buyAirtime.png', title: 'VTU Airtime Top up' },
  { logo: 'tvSub.jpg', title: 'Cable Subscription' },
  { logo: 'epins.jpg', title: 'Exam Scratch Card' },
  { logo: 'electric.png', title: 'Electricity Bills Payment' },
  { logo: 'payment-gateway.jpg', title: 'Automatic Payment Gateway' },
];

export default function ServicesPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="">
      <Header />
      <div className="">
        <ServicesHero/>
      </div>
        <div className="bg-gray-50 py-16 px-4 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4" data-aos="fade-down">
              Our Services
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12" data-aos="fade-up">
              Explore the variety of services we offer to keep you connected, powered, and ahead.
            </p>

            {/* Service Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8" data-aos="fade-up">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
                  <img
                    src={service.logo}
                    alt={service.title}
                    className="w-20 h-20 object-cover mb-4 rounded-full border"
                  />
                  <h3 className="text-lg font-semibold text-gray-700">{service.title}</h3>
                </div>
              ))}
            </div>

            {/* How It Works */}
            <HowItWorks/>

            {/* Why Choose Us */}
            <WhyChooseUs/>

            {/* Call to Action */}
            <div className="mt-20 bg-blue-600 text-white py-12 px-6 rounded-xl text-center" data-aos="fade-up">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6">Join thousands who trust us for fast and reliable virtual services.</p>
              <Link
                to="/signup"
                className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}
