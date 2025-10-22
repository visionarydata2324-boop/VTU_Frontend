import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import { signOutUserSuccess } from "../../store/userReducers";
import { getBaseUrl } from "../../config";

const token = localStorage.getItem("authToken");

// Skeleton loading row
const SkeletonRow = () => (
  <tr className="animate-pulse text-gray-400">
    {Array.from({ length: 9 }).map((_, i) => (
      <td key={i} className="border px-4 py-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

// Modal Component
const Modal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const metadata = transaction.metadata || {};
  const customer = metadata.customer || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:p-6 p-3 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
        >
          ✖
        </button>

        <h2 className="text-xl text-center font-semibold mb-2 text-blue-600">
          Transaction Details
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Here you can view all the details of this transaction, including amounts, status, and metadata.
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          {/* <div className="grid grid-cols-2 border-t border-b py-2">
            <p><strong>ID:</strong></p>
            <p className="text-end">{transaction._id || "N/A"}</p>
          </div> */}

          <div className="grid grid-cols-2 border-b py-2">
            <p><strong>Description:</strong></p>
            <p className="text-end">
              {transaction.description ||
                metadata.paymentDescription ||
                "No Description"}
            </p>
          </div>

          <div className="grid grid-cols-2 border-b py-2">
            <p><strong>Amount:</strong></p>
            <p className="text-end">₦{transaction.amount?.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 border-b py-2">
            <p><strong>Type:</strong></p>
            <p className="text-end capitalize">{transaction.type}</p>
          </div>

          <div className="grid grid-cols-2 border-b py-2">
            <p><strong>Status:</strong></p>
            <p className="text-end">{transaction.status}</p>
          </div>

          <div className="grid grid-cols-2 border-b py-2">
            <p><strong>Date:</strong></p>
            <p className="text-end">{new Date(transaction.createdAt).toLocaleString()}</p>
          </div>

          {transaction.reference && (
            <div className="grid grid-cols-2 border-b py-2">
              <p><strong>Reference:</strong></p>
              <p className="text-end">{transaction.reference}</p>
            </div>
          )}

          {/* Fund Wallet metadata */}
          {/* {(transaction.type === "fund_wallet" ||
            transaction.type === "Fund Wallet") && (
            <>
              <h4 className="mt-4 text-center font-semibold text-gray-800">
                Customer Info
              </h4>
              <div className="grid grid-cols-2 border-t border-b py-2">
                <p><strong>Name:</strong></p>
                <p className="text-end">{customer.name}</p>
              </div>
              <div className="grid grid-cols-2 border-b py-2">
                <p><strong>Email:</strong></p>
                <p className="text-end">{customer.email}</p>
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

function AllTransactions() {
  const { existingUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 7;
  const [loading, setLoading] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${getBaseUrl()}/api/v1/admin/all-transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${existingUser?.token || token}`,
          },
        }
      );
      const result = await response.json();
      if (result?.data) {
        setTransactions(result.data);
        setFilteredTransactions(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch all transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (existingUser?.token) {
      const decoded = jwtDecode(existingUser.token || token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(signOutUserSuccess());
        fetchTransactions();
      }
    }
  }, [existingUser, dispatch]);

  const handleFilterChange = (type) => {
    setFilter(type);
    setCurrentPage(1);
    applyFilters(type, searchQuery);
  };

  const applyFilters = (type, query) => {
    let filtered = [...transactions];
    if (type !== "all") {
      filtered = filtered.filter((tx) => {
        const normalizedType = (tx.type || "").toLowerCase();
        if (type === "fund_wallet") return normalizedType === "fund_wallet" || normalizedType === "fund wallet";
        if (type === "data") return normalizedType.includes("data");
        if (type === "airtime") return normalizedType.includes("airtime");
        if (type === "electricity") return normalizedType.includes("electricity");
        if (type === "tv") return normalizedType.includes("tv");
        return normalizedType === type;
      });
    }
    if (query.trim() !== "") {
      const lower = query.toLowerCase();
      filtered = filtered.filter((tx) => {
        const firstName = tx.user?.firstName?.toLowerCase() || "";
        const lastName = tx.user?.lastName?.toLowerCase() || "";
        const normalizedType = (tx.type || "").toLowerCase();
        return firstName.includes(lower) || lastName.includes(lower) || normalizedType.includes(lower);
      });
    }
    setFilteredTransactions(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    applyFilters(filter, value);
  };

  const indexOfLastTx = currentPage * transactionsPerPage;
  const indexOfFirstTx = indexOfLastTx - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTx,
    indexOfLastTx
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="py-8 md:px-4 px-2 max-w-7xl mx-auto">
      {/* Filters & Refresh */}
      <div className="flex justify-between items-center">
        <div className="mb-4 flex gap-2 items-center lg:flex-nowrap flex-1 min-w-0 flex-wrap">
          {["all", "fund_wallet", "data", "airtime", "electricity", "tv"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`md:px-4 px-2 py-2 text-sm rounded transition ${
                filter === type
                  ? "bg-blue-900 text-white"
                  : type === "fund_wallet"
                  ? "bg-green-200"
                  : type === "data"
                  ? "bg-blue-200"
                  : type === "airtime"
                  ? "bg-yellow-200"
                  : type === "electricity"
                  ? "bg-purple-200"
                  : type === "tv"
                  ? "bg-red-200"
                  : "bg-blue-500 text-white px-4"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "fund_wallet"
                ? "Fund Wallet"
                : type === "data"
                ? "Data Plan"
                : type === "airtime"
                ? "Airtime"
                : type === "electricity"
                ? "Electricity"
                : type === "tv"
                ? "TV Cable"
                : type}
            </button>
          ))}

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name or type..."
            className="border px-4 py-2 rounded w-full max-w-xs focus:outline-blue-400"
          />
        </div>
        <button
          onClick={fetchTransactions}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg px-2 py-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-gray-50">
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tl-md text-start">#</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Firstname</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Lastname</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Description</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Amount</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Type</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Status</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Date</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tr-md text-start">Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
            ) : currentTransactions.length > 0 ? (
              currentTransactions.map((tx, index) => {
                const date = tx.createdAt
                  ? new Date(tx.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric"})
                  : "N/A";
                const time = tx.createdAt
                  ? new Date(tx.createdAt).toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit"})
                  : "N/A";

                const normalizedType = (tx.type || "").toLowerCase();
                let displayType = "Other";
                if (normalizedType === "fund_wallet" || normalizedType === "fund wallet") displayType = "Fund Wallet";
                else if (normalizedType.includes("airtime")) displayType = "Airtime";
                else if (normalizedType.includes("data")) displayType = "Data";

                const description = tx.description || tx.metadata?.paymentDescription || "No Description";

                return (
                  <tr
                    key={index}
                    className="text-start text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="border px-4 py-2">{indexOfFirstTx + index + 1}</td>
                    <td className="border px-4 py-2">{tx.user?.firstName || "N/A"}</td>
                    <td className="border px-4 py-2">{tx.user?.lastName || "N/A"}</td>
                    <td className="border px-4 py-2 truncate max-w-[100px]">{description}</td>
                    <td className="border px-4 py-2">{typeof tx.amount === "number" ? `₦${tx.amount.toLocaleString()}` : "₦0"}</td>
                    <td className="border px-4 py-2 capitalize">{displayType}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                        tx.status?.toLowerCase() === "success" ? "bg-green-500" :
                        tx.status?.toLowerCase() === "failed" ? "bg-red-500" :
                        tx.status?.toLowerCase() === "pending" ? "bg-purple-500" : "bg-gray-400"
                      }`}>{tx.status || "N/A"}</span>
                    </td>
                    <td className="border px-4 py-2">{date}</td>
                    <td className="border px-4 py-2">{time}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  {filter === "airtime" ? "No Airtime transactions found."
                  : filter === "data" ? "No Data transactions found."
                  : filter === "fund_wallet" ? "No Fund Wallet transactions found."
                  : "No transactions found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}

export default AllTransactions;
