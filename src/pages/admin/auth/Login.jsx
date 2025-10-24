import React, { useState } from 'react';
import axios from 'axios';
import { HiEye, HiEyeSlash } from 'react-icons/hi2'; // <-- from react-icons
import { getBaseUrl } from '../../../config';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${getBaseUrl()}/api/v1/login`, formData);
      console.log('Login success:', res.data);
      // Redirect or store token logic here
    } catch (err) {
      console.error(err);
      setErrors({ server: 'Invalid credentials or server error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {errors.server && (
          <div className="text-red-500 text-sm mb-4">{errors.server}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <div className="absolute text-xs text-red-500 mt-1">
                {errors.email}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showPassword ? (
                  <HiEyeSlash className="w-5 h-5 text-gray-500" />
                ) : (
                  <HiEye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="absolute text-xs text-red-500 mt-1">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
