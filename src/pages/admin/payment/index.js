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
      <div className="container mx-auto p-4">
        <h1 className="text-lg text-gray-700 font-bold mb-4">Daftar Pembayaran</h1>
        <div className="flex flex-wrap justify-between items-center mb-4">
          {/* 🔹 Search Nama Siswa */}
          <input
            type="text"
            placeholder="Cari Nama Siswa..."
            value={filters.studentName}
            onChange={handleSearchChange}
            className="border p-2 rounded w-1/3"
          />

          {/* 🔹 Search Jenis Pembayaran */}
          <input
            type="text"
            placeholder="Cari Jenis Pembayaran..."
            value={filters.paymentName}
            onChange={handlePaymentSearchChange}
            className="border p-2 rounded w-1/3"
          />

          {/* 🔹 Filter Status */}
          <select className="border p-2 rounded w-1/4" value={filters.paymentStatus} onChange={handleFilterChange}>
            <option value="">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* 🔹 Export Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
          onClick={handleExportExcel}
        >
          📊 Export ke Excel
        </button>

        {loading && <p className="text-center text-gray-500 dark:text-gray-300 mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {payments?.length > 0 ? (
          <table className="w-full bg-white  border-collapse shadow-md rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-200  text-gray-700  uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Nama Siswa</th>
                <th className="py-3 px-6 text-left">Jenis Pembayaran</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Jumlah</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700  text-sm">
              {payments.map((payment) => (
                <tr key={payment.paymentId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{payment.studentName}</td>
                  <td className="py-3 px-6 text-left">{payment.paymentTypeName}</td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        payment.paymentStatus === "COMPLETED"
                          ? "bg-green-500"
                          : payment.paymentStatus === "FAILED"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">Rp {payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-full text-xs mx-1"
                        onClick={() => handleUpdateStatus(payment.paymentId, "COMPLETED")}
                        disabled={loadingUpdate}
                      >
                        ✅ Selesaikan
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs mx-1"
                        onClick={() => handleUpdateStatus(payment.paymentId, "FAILED")}
                        disabled={loadingUpdate}
                      >
                        ❌ Gagal
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs mx-1"
                        onClick={() => handleUpdateStatus(payment.paymentId, "REFUNDED")}
                        disabled={loadingUpdate}
                      >
                        🔄 Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">Tidak ada data pembayaran.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className="border px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 0}
          >
            ⬅️ Prev
          </button>

          <span className="text-lg font-semibold dark:text-white">
            Halaman {pagination.page + 1} dari {pagination.totalPages}
          </span>

          <button
            className="border px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
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
