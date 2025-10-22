import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../../config";

const ElectricityBillPayment = () => {
  const [formData, setFormData] = useState({
    provider: "",
    meterNumber: "",
    variation_code: "",
    amount: "",
    phone: "",
  });

  const { existingUser } = useSelector((state) => state.user);

  // console.log(existingUser);

  const [modal, setModal] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const discos = [
    { value: "Abuja", label: "Abuja Electric" },
    { value: "Eko", label: "Eko Electric" },
    { value: "Ibadan", label: "Ibadan Electric" },
    { value: "Ikeja", label: "Ikeja Electric" },
    { value: "Jos", label: "Jos Electric" },
    { value: "Kaduna", label: "Kaduna Electric" },
    { value: "Kano", label: "Kano Electric" },
    { value: "Portharcourt", label: "Port Harcourt Electric" },
    { value: "Aba", label: "Aba Electric" },
    { value: "Yola", label: "Yola Electric" },
    { value: "Benin", label: "Benin Electric" },
    { value: "Enugu", label: "Enugu Electric" },
  ];

  const variation_code = [
    { value: "prepaid", label: "Prepaid" },
    { value: "postpaid", label: "Postpaid" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { provider, meterNumber, variation_code, amount, phone } = formData;

    if (!provider || !meterNumber || !variation_code || !amount || !phone) {
      setModal({
        show: true,
        type: "error",
        message: "All fields are required!",
      });
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      setModal({
        show: true,
        type: "error",
        message: "Customer phone must be a valid 11-digit number!",
      });
      return;
    }

    if (amount < 1000) {
      setModal({
        show: true,
        type: "error",
        message: "Minimum amount for electricity purchase is ₦1000",
      });
      return;
    }


    setLoading(true);

    // ✅ Transform frontend formData into backend payload
    const payload = {
      provider: provider,
      phone: phone,
      meterNumber,
      amount,
      variation_code: variation_code,
    };

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/buy-electricity`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${existingUser.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok || result.error) {
        setModal({
          show: true,
          type: "error",
          message: data.error,
        });
        return;
      }

      if (!response.ok) throw new Error(data.message || "Failed to submit payment");

      setModal({
        show: true,
        type: "success",
        message: "Electricity bill payment validated successfully!",
      });

      // Reset form
      setFormData({
        provider: "",
        meterNumber: "",
        variation_code: "",
        amount: "",
        phone: "",
      });
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  const closeModal = () => {
    setModal({ show: false, type: "", message: "" });
  };

  return (
    <div className="py-10 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Electricity Bill Payment</h2>

        <form onSubmit={handleSubmit}>
          {/* Disco Name */}
          <div className="mb-4">
            <label htmlFor="provider" className="block text-sm font-medium mb-1">
              Disco name*
            </label>
            <select
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
              className="w-full p-2 border uppercase border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              {discos.map((disco) => (
                <option key={disco.value} value={disco.value}>
                  {disco.label}
                </option>
              ))}
            </select>
          </div>

          {/* Meter Number */}
          <div className="mb-4">
            <label htmlFor="meterNumber" className="block text-sm font-medium mb-1">
              Meter number*
            </label>
            <input
              type="text"
              id="meterNumber"
              name="meterNumber"
              value={formData.meterNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Customer phone*
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="customer phone number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount*
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Meter Type */}
          <div className="mb-4">
            <label htmlFor="variation_code" className="block text-sm font-medium mb-1">
              Meter Type*
            </label>
            <select
              id="variation_code"
              name="variation_code"
              value={formData.variation_code}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              {variation_code.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded`}
          >
            {loading ? "Submitting..." : "Validate"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3
              className={`text-lg font-bold mb-2 ${
                modal.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {modal.type === "error" ? "Error" : "Success"}
            </h3>
            <p className="mb-4">{modal.message}</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricityBillPayment;
