import React, { useState, useEffect, Fragment } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Dialog, Transition } from '@headlessui/react';
import { getBaseUrl } from '../../config';

console.log(getBaseUrl());

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // console.log(getBaseUrl());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      openModal();
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      openModal();
      return;
    }

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
      });

      const data = await response.json();

      // console.log(data);

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        openModal();
        return;
      }

      setSuccess(data.message || 'Registration successful!');
      setError('');
      setLoading(false);
      openModal();

      setTimeout(() => {
        navigate('/verify-email', { state: { email } });
      }, 1500);

    } catch (error) {
      console.error('Registration Error:', error);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
      openModal();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 md:py-20 py-10 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-md w-full bg-white rounded-lg shadow-lg md:p-6 p-3"
          data-aos="fade-up"
        >
          <h2
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6"
            data-aos="zoom-in"
          >
            Register Now
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* ✅ First & Last Name side by side */}
            <div className="flex md:space-x-3 space-x-1">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  data-aos="fade-right"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  data-aos="fade-left"
                />
              </div>
            </div>

            {/* ✅ Email */}
            <div className="gird grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@example.com"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  data-aos="fade-right"
                />
              </div>

              {/* ✅ Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 08012345678"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  data-aos="fade-left"
                />
              </div>
            </div>

            {/* ✅ Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                data-aos="fade-right"
              />
            </div>

            {/* ✅ Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                data-aos="fade-left"
              />
            </div>

            {/* ✅ Login link */}
            <div className="text-sm text-center w-full">
              <Link to="/login" className="text-gray-400">
                Already have an account?{' '}
                <span className="text-blue-600 hover:text-blue-500">Login</span>
              </Link>
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
              <Dialog.Title
                className={`text-2xl font-bold ${success ? 'text-green-600' : 'text-red-600'}`}
              >
                {success ? 'Success!' : 'Error!'}
              </Dialog.Title>
              <p className="mt-2 text-gray-700">{success || error}</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={closeModal}
              >
                Got it, thanks!
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <Footer />
    </>
  );
};

export default CreateAccountPage;