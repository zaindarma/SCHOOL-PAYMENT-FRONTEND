import { useState } from "react";
import usePayments from "@/hooks/usePayments";
import Dashboard from "@/components/templates/Dashboard";
import { updatePaymentStatus, downloadExcel } from "@/services/paymentService";

const PaymentPage = () => {
  const [filters, setFilters] = useState({
    page: 0,
    size: 5,
    paymentStatus: "",
    paymentName: "",
    studentName: "", // 🔹 Tambahkan state untuk search
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { payments, loading, error, pagination } = usePayments(filters);

  // Handle perubahan input search
  const handleSearchChange = (e) => {
    setFilters({ ...filters, studentName: e.target.value, page: 0 }); // Ubah dari `search` ke `studentName`
  };

  const handlePaymentSearchChange = (e) => {
    setFilters({ ...filters, paymentName: e.target.value, page: 0 });
  };

  // Handle perubahan filter status
  const handleFilterChange = (e) => {
    setFilters({ ...filters, paymentStatus: e.target.value, page: 0 });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (pagination && newPage >= 0 && newPage < pagination.totalPages) {
      setFilters({ ...filters, page: newPage });
    }
  };

  // Update status pembayaran
  const handleUpdateStatus = async (paymentId, newStatus) => {
    const confirmUpdate = window.confirm(`Apakah Anda yakin ingin mengubah status pembayaran menjadi ${newStatus}?`);
    if (!confirmUpdate) return;

    setLoadingUpdate(true);
    try {
      await updatePaymentStatus(paymentId, newStatus);
      alert(`Status pembayaran diperbarui menjadi ${newStatus}.`);
      setFilters({ ...filters });
    } catch (error) {
      alert("Gagal memperbarui status pembayaran.");
    }
    setLoadingUpdate(false);
  };

  const handleExportExcel = async () => {
    try {
      await downloadExcel(filters);
      alert("Export berhasil! File akan diunduh.");
    } catch (error) {
      alert("Gagal mengekspor data.");
    }
  };

  return (
    <Dashboard>
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">📋 Daftar Pembayaran</h1>

        <div className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-6">
          {/* 🔹 Search Nama Siswa */}
          <input type="text" placeholder="🔍 Cari Nama Siswa..." value={filters.studentName} onChange={handleSearchChange} className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />

          {/* 🔹 Search Jenis Pembayaran */}
          <input
            type="text"
            placeholder="🔍 Cari Jenis Pembayaran..."
            value={filters.paymentName}
            onChange={handlePaymentSearchChange}
            className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* 🔹 Filter Status */}
          <select className="border p-2 rounded w-1/4 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={filters.paymentStatus} onChange={handleFilterChange}>
            <option value="">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* 🔹 Export Button */}
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300" onClick={handleExportExcel}>
          📊 Export ke Excel
        </button>

        {loading && <p className="text-center text-gray-500 dark:text-gray-300 mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {payments?.length > 0 ? (
          <table className="w-full bg-white dark:bg-gray-800 border-collapse shadow-md rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Nama Siswa</th>
                <th className="py-3 px-6 text-left">Jenis Pembayaran</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Jumlah</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300 text-sm">
              {payments.map((payment) => (
                <tr key={payment.paymentId} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                  <td className="py-3 px-6 text-left">{payment.studentName}</td>
                  <td className="py-3 px-6 text-left">{payment.paymentTypeName}</td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white 
                      ${payment.paymentStatus === "COMPLETED" ? "bg-green-500" : payment.paymentStatus === "FAILED" ? "bg-red-500" : payment.paymentStatus === "PENDING" ? "bg-yellow-500" : "bg-purple-500"}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">Rp {payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-xs transition duration-300" onClick={() => handleUpdateStatus(payment.paymentId, "COMPLETED")} disabled={loadingUpdate}>
                        ✅ Selesaikan
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-xs transition duration-300" onClick={() => handleUpdateStatus(payment.paymentId, "FAILED")} disabled={loadingUpdate}>
                        ❌ Gagal
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-xs transition duration-300" onClick={() => handleUpdateStatus(payment.paymentId, "REFUNDED")} disabled={loadingUpdate}>
                        🔄 Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300 mt-4">Tidak ada data pembayaran.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-3">
          <button
            className="border px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 transition duration-300"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 0}
          >
            ⬅️ Prev
          </button>

          <span className="text-lg font-semibold dark:text-white">
            Halaman {pagination.page + 1} dari {pagination.totalPages}
          </span>

          <button
            className="border px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 transition duration-300"
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= pagination.totalPages - 1}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default PaymentPage;
