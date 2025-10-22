import React, { useState, useEffect, useMemo } from "react";
import { BiEditAlt } from "react-icons/bi";
import { getBaseUrl } from "../../../config";

const ITEMS_PER_PAGE = 8;

export default function AllUsersTable({ isAdmin = true }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken"); // if you still use token
        const res = await fetch(
          `${getBaseUrl()}/api/v1/admin/all-users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // pass token
            },
            credentials: "include", // allow cookies (if backend sends them)
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setUsers(data?.users || []); // adjust if API wraps in { users: [...] }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(lower) ||
          u.lastName?.toLowerCase().includes(lower) ||
          u.email?.toLowerCase().includes(lower) ||
          u.phone?.toLowerCase().includes(lower)
      );
    }
    return filtered;
  }, [users, roleFilter, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Toggle user role (frontend only demo)
  const toggleUserRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id // if backend uses _id instead of id
          ? { ...user, role: user.role === "admin" ? "user" : "admin" }
          : user
      )
    );
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by firstname, lastname, email or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Filter by role: All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No users found.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-50">
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tl-md text-start">
                #
              </th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">
                First Name
              </th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">
                Last Name
              </th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">
                Email
              </th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">
                Phone
              </th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">
                Role
              </th>
              {isAdmin && (
                <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tr-md text-start">
                  Edit Role
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(
              ({ _id, id, firstName, lastName, email, phone, role }, idx) => (
                <tr
                  key={_id || id}
                  className="hover:bg-gray-50 transition cursor-default text-start text-sm text-gray-500"
                >
                  <td className="border px-4 py-2">
                    {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                  </td>
                  <td className="border px-4 py-2">{firstName}</td>
                  <td className="border px-4 py-2">{lastName}</td>
                  <td className="border px-4 py-2">{email}</td>
                  <td className="border px-4 py-2">{phone}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        role === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {role?.toUpperCase()}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="border border-gray-300">
                      <button
                        onClick={() => toggleUserRole(_id || id)}
                        title="Toggle Role"
                        className="p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
                      >
                        <BiEditAlt size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-4 py-2 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-700 text-white"
                    : "bg-blue-300 text-blue-900 hover:bg-blue-400"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
