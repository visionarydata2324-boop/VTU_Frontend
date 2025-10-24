import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl } from '../../config';

const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please fill in the field');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/verify-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      console.log(data)
      
      if (data.status === 'error') {
        setError(data.message);
        // console.log(data);
        return;
      }
      
      setSuccess(data.message);
      // console.log(data);
      
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
        <Header/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // required
                    />
                {error && <p className="text-red-500 bg-red-200 py-2 px-6 rounded-sm text-start mb-4">{error}</p>}
                {success && <p className="text-green-500 bg-green-200 px-6 text-start mb-4">{success}</p>}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify Account'}
                </button>
                </form>
            </div>
            </div>
        <Footer/>
    </div>
  );
};

export default VerifyAccount;
