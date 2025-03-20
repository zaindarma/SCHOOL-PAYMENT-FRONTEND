// src/hooks/useSchoolYears.js
import { useState, useEffect } from "react";
import { getSchoolYears, createSchoolYear, updateSchoolYear, deleteSchoolYear } from "../services/SchoolYearService";

const useSchoolYears = (initialPage = 0) => {
  const [schoolYears, setSchoolYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSchoolYears = async () => {
    try {
      setLoading(true);
      const data = await getSchoolYears(page);
      setSchoolYears(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolYears();
  }, [page]);

  const handleSearch = async (query) => {
    if (!query) {
      fetchSchoolYears(); // Jika kosong, ambil semua data kembali
      return;
    }
    try {
      setLoading(true);
      const data = await searchSchoolYear(query);
      setSchoolYears(data);
    } catch (error) {
      console.error("Error searching school year:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newSchoolYear) => {
    try {
      await createSchoolYear(newSchoolYear);
      fetchSchoolYears(); // Refetch after creation
    } catch (error) {
      console.error("Error creating school year:", error);
    }
  };

  const handleUpdate = async (id, updatedSchoolYear) => {
    try {
      await updateSchoolYear(id, updatedSchoolYear);
      fetchSchoolYears(); // Refetch after update
    } catch (error) {
      console.error("Error updating school year:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchoolYear(id);
      fetchSchoolYears(); // Refetch after delete
    } catch (error) {
      console.error("Error deleting school year:", error);
    }
  };

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return {
    schoolYears,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useSchoolYears;
