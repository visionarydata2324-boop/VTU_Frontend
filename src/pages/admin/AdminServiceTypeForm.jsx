import { useServiceType } from "../../components/SwitchServiceType/ServiceTypeContext";

// AdminServiceTypeForm.jsx
const AdminServiceTypeForm = () => {
  const { serviceType, setServiceType } = useServiceType();

  const handleChange = (e) => {
    setServiceType(e.target.value);
  };

  return (
    <div className="py-20">
        <div className="md:p-6 p-3  bg-white border rounded-2xl shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                Select Service Type
            </h2>
            
            <p className="text-gray-500 text-sm mb-4 text-center">
                Choose the service provider you want to use. This will apply across all
                your transactions.
            </p>

            <div className="relative">
                <select value={serviceType} onChange={handleChange} className="w-full appearance-none p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" >
                    <option value="gsubz">Gsubz</option>
                    <option value="gladtidings">Gladtidings</option>
                </select>

                {/* Custom dropdown arrow */}
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                ▼
                </span>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600 text-center">
                Current service type:{" "}
                <span className="font-semibold text-blue-600">{serviceType}</span>
            </div>
        </div>
    </div>
  );
};

export default AdminServiceTypeForm;
