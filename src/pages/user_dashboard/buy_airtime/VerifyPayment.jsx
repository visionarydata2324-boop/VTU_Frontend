import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://your-api-url.com"; // Replace with your API URL

export default function VerifyPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentRef = location.state?.paymentRef; // Retrieve payment reference

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!paymentRef) {
      setError("Invalid payment reference.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/verify-payment/${paymentRef}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Verification failed");

        setStatus(result.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentRef]);

  // Redirect to dashboard after success
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 3 sec
    }
  }, [status, navigate]);

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold">Payment Verification</h2>

      {loading && <p className="mt-4 text-blue-500">Verifying payment...</p>}
      {status === "success" && <p className="mt-4 text-green-500">Payment verified! Redirecting...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Manual Redirect Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
