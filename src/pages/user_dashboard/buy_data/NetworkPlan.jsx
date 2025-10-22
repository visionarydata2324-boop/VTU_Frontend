import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { Tab } from "@headlessui/react";
import { getBaseUrl } from "../../../config";

// Utils
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const getBgColor = (networkProvider) => {
  switch (networkProvider?.toUpperCase()) {
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

const getTextColor = (networkProvider) => {
  switch (networkProvider?.toUpperCase()) {
    case "MTN":
      return "text-gray-800";
    default:
      return "text-white";
  }
};

const NetworkPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { networkProvider  } = location.state || {};
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const { existingUser } = useSelector((state) => state.user);

  // For pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/v1/admin/get-all-data`, {
          headers: { Authorization: `Bearer ${existingUser.token}` },
        });
        const result = await res.json();

        // Filter only this network
        const networkPlans = result.filter(
          (plan) =>
            plan.networkProvider?.toUpperCase() === networkProvider?.toUpperCase()
        );

        setPlans(networkPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    if (networkProvider) {
      fetchPlans();
    }
  }, [networkProvider, existingUser]);

  // Group plans by serviceType
  const dataPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.serviceType]) acc[plan.serviceType] = [];
    acc[plan.serviceType].push(plan);
    return acc;
  }, {});

  const handlePageChange = (serviceType, newPage) => {
    setCurrentPage((prev) => ({
      ...prev,
      [serviceType]: newPage,
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Loading {networkProvider?.toUpperCase()} Plans...
        </h1>
  
        {/* Skeleton loader grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg flex flex-col justify-center items-center p-4 h-40"
            >
              <div className="w-20 h-4 bg-gray-300 rounded mb-3"></div>
              <div className="w-16 h-4 bg-gray-300 rounded mb-3"></div>
              <div className="w-24 h-4 bg-gray-300 rounded mb-4"></div>
              <div className="w-16 h-6 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  // Utility to format serviceType nicely
    const formatServiceType = (type) => {
        if (!type) return "";
        return type
        .replace(/_/g, " ") // replace underscores with spaces
        .toUpperCase() // make all caps (MTN SME)
        // If you want only first letters capitalized instead of all caps, use this instead:
        // .replace(/\b\w/g, (char) => char.toUpperCase());
    };
  

  return (
    <div className="h-full md:p-6 pb-20 px-3 pt-3">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {networkProvider?.toUpperCase()} Network Plans
      </h1>

      {/* Tabs */}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {/* Tab List */}
        <Tab.List className="relative flex space-x-3 rounded-xl bg-slate-800 p-3 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {Object.keys(dataPlans).map((serviceType) => (
                <Tab
                key={serviceType}
                className={({ selected }) =>
                    classNames(
                    "min-w-[120px] rounded-lg py-3.5 px-4 text-sm font-medium leading-5 text-center", // min width so each tab is clickable
                    selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 bg-blue-400 hover:bg-blue-400 hover:text-white"
                    )
                }
                >
                {formatServiceType(serviceType)}
                </Tab>
            ))}
            </Tab.List>


        {/* Panels */}
            <Tab.Panels className="mt-4 max-w-full">
                {Object.keys(dataPlans).map((serviceType, idx) => {
                    const plansForType = dataPlans[serviceType];
                    const totalPages = Math.ceil(plansForType.length / itemsPerPage);
                    const startIndex =
                    ((currentPage[serviceType] || 1) - 1) * itemsPerPage;
                    const currentPlans = plansForType.slice(
                    startIndex,
                    startIndex + itemsPerPage
                );

                return (
              <Tab.Panel
                key={idx}
                className="rounded-xl grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-3 shadow-md"
              >
                {currentPlans.length > 0 ? (
                  <>
                    {currentPlans.map((plan) => (
                      <div
                        key={plan._id}
                        className={`${getBgColor(networkProvider)} ${getTextColor(
                          networkProvider
                        )} relative flex justify-center items-center flex-col p-4 border rounded-lg`}
                      >
                        <p className="mt-2 text-sm text-center">
                          {plan.size} Plan Size
                        </p>
                        <p className="mt-2 flex items-center font-semibold text-lg">
                          <TbCurrencyNaira />
                          {plan.price}
                        </p>
                        <p className="mt-2 text-sm ">{plan.duration}</p>
                        <button
                          onClick={() =>
                            navigate("/profile/data-top-up/buy-now", {
                              state: plan,
                            })
                          }
                          className="mt-3 bg-white border-none text-black font-semibold px-3 py-2 rounded hover:bg-gray-800 hover:text-white text-sm transition"
                        >
                          Buy Now
                        </button>
                      </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="col-span-full flex justify-center my-4 space-x-2">
                        <button
                          onClick={() =>
                            handlePageChange(
                              serviceType,
                              (currentPage[serviceType] || 1) - 1
                            )
                          }
                          disabled={(currentPage[serviceType] || 1) === 1}
                          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(serviceType, i + 1)}
                            className={classNames(
                              "px-3 py-1 rounded",
                              (currentPage[serviceType] || 1) === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            handlePageChange(
                              serviceType,
                              (currentPage[serviceType] || 1) + 1
                            )
                          }
                          disabled={(currentPage[serviceType] || 1) === totalPages}
                          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    No plans available for {serviceType}.
                  </p>
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NetworkPlan;
