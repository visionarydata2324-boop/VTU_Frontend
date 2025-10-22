import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../../../store/userReducers";
import { getBaseUrl } from "../../../config";

export default function Fund_wallet() {
  const navigate = useNavigate();
  const { existingUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    amount: 0,
    paymentCategory:"Fund Wallet",
    servicePaidFor: "Fund Wallet",
    paymentDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async (event) => {
    event.preventDefault(); // Prevents default form submission (page reload)
    
    if (!formData.paymentDescription || !formData.amount) {
      setError("Both amount and payment description are required.");
      setIsDialogOpen(true);
      return;
    }
  
    setLoading(true);
    setError("");
  try {
  const response = await fetch(`${getBaseUrl()}/api/v1/make-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${existingUser.token}`,
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  console.log(result)
  
  if (!response.ok || result.error) {
    setError(result.message || "Payment failed");
    setIsDialogOpen(true);
    setLoading(false);
    return;
  }

  // ✅ Redirect user to Monnify checkout page
  if (result.data.requestSuccessful) {
    window.location.href = result.data.responseBody.checkoutUrl;
    return; // stop further execution
  }

  // ✅ If no redirect (maybe success from API directly)
  setSuccess(true);
  setLoading(false);

} catch (err) {
  setError(err.message || "Something went wrong");
  console.error(err);
  setIsDialogOpen(true);
  setLoading(false);
}

  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative max-w-md mx-auto md:my-20 my-10 p-6 mx-2 bg-white shadow-lg rounded-lg">
      <div className="absolute top-2 left-2">
        <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
      </div>
      <h2 className="text-2xl font-bold text-center">Fund Wallet</h2>

      <div className="mt-4 p-4 border rounded space-y-3">
        <form onSubmit={handlePayment}> {/* Add onSubmit to the form */}
          <label className="block">
            <span className="text-gray-500">Amount</span>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Enter amount"
            />
          </label>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <label className="block">
              <span className="text-gray-500">Payment Category</span>
              <input
                type="text"
                name="paymentDescription"
                value={formData.paymentCategory}
                onChange={handleChange}
                className="mt-1 block w-full text-gray-400 cursor-not-allowed p-2 border rounded"
                placeholder="Enter payment description..."
                disabled
              />
            </label>
            <label className="block">
              <span className="text-gray-500">Service Paid For</span>
              <input
                type="text"
                name="paymentDescription"
                value={formData.servicePaidFor}
                onChange={handleChange}
                className="mt-1 block w-full text-gray-400 cursor-not-allowed p-2 border rounded"
                placeholder="Enter payment description..."
                disabled
              />
            </label>
          </div>
          <label className="block">
            <span className="text-gray-500">Payment Description</span>
            <input
              type="text"
              name="paymentDescription"
              value={formData.paymentDescription}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Enter payment description..."
            />
          </label>

          {success && <p className="text-green-500 mt-2">Payment Successful! Redirecting...</p>}

          <button
            type="submit" // Change to type submit
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-red-600">Payment Error</h3>
            <p className="text-gray-700 mt-2">{error}</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}