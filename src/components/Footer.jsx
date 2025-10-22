import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert('Subscribed!');
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col lg:flex-row md:justify-between justify-start items-start space-y-6 lg:space-y-0">
          
          {/* Contact Info Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-blue-400">Contact Us</h3>

            {/* Phone Numbers and Emails Section */}
            <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-6 lg:space-y-0">
              {/* Phone Numbers */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-xl font-semibold text-gray-300">Phone Numbers</h4>
                <p>
                  <span className="font-medium text-gray-400">Primary:</span>
                  <a href="tel:+2347062194220" className="text-blue-400 hover:text-blue-600">07062194220</a>
                </p>
                <p>
                  <span className="font-medium text-gray-400">Secondary:</span>
                  <a href="tel:+2349031382568" className="text-blue-400 hover:text-blue-600">09031382568</a>
                </p>
                <p>
                  <span className="font-medium text-gray-400">Support:</span>
                  <a href="tel:+2348080539565" className="text-blue-400 hover:text-blue-600">08080539565</a>
                </p>
              </div>

              {/* Emails */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-xl font-semibold text-gray-300">Email Us</h4>
                <p>
                  <span className="font-medium text-gray-400">General Inquiries:</span>
                  <a href="mailto:ambitiousambali23@gmail.com" className="text-blue-400 hover:text-blue-600">ambitiousambali23@gmail.com</a>
                </p>
                <p>
                  <span className="font-medium text-gray-400">Support:</span>
                  <a href="mailto:visionarydata2324@gmail.com" className="text-blue-400 hover:text-blue-600">visionarydata2324@gmail.com</a>
                </p>
                <p>
                  <span className="font-medium text-gray-400">Business Inquiries:</span>
                  <a href="mailto:Al-Ambitious24@gmail.com" className="text-blue-400 hover:text-blue-600">Al-Ambitious24@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="text-blue-400 hover:text-blue-600">Home</a></li>
              <li><a href="/about" className="text-blue-400 hover:text-blue-600">About Us</a></li>
              <li><a href="/privacy-policy" className="text-blue-400 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="/terms" className="text-blue-400 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-blue-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.04C6.48 2.04 2 6.52 2 12s4.48 9.96 10 9.96c5.52 0 10-4.48 10-9.96S17.52 2.04 12 2.04zM12 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM13 7h-2v6h2V7zM13 13h-2v2h2v-2z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.4 10.4 0 0 1-3 1 4.7 4.7 0 0 0 2-2.6 9.6 9.6 0 0 1-3 1.2 4.8 4.8 0 0 0-8.6 3.3c-3.6-.2-6.8-1.9-8.9-4.5a4.7 4.7 0 0 0 1.5 6.3c-.6 0-1.2-.2-1.7-.5v.1c0 2.3 1.6 4.2 3.8 4.6a4.9 4.9 0 0 1-2.1.1c.6 1.8 2.2 3.1 4.2 3.1a9.6 9.6 0 0 1-5.9 2c-.3 0-.6 0-.9-.1a13.1 13.1 0 0 0 7.1 2c8.5 0 13.2-7 13.2-13.1v-.6a9.7 9.7 0 0 0 2-2.4z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.4c3.1 0 3.5.01 4.7.07 1.2.06 2.3.31 3.1 1.03.8.72 1.3 1.7 1.6 3.1.72 2.6.72 7.1.72 7.6s0 5.1-.72 7.6c-.28 1.4-.82 2.4-1.6 3.1-.8.72-1.9.97-3.1 1.03-1.2.06-1.6.07-4.7.07s-3.5-.01-4.7-.07c-1.2-.06-2.3-.31-3.1-1.03-.8-.72-1.3-1.7-1.6-3.1-.72-2.6-.72-7.1-.72-7.6s0-5.1.72-7.6c.28-1.4.82-2.4 1.6-3.1.8-.72 1.9-.97 3.1-1.03 1.2-.06 1.6-.07 4.7-.07zm0 1.2c-3 0-3.4.01-4.6.06-1.1.05-1.8.2-2.3.7-.5.4-.7.9-.7 1.6 0 .9.2 1.6.7 2.1.5.5 1.2.7 2.3.7 1.2 0 1.7-.06 2.3-.7.5-.5.7-1.2.7-2.1 0-.7-.2-1.2-.7-1.6-.5-.5-1.2-.65-2.3-.7-1.2-.05-1.6-.06-4.6-.06s-3.4.01-4.6.06c-1.1.05-1.8.2-2.3.7-.5.4-.7.9-.7 1.6 0 .9.2 1.6.7 2.1.5.5 1.2.7 2.3.7 1.2 0 1.7-.06 2.3-.7.5-.5.7-1.2.7-2.1 0-.7-.2-1.2-.7-1.6-.5-.5-1.2-.65-2.3-.7zm0 4.5c-1.4 0-2.5.4-3.4 1.3-.9.9-1.3 2.1-1.3 3.5s.4 2.5 1.3 3.4c.9.9 2.1 1.3 3.4 1.3 1.4 0 2.5-.4 3.4-1.3.9-.9 1.3-2.1 1.3-3.4s-.4-2.5-1.3-3.4c-.9-.9-2.1-1.3-3.4-1.3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 text-center space-y-4">
          <h3 className="text-3xl font-bold text-gray-400">Subscribe to Our Newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className="flex justify-center space-x-2">
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" className="p-2 rounded text-black" required/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Virtual Top-Up. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
