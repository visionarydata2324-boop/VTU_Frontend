import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getBaseUrl } from "../../config";

const CableSubscribeForm = () => {
  const location = useLocation();
  const {pkg} = location.state;

  const { provider, serviceType, price, title, description } = pkg;

  const [formData, setFormData] = useState({
    UIC_smartcard: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "info", // success | error
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setModal({ ...modal, isOpen: false });

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`${getBaseUrl()}/buy-tv-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider,
          serviceType,
          price,
          title,
          description,
          UIC_smartcard: formData.UIC_smartcard,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setModal({
          isOpen: true,
          message: "✅ Subscription successful!",
          type: "success",
        });
      } else {
        setModal({
          isOpen: true,
          message: `❌ ${data.message || "Failed to subscribe"}`,
          type: "error",
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        message: "❌ Network error. Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8 hover:shadow-xl transition relative">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Cable Subscription
      </h2>
      <p className="text-center text-gray-500 text-sm max-w-sm mx-auto border-b pb-3 mb-6">
        Complete your TV subscription by filling in your details below.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Read-only fields */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Provider
            </label>
            <input
              type="text"
              value={provider}
              disabled
              className="w-full cursor-not-allowed text-gray-500 uppercase px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Service Type
            </label>
            <input
              type="text"
              value={serviceType}
              disabled
              className="w-full cursor-not-allowed text-gray-500 px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Price
            </label>
            <input
              type="text"
              value={`₦${Number(price).toLocaleString()}`}
              disabled
              className="w-full cursor-not-allowed text-gray-500 px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              disabled
              className="w-full cursor-not-allowed text-gray-500 px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>

        {/* Editable fields */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Smartcard Number
          </label>
          <input
            type="text"
            name="UIC_smartcard"
            value={formData.UIC_smartcard}
            onChange={handleChange}
            required
            placeholder="Enter Smartcard Number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter Phone Number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Description
          </label>
          <textarea
            value={description}
            disabled
            className="w-full px-3 py-2 cursor-not-allowed text-gray-500 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center font-semibold gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading && (
            <span className="w-5 h-5 border-2 font-semibold border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Processing..." : "Subscribe Now"}
        </button>
      </form>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <h3
              className={`text-lg font-bold mb-2 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success" : "Error"}
            </h3>
            <p className="text-gray-700">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, isOpen: false })}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <div className="mt-4 text-right">
              <button
                onClick={() => setModal({ ...modal, isOpen: false })}
                className={`px-4 py-2 rounded-lg ${
                  modal.type === "success"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CableSubscribeForm;
