import { useState, useEffect } from "react";
import { getAllStudent } from "@/services/studentService";

export const useStudents = (page = 0, size = 10, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    const fetchStudents = async () => {
      try {
        const studentData = await getAllStudent(page, size, token);
        setData(studentData);
      } catch (err) {
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, size, token]);

  return {
    data,
    loading,
    error,
    totalPages: data?.totalPages || 1, // Total pages from API response
    currentPage: data?.currentPage || 0, // Current page from API response
  };
};
