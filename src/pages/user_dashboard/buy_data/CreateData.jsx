import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../../config";

const token = localStorage.getItem("authToken");

const networkProviders = ["MTN", "GLO", "AIRTEL", "9MOBILE"];

// Mapping network provider → service types
const serviceTypesMap = {
  MTN: ["mtn_sme", "mtn_gifting", "mtn_datashare"],
  GLO: ["glo_data", "glo_sme"],
  AIRTEL: ["airtel_sme", "airtel_cg"],
  "9MOBILE": ["etisalat_data"],
};

export default function CreateDataComponent() {
  const { existingUser } = useSelector((state) => state.user);

  const [datasize, setDataSize] = useState({
    networkProvider: "MTN",
    serviceType: "mtn_sme", // default for MTN
    size: "",
    duration: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset serviceType if networkProvider changes
    if (name === "networkProvider") {
      setDataSize((prev) => ({
        ...prev,
        [name]: value,
        serviceType: serviceTypesMap[value][0], // default first option
      }));
      return;
    }

    if (name === "size") {
      if (/^\d*\.?\d*$/.test(value)) {
        setDataSize((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "duration") {
      if (/^\d*$/.test(value)) {
        setDataSize((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setDataSize((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "size" && /^\d+$/.test(value)) {
      setDataSize((prev) => ({ ...prev, [name]: `${value}.0` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      networkProvider: datasize.networkProvider,
      serviceType: datasize.serviceType,
      size: `${datasize.size}GB`,
      duration: `${parseInt(datasize.duration)} days`,
      price: datasize.price,
    };

    console.log(payload);

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/admin/create-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${existingUser.token || token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok || result.error) {
        setMessage(result.error || "Failed to create data size");
        setAlertType("error");
        return;
      }

      setMessage("Data size created successfully!");
      setAlertType("success");
      setDataSize({
        networkProvider: "MTN",
        serviceType: "mtn",
        size: "",
        duration: "",
        price: "",
      });
    } catch (error) {
      setMessage(error.message || "Something went wrong");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md sm:mx-auto md:p-6 p-3 mx-2 bg-white md:my-20 my-10 border border-gray-200 shadow-md rounded-lg relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Data size</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Network Provider */}
        <label className="block">
          <span className="text-gray-700">Network Provider</span>
          <select
            name="networkProvider"
            value={datasize.networkProvider}
            onChange={handleChange}
            className="mt-1 block w-full text-sm p-2 border rounded-md"
          >
            {networkProviders.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </label>

        {/* Service Type */}
        <label className="block">
          <span className="text-gray-700">Service Type</span>
          <select
            name="serviceType"
            value={datasize.serviceType}
            onChange={handleChange}
            className="mt-1 block uppercase text-sm w-full p-2 border rounded-md"
          >
            {serviceTypesMap[datasize.networkProvider].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        {/* Size */}
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-gray-700">
              Plan <span className="text-sm text-gray-500">(Numbers / Decimal)</span>
            </span>
            <input
              type="text"
              name="size"
              value={datasize.size}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 1.0"
              required
              className="mt-1 block text-sm w-full p-2 border rounded-md"
            />
          </label>

          {/* Duration */}
          <label className="block">
            <span className="text-gray-700">
              Duration <span className="text-sm text-gray-500">(Numbers Only)</span>
            </span>
            <input
              type="text"
              name="duration"
              value={datasize.duration}
              onChange={handleChange}
              placeholder="e.g. 7"
              required
              className="mt-1 block text-sm w-full p-2 border rounded-md"
            />
          </label>
        </div>

        {/* Price */}
        <label className="block">
          <span className="text-gray-700">Price (₦)</span>
          <input
            type="text"
            name="price"
            value={datasize.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="mt-1 block text-sm w-full p-2 border rounded-md"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md transition duration-300"
        >
          {loading ? "Creating..." : "Create Data size"}
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-2 right-2 px-4 py-2 rounded-lg shadow-lg text-white ${
              alertType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
