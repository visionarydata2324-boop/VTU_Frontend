import React, { useEffect, useState } from "react";
import { FiRefreshCw, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../config";

const token = localStorage.getItem("authToken");

// Provider themes
const providerColors = {
  dstv: {
    bg: "bg-blue-600",
    lightBg: "bg-blue-200",
    text: "text-blue-600",
    hover: "hover:border-blue-600",
    bgImage: "/images/dstv-bg.jpg",
  },
  gotv: {
    bg: "bg-green-600",
    lightBg: "bg-green-200",
    text: "text-green-600",
    hover: "hover:border-green-600",
    bgImage: "/images/gotv-bg.jpg",
  },
  startimes: {
    bg: "bg-orange-500",
    lightBg: "bg-orange-200",
    text: "text-orange-500",
    hover: "hover:border-orange-500",
    bgImage: "/images/startimes-bg.jpg",
  },
};

export default function AllCablePackages() {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { existingUser } = useSelector((state) => state.user);

  // Check if user is admin
  useEffect(() => {
    if (existingUser?.data?.role === "admin" || existingUser?.role === "admin") {
      setIsAdmin(true);
    }
  }, [existingUser]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 10;

  const fetchPackages = async () => {
    if (!provider) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${getBaseUrl()}/api/v1/get-all-tv-packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${existingUser?.token || token}`,
        },
        body: JSON.stringify({ provider }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch packages");

      const key = `${provider}_Packages`;
      setPackages(data[key] || []);
      setCurrentPage(1); // reset to first page after fetch
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [provider]);

  const handleSelectPackage = (pkg) => {
    navigate("/profile/cable-packages/cable-providers/cable-subscribe", { state: { pkg } });
  };

  const handleEditPackage = (pkg) => {
    navigate("/profile/cable-packages/update-cable", { state: { pkg } });
  };

  if (!provider) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">⚠️ No provider selected</p>
      </div>
    );
  }

  const colors = providerColors[provider] || {
    bg: "bg-gray-800",
    lightBg: "bg-gray-800",
    text: "text-gray-800",
    hover: "hover:border-gray-400",
    bgImage: "",
  };

  // Pagination logic
  const indexOfLast = currentPage * packagesPerPage;
  const indexOfFirst = indexOfLast - packagesPerPage;
  const currentPackages = packages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(packages.length / packagesPerPage);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${colors.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-6 max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1
            className={`text-3xl font-bold text-white py-3 px-6 rounded-lg inline-block shadow-md ${colors.bg}`}
          >
            {provider.toUpperCase()} Subscription Packages
          </h1>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            Choose from the available{" "}
            <span className={`font-medium ${colors.text}`}>
              {provider.toUpperCase()}
            </span>{" "}
            TV packages below.
          </p>

          {/* Refresh button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={fetchPackages}
              className={`flex items-center gap-2 ${colors.bg} text-white px-4 py-2 rounded hover:bg-blue-600 transition`}
              disabled={loading}
            >
              <span className={`bg-white p-1 rounded-full ${colors.text}`}>
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
              </span>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl shadow-sm"></div>
            ))}
          </div>
        )}

        {/* Package Cards */}
        {!loading && currentPackages.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {currentPackages.map((pkg) => (
                <div
                  key={pkg.title}
                  className={`relative cursor-pointer ${colors.lightBg} border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition ${colors.hover}`}
                >
                  <h3 className="text-lg uppercase font-semibold text-gray-900 text-center">
                    {pkg.serviceType}
                  </h3>
                  <p className="text-gray-500 text-sm mt-3 text-center">
                    {pkg.title.replace(/-/g, " ").toUpperCase()}
                  </p>
                  <p className={`text-xl text-center font-bold mt-4 ${colors.text}`}>
                    ₦{pkg.price.toLocaleString()}
                  </p>
                  <div
                    className={`flex justify-center my-3 ${colors.bg} py-2 rounded-md text-white`}
                  >
                    <button onClick={() => handleSelectPackage(pkg)}>Subscribe Now</button>
                  </div>

                  {/* Admin Edit Icon */}
                  {isAdmin && (
                    <button
                      onClick={() => handleEditPackage(pkg)}
                      className="absolute bottom-3 right-3 text-gray-700 hover:text-gray-900 p-2 rounded-full bg-white shadow-md transition"
                      title="Edit Package"
                    >
                      <FiEdit size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? `${colors.bg} text-white`
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* No Packages */}
        {!loading && packages.length === 0 && !error && (
          <div className="text-center mt-6 text-gray-500">
            No packages available for {provider.toUpperCase()} at the moment.
          </div>
        )}
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-red-600">Error</h2>
            <p className="text-gray-700 mt-2">{error}</p>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  fetchPackages();
                }}
                className={`px-4 py-2 rounded-lg text-white ${colors.bg}`}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
