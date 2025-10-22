import React, { useState } from "react"; 
import { useLocation } from "react-router-dom";
import { getBaseUrl } from "../../config";

const UpdateCableForm = () => {
  const location = useLocation();
  const { pkg } = location.state; // package to update

  const { provider, serviceType, price, title, description, _id } = pkg;

  const [formData, setFormData] = useState({
    provider,
    serviceType,
    price,
    title,
    description,
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
      const res = await fetch(`${getBaseUrl()}/admin/edit-cabletv`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider: formData.provider,
          serviceType: formData.serviceType,
          price: formData.price,
          title: formData.title,
          description: formData.description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setModal({
          isOpen: true,
          message: "✅ Cable package updated successfully!",
          type: "success",
        });
      } else {
        setModal({
          isOpen: true,
          message: `❌ ${data.message || "Failed to update package"}`,
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
      <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Update Cable Package
      </h2>
      <p className="text-center text-gray-500 text-sm max-w-sm mx-auto border-b pb-3 mb-6">
        Edit the details of your cable package below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Provider</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Service Type</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center font-semibold gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {loading ? "Updating..." : "Update Package"}
        </button>
      </form>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <h3 className={`text-lg font-bold mb-2 ${modal.type === "success" ? "text-green-600" : "text-red-600"}`}>
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
                className={`px-4 py-2 rounded-lg ${modal.type === "success" ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"}`}
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

export default UpdateCableForm;
