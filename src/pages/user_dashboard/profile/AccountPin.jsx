import React, { useState } from 'react';

const AccountPin = () => {
  const [pin, setPin] = useState('');
  const [rePin, setRePin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (pin.length !== 5 || rePin.length !== 5) {
      setError('PIN must be exactly 5 digits');
      return;
    }

    if (pin !== rePin) {
      setError('Pins do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/setup-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save PIN');
      setSuccess('PIN saved successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Setup Your Pin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Enter Pin*</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg outline-none"
              placeholder="Enter 5 digit pin"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Re-Enter Pin*</label>
            <input
              type="password"
              value={rePin}
              onChange={(e) => setRePin(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg outline-none"
              placeholder="Enter same 5 digit pin"
              maxLength="5"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            className={`w-full py-2 text-white font-bold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Pin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPin;
