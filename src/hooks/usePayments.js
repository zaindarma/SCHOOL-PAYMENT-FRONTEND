import { useState, useEffect } from "react";
import { getFilteredPayments } from "@/services/paymentService";

const usePayments = (initialFilters = { page: 0, size: 10, studentName: "", paymentStatus: "" }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFilteredPayments(initialFilters);

        if (!data || !data.content) {
          throw new Error("Data tidak tersedia");
        }

        setPayments(data.content);
        setPagination({
          page: data.pageable?.pageNumber ?? 0,
          size: data.pageable?.pageSize ?? 10,
          totalPages: data.totalPages ?? 0,
          totalElements: data.totalElements ?? 0,
        });
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [initialFilters]);

  return { payments, loading, error, pagination };
};

export default usePayments;
