import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Section3 from '../components/home_components/Section3';
import Testimonial from '../components/Testimonial';
import FAQ from '../components/home_components/Faqs';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AboutHero from '../components/about_component/AboutHero';

const About_page = () => {
  // Initialize AOS on page load
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header />
      <div className=" bg-gray-50 text-gray-800">
        <AboutHero/>
        <div className="max-w-7xl mx-auto mt-12">
          <h1
            className="text-4xl text-center sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ADF802] via-[#4169E1] to-[#ADF802] leading-tight mt-4 mb-4"
            data-aos="fade-up"
          >
            Welcome to Ambitioux
          </h1>
          <p
            className="mt-4 text-xl text-center max-w-2xl mx-auto text-gray-600"
            data-aos="fade-up"
          >
            Your one-stop platform for hassle-free, instant virtual top-ups and online payments. We’re dedicated to bringing you a seamless experience with fast, secure, and convenient services.
          </p>

          {/* Second Section with Styled Border */}
          <div className="mt-12 border-2 p-6 rounded-xl shadow-lg border-gradient-to-r from-[#ADF802] via-[#4169E1] to-[#ADF802] grid md:grid-cols-2 gap-12">
            <div className="space-y-4" data-aos="fade-right">
              <h2 className="text-3xl font-semibold">Who We Are</h2>
              <p className="text-lg text-gray-700">
                At Ambitioux, we believe staying connected and keeping your digital services active should be quick, simple, and accessible from anywhere. Whether it's topping up your mobile, gaming account, or online subscription, we’ve got you covered.
              </p>
              <p className="text-lg text-gray-700">
                We work hard to ensure that every transaction is smooth, safe, and completed in just a few clicks. Our mission is to provide the best digital top-up services while focusing on customer satisfaction, security, and innovation.
              </p>
            </div>

            <div className="space-y-4" data-aos="fade-left">
              <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-lg text-gray-700">Fast & Secure: Instant top-ups with the latest encryption technology to keep your data safe.</li>
                <li className="text-lg text-gray-700">Wide Range of Services: From mobile phones to online gaming credits, we offer top-up services across multiple platforms.</li>
                <li className="text-lg text-gray-700">24/7 Customer Support: Our team is always here to assist you, ensuring your experience is seamless and stress-free.</li>
                <li className="text-lg text-gray-700">Global Access: No matter where you are, you can top up your accounts anywhere, anytime.</li>
              </ul>
            </div>
          </div>

          {/* Our services page */}
          <Section3 />

          {/* Testimonials Section */}
          <Testimonial />

          {/* FAQ Section */}
          <FAQ/>

          <div className="my-12 text-center max-w-3xl md:px-0 px-3 mx-auto" data-aos="zoom-in">
            <h2 className="text-3xl font-semibold text-blu-600">Our Commitment to You</h2>
            <p className="mt-4 text-lg text-gray-700">
              We are committed to providing top-notch services that make your life easier and more connected. Whether it's making sure you never run out of mobile data or ensuring your gaming experience is always on point, [Your Website Name] is here to make it happen.
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-700 transition duration-300" data-aos="bounce">
              <Link to={'/login'}>
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About_page;
