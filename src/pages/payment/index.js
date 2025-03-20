import NavbarPay from "@/components/organism/NavbarPay";
import { getToken } from "@/services/auth";
import { getPayment } from "@/services/paymentService";
import { getUserById, me } from "@/services/userService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PaymentDetailModal from "./PaymentDetailModal";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Plus } from "lucide-react";
import CreatePaymentModal from "./CreatePaymentModal";
import { getStudentByIds } from "@/services/studentService";
import UpdateUserModal from "./UpdateUserModal";
import UpdateEmailPasswordModal from "./UpdateUserModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const PaymentPage = () => {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState(null);
  const token = getToken();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateEmailPasswordModalOpen, setIsUpdateEmailPasswordModalOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState(router.query.search || "");
  const [statusFilter, setStatusFilter] = useState(
    router.query.status || "ALL"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = router.query.id;

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getPayment();
      console.log(data);
      setPayments(Array.isArray(data) ? data : []);
    };

    const fetchUsers = async () => {
      const res = await me(token);
      setUser(res.data);
    };

    // const fetchStudent = async () => {
    //   try {
    //     const data = await getStudentById(studentId);
    //     setStudent(data);
    //   } catch (error) {
    //     console.error("Failed to fetch student data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchStudent();

    fetchUsers();
    fetchPayments();
  }, []);

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/payind");
  };

  const handlePaymentCreated = () => {};

  // Handle filtering payments
  const filteredPayments = payments?.filter((payment) => {
    const matchesName = payment.paymentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Convert both to uppercase for a case-insensitive match
    const matchesStatus =
      statusFilter === "ALL" ||
      payment.paymentStatus.toUpperCase() === statusFilter.toUpperCase();

    return matchesName && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / pageSize);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(
      { pathname: router.pathname, query: { search: value } },
      undefined,
      { shallow: true }
    );
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    router.push(
      {
        pathname: router.pathname,
        query: { search: searchTerm, status: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className={`${inter.variable} font-sans bg-gray-100 min-h-screen`}>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            {/* Profile */}
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      user?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/4322/4322991.png"
                    }
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">{user?.name}</h1>
                  <p className="text-gray-700">{user?.role}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() => setIsUpdateEmailPasswordModalOpen(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                    <Link
                      href="/main"
                      className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                      Back
                    </Link>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    About
                  </span>
                  <ul>
                    <li className="mb-2">NIS : {user?.nis}</li>
                    <li className="mb-2">Email : {user?.email}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-row gap-3 items-center mb-4">
                  <h2 className="text-xl font-bold">School Bill</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-600 rounded-lg text-white p-1 font-bold hover:bg-blue-800"
                  >
                    <Plus />
                  </button>
                </div>

                {/* Search Input & Status Filter */}
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search by Payment Name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />

                  <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-lg p-2"
                  >
                    <option value="ALL">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <table class="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                  <thead>
                    <tr class="bg-gray-100 border-b">
                      <th class="px-4 py-2 text-left">Payment ID</th>
                      <th class="px-4 py-2 text-left">Payment Name</th>
                      <th class="px-4 py-2 text-left">Payment Type</th>
                      <th class="px-4 py-2 text-left">Amount</th>
                      <th class="px-4 py-2 text-left">Payment Status</th>
                      <th class="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPayments.length > 0 ? (
                      paginatedPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b hover:bg-gray-50 text-sm"
                          onClick={() => handleRowClick(payment)}
                        >
                          <td className="px-4 py-2">{payment.paymentId}</td>
                          <td className="px-4 py-2">{payment.paymentName}</td>
                          <td className="px-4 py-2">{payment.paymentTypeId}</td>
                          <td className="px-4 py-2">{payment.amount}</td>
                          <td
                            className={`px-4 py-2 ${
                              payment.paymentStatus === "PENDING"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {payment.paymentStatus}
                          </td>
                          <td className="px-4 py-2">{payment.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          No matching payments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                  {/* Page Size Selection */}
                  <div>
                    <label className="mr-2">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-300"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Prev
                    </button>
                    <span className="px-3">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Detail Modal */}
      {isModalOpen && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <CreatePaymentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPaymentCreated={handlePaymentCreated}
      />
      <UpdateEmailPasswordModal
        isOpen={isUpdateEmailPasswordModalOpen}
        onClose={() => setIsUpdateEmailPasswordModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default PaymentPage;
