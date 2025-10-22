import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../../config";
import { CheckCircle, XCircle, Info } from "lucide-react";

const DebitUserWallet = () => {
  const { existingUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userEmail: "",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userEmail || !formData.amount) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/v1/admin-debit-wallet/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${existingUser?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(" Wallet debited successfully!", "success");
        setFormData({ userEmail: "", amount: "", description: "" });
      } else {
        showToast(data.message || "Failed to debit wallet.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          💳 Admin Debit User Wallet
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter the user’s email and amount to deduct.  
          Optionally, include a short description for record purposes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="userEmail"
            placeholder="User Email"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
          ></textarea>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } transition-all duration-200`}
          >
            {loading ? "Debiting..." : "Debit Wallet"}
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Motion Toast with Icons */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: -60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 130, damping: 15 }}
            className={`fixed bottom-18 left-1/2 transform -translate-x-1/2 px-5 py-3 flex items-center gap-3 rounded-xl text-white font-medium shadow-lg backdrop-blur-md ${
              toast.type === "success"
                ? "bg-green-600/90"
                : toast.type === "error"
                ? "bg-red-600/90"
                : "bg-gray-600/90"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : toast.type === "error" ? (
              <XCircle className="w-5 h-5 text-white" />
            ) : (
              <Info className="w-5 h-5 text-white" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DebitUserWallet;
