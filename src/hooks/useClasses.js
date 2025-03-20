import { getAllClasses, getClassByName } from "@/services/classesService";
import { useState, useEffect } from "react";

export const useClasses = (page = 0, size = 10, searchQuery = "", token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      let classData;
      if (searchQuery) {
        classData = await getClassByName(page, size, searchQuery, token);
      } else {
        classData = await getAllClasses(page, size, token);
      }
      setData(classData);
    } catch (err) {
      setError("Failed to fetch classes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [page, size, searchQuery, token]);

  return {
    data,
    loading,
    error,
    totalPages: data?.data?.totalPages || 1,
    currentPage: data?.data?.number || 0,
    fetchClasses, // Expose function for manual refresh
  };
};
