import { Tab } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi"; // ✅ import edit icon
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { getBaseUrl } from "../../../config";

const token = localStorage.getItem("authToken");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataPlans, setDataPlans] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { existingUser } = useSelector((state) => state.user);
  useEffect(() => {
      // Ensure existingUser and existingUser.data are defined
      if (existingUser.data && existingUser.data.role === 'admin') {
        setIsAdmin(true);
      } else if(existingUser && existingUser.role === 'admin') {
        setIsAdmin(true);
      }
      else {
        console.log("No current user or user data available.");
      }
    }, [existingUser]);

  const [currentPage, setCurrentPage] = useState({});
  const itemsPerPage = 8;

  const fetchData = () => {
    setLoading(true);
    fetch(`${getBaseUrl()}/api/v1/admin/get-all-data`, {
      headers: { Authorization: `Bearer ${existingUser.token || token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data plans.");
        }
        return response.json();
      })
      .then((data) => {
        const groupedData = {};
        data.forEach((plan) => {
          const net = plan.networkProvider?.toUpperCase();
          const type = plan.serviceType?.toUpperCase();
          if (!groupedData[net]) groupedData[net] = {};
          if (!groupedData[net][type]) groupedData[net][type] = [];
          groupedData[net][type].push(plan);
        });
        setDataPlans(groupedData);

        // reset pagination
        const initialPage = {};
        Object.keys(groupedData).forEach((net) => {
          Object.keys(groupedData[net]).forEach((stype) => {
            initialPage[`${net}-${stype}`] = 1;
          });
        });
        setCurrentPage(initialPage);
      })
      .catch((error) => {
        console.error("Error fetching data plans:", error);
        setError(error.message || "Unknown error occurred");
        setIsErrorOpen(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ background colors
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

  const getTextColor = (network) => {
    switch (network) {
      case "MTN":
        return "text-gray-900";
      default:
        return "text-white";
    }
  };

  const handlePageChange = (key, newPage) => {
    setCurrentPage((prev) => ({ ...prev, [key]: newPage }));
  };

  const formatServiceType = (type) => {
    if (!type) return "";
    return type.replace(/_/g, " ").toUpperCase();
  };

  const selectedNetwork = Object.keys(dataPlans)[selectedIndex] || null;
  const serviceTypes = selectedNetwork ? Object.keys(dataPlans[selectedNetwork]) : [];

  return (
    <>
      <div className="w-full max-w-5xl mx-auto bg-white px-2 py-6 md:px-4 rounded-lg my-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Data Plans</h2>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          {/* Top-level networks */}
          <Tab.List className="relative flex space-x-3 rounded-xl bg-slate-800 p-3 overflow-x-auto whitespace-nowrap">
            {Object.keys(dataPlans).map((network) => (
              <Tab
                key={network}
                className={({ selected }) =>
                  classNames(
                    "min-w-[100px] rounded-lg py-2 text-sm font-medium leading-5",
                    selected
                      ? "bg-white text-blue-700 shadow"
                      : "text-blue-100 bg-blue-400 hover:bg-blue-400 hover:text-white"
                  )
                }
              >
                <div className="flex items-center gap-2 justify-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${getBgColor(
                      network
                    )} ${getTextColor(network)}`}
                  >
                    {network.charAt(0)}
                  </div>
                  {network}
                </div>
              </Tab>
            ))}
          </Tab.List>

          {/* Service types under selected network */}
          <div className="mt-3">
            {serviceTypes.length > 0 ? (
              <Tab.Group>
                <Tab.List className="flex space-x-3 overflow-x-auto whitespace-nowrap bg-gray-200 p-2 rounded-lg">
                  {serviceTypes.map((stype) => (
                    <Tab
                      key={stype}
                      className={({ selected }) =>
                        classNames(
                          "min-w-[120px] px-4 py-2 rounded-lg text-sm font-medium",
                          selected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        )
                      }
                    >
                      {formatServiceType(stype)}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels className="mt-4 max-w-full">
                  {serviceTypes.map((stype, idx) => {
                    const plans = dataPlans[selectedNetwork][stype];
                    const key = `${selectedNetwork}-${stype}`;
                    const totalPages = Math.ceil(plans.length / itemsPerPage);
                    const startIndex = (currentPage[key] - 1) * itemsPerPage;
                    const currentPlans = plans.slice(
                      startIndex,
                      startIndex + itemsPerPage
                    );

                    return (
                      <Tab.Panel
                        key={idx}
                        className="rounded-xl grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-3 shadow-md"
                      >
                        {loading ? (
                          [...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-200 animate-pulse h-40 rounded-lg"
                            ></div>
                          ))
                        ) : currentPlans.length > 0 ? (
                          <>
                            {currentPlans.map((plan) => (
                              <div
                                key={plan._id}
                                className={`${getBgColor(
                                  selectedNetwork
                                )} ${getTextColor(
                                  selectedNetwork
                                )} relative flex flex-col justify-center items-center p-4 rounded-lg`}
                              >
                                <p className="mt-2 text-sm text-center font-semibold">
                                  {plan.size}
                                </p>
                                <p className="mt-2 flex items-center font-bold text-lg">
                                  <TbCurrencyNaira /> {plan.price}
                                </p>
                                <p className="mt-2 text-sm">{plan.duration}</p>
                                <button
                                  onClick={() =>
                                    navigate("/profile/data-top-up/buy-now", {
                                      state: plan,
                                    })
                                  }
                                  className="mt-3 bg-white text-black font-semibold px-3 py-2 rounded hover:bg-gray-800 hover:text-white text-sm transition"
                                >
                                  Buy Now
                                </button>

                                {/* ✅ Only for admin */}
                                {isAdmin && (
                                  <div className="bg-white p-1 absolute bottom-1 rounded-full right-1">
                                    <Link
                                      to={`/profile/admin/update-data/`}
                                      state={{ plan }}
                                      className="text-blue-500"
                                    >
                                      <BiEditAlt />
                                    </Link>
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                              <div className="col-span-full flex justify-center my-4 space-x-2">
                                <button
                                  onClick={() =>
                                    handlePageChange(key, currentPage[key] - 1)
                                  }
                                  disabled={currentPage[key] === 1}
                                  className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                                >
                                  Prev
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() =>
                                      handlePageChange(key, i + 1)
                                    }
                                    className={classNames(
                                      "px-3 py-1 rounded",
                                      currentPage[key] === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                    )}
                                  >
                                    {i + 1}
                                  </button>
                                ))}
                                <button
                                  onClick={() =>
                                    handlePageChange(key, currentPage[key] + 1)
                                  }
                                  disabled={currentPage[key] === totalPages}
                                  className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                                >
                                  Next
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No plans available.
                          </p>
                        )}
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
            ) : (
              <p className="text-gray-500 text-sm mt-4">
                No service types found for {selectedNetwork}.
              </p>
            )}
          </div>
        </Tab.Group>
      </div>

      {/* Error Modal */}
      <Transition appear show={isErrorOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsErrorOpen(false)}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-red-600"
                >
                  Error
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">{error}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => setIsErrorOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
