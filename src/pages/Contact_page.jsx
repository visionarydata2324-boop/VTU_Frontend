import React, { useState } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-black flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center py-12" data-aos="fade-down">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto">We’re here to help you with any questions or concerns. Feel free to get in touch!</p>
        </div>

        <form className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-8 space-y-6" data-aos="fade-up" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Email"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea id="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Message" ></textarea>
            </div>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Send Message
          </button>
        </form>

        <div className="text-center bg-white my-8 space-y-4 shadow-xl p-4 rounded-md" data-aos="fade-up">
          <p className="text-lg">You can also reach us through:</p>
          <div className="space-y-2">
            <p><span className="font-bold">Email:</span> support@virtualtopup.com</p>
            <p><span className="font-bold">Phone:</span> +1 (555) 123-4567</p>
          </div>
          <p className="text-sm text-gray-400">We strive to respond within 24 hours.</p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;
