import { useState, useEffect } from "react";
import axios from "axios";

const usePaymentTypes = (filters) => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ totalPages: 1, page: 0 });

  useEffect(() => {
    fetchPaymentTypes();
  }, [filters]);

  const fetchPaymentTypes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");

      let url = "http://localhost:8080/api/payment-types";
      let params = { page: filters.page, size: filters.size };

      if (filters.search) {
        url = `http://localhost:8080/api/payment-types/search?query=${encodeURIComponent(filters.search)}`;
        params = {};
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setPaymentTypes(response.data.content || response.data);
      setPagination({
        totalPages: response.data.totalPages || 1,
        page: response.data.number || 0,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan.");
    }
    setLoading(false);
  };

  const addPaymentType = async (name) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/payment-types", { paymentTypeName: name }, { headers: { Authorization: `Bearer ${token}` } });
      fetchPaymentTypes();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal menambah data.");
    }
  };

  const updatePaymentType = async (id, name) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/payment-types/${id}`, { paymentTypeName: name }, { headers: { Authorization: `Bearer ${token}` } });
      fetchPaymentTypes();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengupdate data.");
    }
  };

  const deletePaymentType = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/payment-types/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPaymentTypes();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal menghapus data.");
    }
  };

  return { paymentTypes, loading, error, pagination, addPaymentType, updatePaymentType, deletePaymentType };
};

export default usePaymentTypes;
