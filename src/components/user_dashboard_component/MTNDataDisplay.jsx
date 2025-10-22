import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { getBaseUrl } from "../../config";

const token = localStorage.getItem("authToken");

// Helper to normalize network names to uppercase
const normalizeNetwork = (name) => name.toUpperCase();

export default function MTNDataDisplay() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { existingUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Fetch all data plans from API
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/v1/admin/get-all-data`, {
        headers: { Authorization: `Bearer ${existingUser?.token || token}` },
      });
      if (!res.ok){
        console.log(`Error fetching plans: ${res.statusText}`);
        // throw new Error(``);
      }

      const data = await res.json();
      setPlans(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Failed to load data plans");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter plans priced between 1000 and 5000 inclusive
  const filteredPlans = plans.filter(
    (plan) => plan.price >= 1000 && plan.price <= 10000
  );

  // Group filtered plans by their network provider (normalized uppercase), max 4 plans per provider
  const plansByNetwork = filteredPlans.reduce((acc, plan) => {
    const network = normalizeNetwork(plan.networkProvider);
    if (!acc[network]) {
      acc[network] = [];
    }
    if (acc[network].length < 4) {
      acc[network].push(plan);
    }
    return acc;
  }, {});

  // Define "best plan" as the one with highest price in the filtered range
  const bestPlan = filteredPlans.reduce((best, plan) => {
    if (!best || plan.price > best.price) return plan;
    return best;
  }, null);

  // Background color based on uppercase network
  const getBgColor = (network) => {
    switch (network) {
      case "MTN":
        return "bg-yellow-400";
      case "AIRTEL":
        return "bg-red-800";
      case "GLO":
        return "bg-green-600";
      case "9MOBILE":
        return "bg-green-600";
      default:
        return "bg-gray-900";
    }
  };

  // Text color based on uppercase network
    const getTextColor = (network) => {
        switch (network) {
            case "MTN":
                return "text-gray-800";
            default: 
              return  "text-white";
        }
    };

  return (
    <>
      <div className="max-w-6xl mx-auto md:p-6 p-3 bg-white mt-10 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">Our Best Plan</h1>
          <button onClick={fetchPlans}
            className="flex items-center gap-2 text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-600 transition"
            disabled={loading}>
            <span className={`bg-white p-1 rounded-full text-blue-500`}>
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </span>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 animate-pulse rounded-lg h-40"
                />
              ))}
          </div>
        ) : Object.keys(plansByNetwork).length > 0 ? (
          <>
            {Object.entries(plansByNetwork).map(([network, plans]) => (
              <div
                key={network}
                className="mb-8 border border-gray-300 md:p-4 p-2 rounded-lg"
              >
                <h3 className={`text-xl font-semibold mb-4 text-gray-700`}>
                  {network} Plans
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {plans.map((plan) => (
                    <div key={plan._id} className={`${getBgColor(
                        normalizeNetwork(plan.networkProvider)
                      )} ${getTextColor(normalizeNetwork(plan.networkProvider))} hover:bg-blue-500 relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md`}>
                      <p className="mt-2 text-sm font-semibold ">
                        {plan.size} Plan
                      </p>
                      <p className="mt-1 text-lg font-bold  flex items-center">
                        <TbCurrencyNaira /> {plan.price.toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm ">{plan.duration}</p>
                      <button
                        onClick={() =>
                          navigate("/profile/data-top-up/buy-now", { state: plan })
                        }
                        className="mt-3 bg-white text-gray-800  px-3 py-1 rounded font-semibold hover:bg-gray-800 hover:text-white transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* SEE MORE BUTTON */}
                <div className="mt-4 text-center flex justify-start">
                  <button
                    onClick={() =>
                      navigate("services", {
                        state: { networkProvider: network }, // pass network to services
                      })
                    }
                    className={`inline-block ${getBgColor(
                      network
                    )} text-white px-5 py-2 rounded font-semibold hover:bg-gray-800 hover:text-white transition`}
                  >
                    See More {network} Plans
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No data plans available in the selected price range.
          </p>
        )}
      </div>

      {/* Error modal */}
      <Transition.Root show={errorModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setErrorModalOpen}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Error
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{errorMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setErrorModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
