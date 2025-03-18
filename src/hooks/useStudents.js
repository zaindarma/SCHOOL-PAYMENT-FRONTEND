import { useState, useEffect } from "react";
import { getAllStudent, getStudentFilter } from "@/services/studentService";

export const useStudents = (page = 0, size = 10, filters = {}, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    const fetchStudents = async () => {
      try {
        let studentData;

        // Check if any filter is provided
        const hasFilters = Object.values(filters).some(
          (value) => value !== null && value !== undefined && value !== ""
        );

        if (hasFilters) {
          // Use search service if any filter is provided
          studentData = await getStudentFilter(page, size, filters, token);
        } else {
          // Otherwise, use getAllStudent
          studentData = await getAllStudent(page, size, token);
        }

        setData(studentData);
      } catch (err) {
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, size, filters, token]);

  return {
    data,
    loading,
    error,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 0,
  };
};
