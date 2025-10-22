import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useServiceType } from "../SwitchServiceType/ServiceTypeContext";
import OutstandingDebtNotice from "../OutstandingDebtNotice";
import { getBaseUrl } from "../../config";

const token = localStorage.getItem("authToken");

export default function MakePayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state; // Retrieve data

  const { serviceType } = useServiceType();

  
  // Initialize form data state
  const [formData, setFormData] = useState({
    networkProvider: paymentData?.networkProvider,
    size: paymentData?.size,
    duration: paymentData?.duration,
    serviceType: paymentData?.serviceType,
    mobile_number: '',
    price: paymentData?.price,
  });

  // console.log();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { existingUser } = useSelector((state) => state.user);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Get current user from Redux store
  // Handle payment request
  const handlePayment = async () => {
    if (!formData.mobile_number) {
      setError("Mobile number is required.");
      setIsDialogOpen(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/buy-data`, {
        method: "POST",
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Service-Type' : serviceType
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      console.log(result.data);

      if (!response.ok || result.data.status === 'failed') {
        setError(result.data.api_response || "Payment failed");
        setIsDialogOpen(true); // Show error dialog
        // console.log(result);
        setLoading(false);
        return;
      }

      setSuccess(result.data.api_response);
      setIsDialogOpen(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setIsDialogOpen(true); // Show error dialog
      setLoading(false);
    }
  };

  // Redirect if no payment data
  if (!paymentData) {
    navigate("verify-payment");
    return null;
  }

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="">
      {
        formData.serviceType === 'airtel_sme' && <OutstandingDebtNotice message={`If your SIM has any Outstanding Balance or Debt with Airtel. \n Do not BUY this plan if you are Owing Airtel (Borrowed Card or Data). Please buy another *AIRTEL PLAN* (Corporate Gifting).`} />
      }
      
      <div className="relative max-w-md sm:mx-auto mb-20 mt-5 border mx-2 p-6 bg-white shadow-lg rounded-lg">
        <div className="absolute top-2 left-2">
          <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
        </div>
        <h2 className="text-2xl font-bold text-center">Buy Now</h2>

        <div className="mt-4 p-4 border rounded space-y-3">
          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              name="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              className="mt-1 block w-full p-2 border rounded bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              disabled
              className="mt-1 block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </label>
  {/* 
          <label className="block">
            <span className="text-gray-700">Payment Description</span>
            <input
              type="text"
              name="paymentDescription"
              value={formData.paymentDescription}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Enter payment description..."
            />
          </label> */}
        </div>

        {/* {success && <p className="text-green-500 mt-2">Payment Successful! Redirecting...</p>} */}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Error Dialog Modal */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h3 className={`${success ? 'text-green-600' : 'text-red-600'} text-lg font-bold`}>{success ? 'Success' : 'Error'}</h3>
              <p className="text-gray-700 mt-2">{success ? success : error}</p>
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
    </div>
  );
}
