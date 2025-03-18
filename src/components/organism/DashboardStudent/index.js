import React, { useEffect, useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "@/services/studentService";
import { useRouter } from "next/router";
import SearchBar from "@/components/molecules/SearchBar/inedex";
import StudentTableRow from "@/components/molecules/StudentTableRow";
import StudentTableFooter from "@/components/molecules/StudentTableFooter";
import StudentForm from "@/components/molecules/StudentForm";
import { getAllClasses } from "@/services/classesService";
import { getToken } from "@/services/auth";

const DashboardStudent = ({ token }) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(""); // Search state
  const [filters, setFilters] = useState({ search: "" }); // Filters state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    id: "",
    nis: "",
    name: "",
    classId: "",
    birthdate: "",
    address: "",
    phoneNumber: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses(token);
        setClasses(data); // Store classes in state
      } catch (error) {
        console.log("Failed to fetch classes:", error);
        setClasses([]);
      }
    };
    fetchClasses();
  }, [token]);

  const resetFormData = () => {
    setFormData({
      id: "",
      nis: generateNIS(),
      name: "",
      classId: "",
      birthdate: "",
      address: "",
      phoneNumber: "",
    });
  };
  // Fetch students dynamically based on filters
  const {
    data,
    loading,
    error: fetchError,
    totalPages,
    currentPage,
  } = useStudents(page, 10, filters, token);
  const generateNIS = (year = new Date().getFullYear().toString().slice(2)) => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 random digits
    return `${year}${randomDigits}`;
  };

  // Handles search input change
  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilters({ search }); // Apply search
    setPage(0); // Reset to first page
  };

  // Handle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      resetFormData();
      setIsEditing(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setError("");
    try {
      await createStudent(formData, token);
      toggleModal(); // Close modal
      resetFormData();
      setFilters({ search: "" }); // Refresh list
    } catch (err) {
      setError("Failed to add student. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setError("");
    try {
      await updateStudent(formData.id, formData, getToken());
      toggleModal(); // Close modal
      resetFormData();
      setFilters({ search: "" }); // Refresh list
    } catch (err) {
      setError("Failed to update student. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };
  const handleUpdate = async (id) => {
    setIsEditing(true);
    setError("");
    try {
      const student = await getStudentById(id, getToken());

      setFormData({
        id: student?.data.id,
        nis: student?.data.nis,
        name: student?.data.name,
        classId: student?.data.classData.id,
        birthdate: student?.data.birthdate,
        address: student?.data.address,
        phoneNumber: student?.data.phoneNumber,
      });
    } catch (err) {
      setError("Failed to update student. Please try again.");
      console.log(err);
    } finally {
      toggleModal();
    }
  };

  const handleSoftDelete = (id) => {
    console.log("Soft delete student:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete student:", id);
  };
  return (
    <div>
      {/* Student List */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Student List
          </h3>

          <SearchBar
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            search={search}
          />
        </div>
        <StudentTableRow
          data={data}
          handleUpdate={handleUpdate}
          handleSoftDelete={handleSoftDelete}
          handleDelete={handleDelete}
          fetchError={fetchError}
          loading={loading}
        />

        <StudentTableFooter
          data={data}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          toggleModal={toggleModal}
        />
      </div>

      <StudentForm
        isModalOpen={isModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={isEditing ? handleUpdateSubmit : handleSubmit} // DIFFERENT SUBMIT HANDLER
        error={error}
        toggleModal={toggleModal}
        loadingSubmit={loadingSubmit}
        classes={classes}
        isEditing={isEditing}
      />
    </div>
  );
};

export default DashboardStudent;
