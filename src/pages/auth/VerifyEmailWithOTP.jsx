import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getBaseUrl } from "../../config";

const VerifyEmailWithOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get email from route state
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no email was passed, redirect back to register page
    if (!emailFromState) {
      navigate("/signup");
    }
  }, [emailFromState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("OTP must be exactly 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submittedOTP: otp, email }),
      });

      const data = await response.json();
      console.log(data);

      if (data.status === "error" || !response.ok) {
        setError(data.message || "Verification failed. Try again.");
        return;
      }

      setSuccess(data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Verification Error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="py-20 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>

          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-center font-semibold">{success}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* ✅ Display the email but make it read-only */}
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              required
            />

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmailWithOTP;
