import { useState } from 'react'; 
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { getBaseUrl } from '../../config';

const token = localStorage.getItem("authToken");
// ✅ Service type options per network
const serviceTypesMap = {
  MTN: ["mtn_sme", "mtn_gifting", "mtn_datashare"],
  GLO: ["glo_data", "glo_sme"],
  AIRTEL: ["airtel_sme"],
  "9MOBILE": ["etisalat_data"],
};

const UpdateData = () => {
  const { networkProvider } = useParams();
  const { existingUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Correctly destructure `plan`
  const { plan } = location.state || {};

  // console.log(plan)

  const [showModal, setShowModal] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Initialize formData
  const [formData, setFormData] = useState({
    networkProvider: plan?.networkProvider || '',
    serviceType: plan?.serviceType || '',
    size: plan?.size || '',
    duration: plan?.duration || '',
    amount: plan?.price || '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/admin/update-data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${existingUser?.token || token}`,
        },
        body: JSON.stringify({
          networkProvider: formData.networkProvider,
          serviceType: formData.serviceType,
          plan: formData.size,
          duration: formData.duration,
          price: formData.amount,
        }),
      });

      const data = await response.json();

      console.log(data)

      if (!response.ok || data.error) {
        setError(data.error || "Failed to update data plan");
        setAlertType("error");
      } else {
        setError(data.message || "Data plan updated successfully!");
        setAlertType("success");
      }

      setTimeout(() => {
        setError("");
      }, 3000);

    } catch (err) {
      setError(err.message || "Failed to update data plan");
      setAlertType("error");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // ✅ Service types for the selected network
  const availableServiceTypes = serviceTypesMap[formData.networkProvider] || [];

  return (
    <div className=" md:py-20 py-10 px-3 rounded-lg">
      <div className="max-w-md mx-auto border border-gray-200 bg-white p-3 rounded-lg shadow-md relative">
        <div className="absolute top-2 left-2">
          <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
        </div>
        <h2 className="text-2xl font-semibold text-center">Update Data Plan</h2>
        <form onSubmit={handleUpdate} className="md:p-4 bg-white rounded-lg mt-6">
          <div className="grid grid-cols-2 gap-2">
            {/* Network Provider */}
            <label className="block my-2">
              <span className="text-gray-700">Network Provider</span>
              <select 
                name="networkProvider" 
                value={formData.networkProvider} 
                onChange={handleChange} 
                className="mt-1 block w-full p-3 border rounded"
              >
                {['MTN', 'AIRTEL', 'GLO', '9MOBILE'].map((network, index) => (
                  <option key={index} value={network}>{network}</option>
                ))}
              </select>
            </label>

            {/* Service Type (Dynamic by Network) */}
            <label className="block my-2">
              <span className="text-gray-700">Service Type</span>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border rounded"
              >
                <option value="">Select service type</option>
                {availableServiceTypes.map((stype, index) => (
                  <option key={index} value={stype}>
                    {stype.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block my-2">
              <span className="text-gray-700">Size</span>
              <input 
                type="text" 
                name="size" 
                value={formData.size} 
                onChange={handleChange} 
                className="mt-1 block w-full p-3 border rounded" 
              />
            </label>

            {/* Duration */}
            <label className="block my-2">
              <span className="text-gray-700">Duration</span>
              <input 
                type="text" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                className="mt-1 block w-full p-3 border rounded" 
              />
            </label>
          </div>
          {/* Size */}

          {/* Amount */}
          <label className="block my-2">
            <span className="text-gray-700">Amount</span>
            <input 
              type="text" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              className="mt-1 block w-full p-3 border rounded" 
            />
          </label>

          {/* Update Button */}
          <button type='submit'
            className='mt-4 bg-green-500 w-full font-semibold p-3 text-white rounded-md'
          >
            {loading ? 'Updating...' : 'Update Data'}
          </button>
        </form>

        {/* Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-2 right-2 px-4 py-2 rounded-lg shadow-lg text-white ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for missing plan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Plan Not Found</h2>
            <p className="mb-6 text-gray-700">
              The data plan you're trying to update wasn't found. Please go to the pricing page to select a valid plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateData;
