import React, { useState } from 'react';

const ApiComponent = () => {
  const [userData, setUserData] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [error, setError] = useState(null);

  // Base URL for the backend API
  const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with actual API URL

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user-profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // For authorized requests
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch user data');
    }
  };

  // Create a transaction (example)
  const createTransaction = async (amount, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // For authorized requests
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, userId }),
      });

      if (!response.ok) {
        throw new Error('Transaction failed');
      }

      const data = await response.json();
      setTransactionStatus(`Transaction successful: ${data.transactionId}`);
    } catch (err) {
      setTransactionStatus(err.message || 'Transaction failed');
    }
  };

  // Handle API requests
  const handleApiRequest = async (action) => {
    if (action === 'fetchUserData') {
      fetchUserData();
    } else if (action === 'createTransaction') {
      createTransaction(100, 1); // Example: Creating a transaction of 100 for userId 1
    }
  };

  return (
    <div className="api-component">
      <h2 className="text-xl font-bold text-center mb-4">Developer API Interface</h2>

      {/* API Request Buttons */}
      <div className="mb-4">
        <button
          onClick={() => handleApiRequest('fetchUserData')}
          className="py-2 px-6 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition mr-4"
        >
          Fetch User Data
        </button>

        <button
          onClick={() => handleApiRequest('createTransaction')}
          className="py-2 px-6 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          Create Transaction
        </button>
      </div>

      {/* Displaying Response Data */}
      {userData && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-md">
          <h3 className="font-semibold">User Data:</h3>
          <pre className="text-sm text-gray-700">{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}

      {/* Displaying Transaction Status */}
      {transactionStatus && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-md">
          <h3 className="font-semibold">Transaction Status:</h3>
          <p className="text-sm text-gray-700">{transactionStatus}</p>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
