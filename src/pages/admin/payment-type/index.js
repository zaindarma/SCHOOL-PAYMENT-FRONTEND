import { useState } from "react";
import usePaymentTypes from "@/hooks/usePaymentTypes";
import Dashboard from "@/components/templates/Dashboard";

const PaymentTypePage = () => {
  const [filters, setFilters] = useState({ page: 0, size: 5, search: "" });
  const [newName, setNewName] = useState(""); // Untuk tambah & edit
  const [editId, setEditId] = useState(null);

  const { paymentTypes, loading, error, pagination, addPaymentType, updatePaymentType, deletePaymentType } =
    usePaymentTypes(filters);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 0 });
  };

  const handlePageChange = (newPage) => {
    if (pagination && newPage >= 0 && newPage < pagination.totalPages) {
      setFilters({ ...filters, page: newPage });
    }
  };

  const handleAddPaymentType = () => {
    if (!newName.trim()) return;
    addPaymentType(newName);
    setNewName("");
  };

  const handleUpdatePaymentType = () => {
    if (!newName.trim() || !editId) return;
    if (window.confirm("Apakah Anda yakin ingin memperbarui jenis pembayaran ini?")) {
      updatePaymentType(editId, newName);
      setNewName("");
      setEditId(null);
    }
  };

  const handleDeletePaymentType = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jenis pembayaran ini?")) {
      deletePaymentType(id);
    }
  };

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <h1 className="text-lg text-gray-700 font-bold mb-4">Daftar Jenis Pembayaran</h1>

        {/* 🔹 Input Search */}
        <input
          type="text"
          placeholder="Cari jenis pembayaran..."
          value={filters.search}
          onChange={handleSearchChange}
          className="border-2 border-gray-200 p-2 mb-4 w-full"
        />

        {/* 🔹 Form Tambah / Edit */}
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Nama Jenis Pembayaran..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border-2 border-gray-200 rounded-lg p-2 w-full"
          />
          {editId ? (
            <button className="bg-yellow-500 text-white p-2" onClick={handleUpdatePaymentType}>
              Update
            </button>
          ) : (
            <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleAddPaymentType}>
              Tambah
            </button>
          )}
        </div>

        {loading && <p className="text-gray-900 dark:text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {paymentTypes.length > 0 ? (
          <table className="w-full bg-white  border-collapse shadow-md rounded-lg overflow-hidden mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Nama Jenis Pembayaran</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paymentTypes.map((type) => (
                <tr key={type.paymentTypeId} className="text-center">
                  <td className="border-b-1 border-gray-200 p-2">{type.paymentTypeId}</td>
                  <td className="border-b-1 border-gray-200 p-2">{type.paymentTypeName}</td>
                  <td className="border-b-1 border-gray-200 p-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white p-2 rounded-lg"
                      onClick={() => {
                        setEditId(type.paymentTypeId);
                        setNewName(type.paymentTypeName);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg"
                      onClick={() => handleDeletePaymentType(type.paymentTypeId)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">Tidak ada data jenis pembayaran.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className=" px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 0}
          >
            ⬅️ Prev
          </button>

          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Halaman {pagination.page + 1} dari {pagination.totalPages}
          </span>

          <button
            className=" px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
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

export default PaymentTypePage;
