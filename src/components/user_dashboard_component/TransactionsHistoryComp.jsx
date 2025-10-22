import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserSuccess } from "../../store/userReducers";
import { FiRefreshCw } from "react-icons/fi";
import { getBaseUrl } from "../../config";

const token = localStorage.getItem("authToken");

// 🔹 Skeleton loading row
const SkeletonRow = () => (
  <tr className="animate-pulse text-gray-400">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="border px-4 py-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

// 🔹 Transaction Modal
const Modal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const metadata = transaction.metadata || {};

  const customer = metadata.customer || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:p-6 p-3 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg">
          ✖
        </button>

        <h2 className="text-xl text-center font-semibold mb-2 text-blue-600">
          Transaction Details
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Here you can view all the details of this transaction, including amounts, status, and metadata.
        </p>


        <div className="space-y-2 text-sm text-gray-700">
          <div className="grid grid-cols-2 border-t border-b py-2">
            <p><strong>ID:</strong></p>
            <p className="text-end">{transaction._id || "N/A"}</p>
          </div>

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

          {/* 🔹 Fund Wallet metadata details */}
          {(transaction.type === "fund_wallet" ||
            transaction.type === "Fund Wallet") && (
            <>
              <h4 className="mt-4 text-center font-semibold text-gray-800">Customer Info</h4>
              <div className="grid grid-cols-2 border-t border-b py-2">
                <p><strong>Name:</strong></p>
                <p className="text-end">{customer.name}</p>
              </div>
              <div className="grid grid-cols-2 border-b py-2">
                <p><strong>Email:</strong></p>
                <p className="text-end">{customer.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function TransactionsHistoryComp() {
  const { existingUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getBaseUrl()}/api/v1/user-transactions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${existingUser?.token || token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please slow down and try again later.");
        }
        const text = await response.text();
        throw new Error(text || "Failed to fetch transactions");
      }

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setTransactions(result.data);
        setFilteredTransactions(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // JWT Expiration check
  useEffect(() => {
    if (existingUser?.token) {
      const decoded = jwtDecode(existingUser.token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        dispatch(signOutUserSuccess());
      }
    }
  }, [existingUser, dispatch]);

  const handleFilterChange = (type) => {
    setFilter(type);
    applyFilters(type, searchQuery);
  };

  const applyFilters = (type, query) => {
    let filtered = [...transactions];

    if (type !== "all") {
      filtered = filtered.filter((tx) => tx.type === type);
    }

    if (query.trim() !== "") {
      filtered = filtered.filter((tx) =>
        (tx.description ||
          tx.metadata?.paymentDescription ||
          "No Description")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(filter, value);
  };

  // Only show the first 8 filtered transactions
  const currentTransactions = filteredTransactions.slice(0, 8);

  // Status badge styles
  const statusStyles = {
    success: "bg-green-500 text-white px-2 py-1 rounded text-xs font-medium",
    failed: "bg-red-500 text-white px-2 py-1 rounded text-xs font-medium",
    pending: "bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium",
  };

  return (
    <div className="lg:py-8 py-4 mt-6 lg:px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        {/* Filters + Search */}
        <div className="mb-4 flex gap-2 items-center lg:flex-nowrap flex-1 min-w-0 flex-wrap">
          <button onClick={() => handleFilterChange("all")} className="md:px-4 px-3 py-2 text-sm bg-blue-500 text-white rounded">
            All
          </button>
          <button onClick={() => handleFilterChange("fund_wallet")} className="md:px-4 px-2 py-2 text-sm bg-green-200 rounded">
            Fund Wallet
          </button>
          <button onClick={() => handleFilterChange("data")} className="md:px-4 px-2 py-2 text-sm bg-blue-200 rounded">
            Data Plan
          </button>
          <button onClick={() => handleFilterChange("electricity")} className="md:px-4 px-2 py-2 text-sm bg-yellow-200 rounded">
            Electricity
          </button>
          <button onClick={() => handleFilterChange("tv")} className="md:px-4 px-2 py-2 text-sm bg-red-200 rounded">
            TV Cable
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search description..."
            className="border px-4 py-2 rounded w-full max-w-xs focus:outline-blue-400"
          />
        </div>

        {/* Refresh Button */}
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
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Description</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Amount</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Type</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Status</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tr-md text-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : currentTransactions.length > 0 ? (
              currentTransactions.map((tx, index) => {
                const description =
                  tx.description ||
                  tx.metadata?.paymentDescription ||
                  "No Description";

                return (
                  <tr
                    key={index}
                    className="text-start text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 truncate max-w-[100px]">{description}</td>
                    <td className="border px-4 py-2">₦{tx.amount.toLocaleString()}</td>
                    <td className="border px-4 py-2 capitalize">{tx.type}</td>
                    <td className="border px-4 py-2">
                      <span className={statusStyles[tx.status] || "bg-gray-300 px-2 py-1 rounded text-xs"}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{new Date(tx.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-6">
        <a
          href="/profile/transaction-history"
          className="text-blue-600 hover:underline font-medium"
        >
          See full transaction history →
        </a>
      </div>

      {/* 🔹 Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}

export default TransactionsHistoryComp;
