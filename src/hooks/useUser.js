import { getAllUser, getAllUserFilter } from "@/services/userService";
import { useState, useEffect } from "react";
export const useUsers = (page = 0, size = 10, role = "", token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      let userData;
      if (role) {
        userData = await getAllUserFilter(page, size, role, token);
      } else {
        userData = await getAllUser(page, size, token);
      }
      setData(userData);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size, role, token]);

  return {
    data,
    loading,
    error,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 0,
    fetchUsers, //  Return function
  };
};
