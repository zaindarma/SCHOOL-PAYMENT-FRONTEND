import ClassesForm from "@/components/molecules/ClassesForm";
import ClassTableFooter from "@/components/molecules/ClassTableFooter";
import ClassTableRow from "@/components/molecules/ClassTableRow";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";
import SearchBar from "@/components/molecules/SearchBar/inedex";
import { useToast } from "@/context/ToastContext";
import { useClasses } from "@/hooks/useClasses";
import { getToken } from "@/services/auth";
import { createClasses, deleteClasses, getClass, updateClasses } from "@/services/classesService";
import { getSchoolYears } from "@/services/SchoolYearService";
import React, { useEffect, useState } from "react";

const DashboardClasses = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { data, loading, error, totalPages, currentPage, fetchClasses } = useClasses(page, 10, searchQuery, getToken());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    classesName: "",
    schoolYearId: null,
  });
  const [schoolYear, setSchoolYears] = useState([]);
  const { showToast } = useToast();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [classId, setClassId] = useState(null);
  const [question, setQuestion] = useState("Are you sure?");
  const [search, setSearch] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      resetFormData();
      setIsEditing(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetFormData = () => {
    setFormData({
      id: "",
      classesName: "",
      schoolYearId: null,
    });
  };
  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const data = await getSchoolYears(0, 1000);

        setSchoolYears(data?.data?.content);
      } catch (err) {
        console.log(err);

        showToast("Failed to fetch school years");
      }
    };

    fetchSchoolYears();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      await createClasses(formData, getToken());
      resetFormData();
      showToast("Class added successfully.");
    } catch (err) {
      console.log(err);
      showToast("Failed to add class. Please try again.", true);
    } finally {
      fetchClasses(); // Refresh list
      toggleModal(); // Close modal
      setLoadingSubmit(false);
    }
  };
  const handleUpdate = async (id) => {
    setIsEditing(true);
    try {
      const classes = await getClass(id, getToken());

      setFormData({
        id: classes?.data.classesId,
        classesName: classes?.data.classesName,
        schoolYearId: classes?.data.schoolYearId,
      });
    } catch (err) {
      console.log(err);

      showToast("Failed to update class. Please try again.", true);
    }

    toggleModal();
  };
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      console.log(formData);

      await updateClasses(formData, getToken());
      toggleModal();
      resetFormData();
      showToast("Class updated successfully.");
    } catch (err) {
      showToast("Failed to update class. Please try again.", true);
    } finally {
      fetchClasses(); // Refresh list
      setIsEditing(false);
      setLoadingSubmit(false);
    }
  };
  const handleDelete = (id) => {
    setClassId(id);
    setQuestion("Are you sure you want to delete this class?");
    togglePrompt();
  };
  const handleDeleteConfirm = async () => {
    try {
      await deleteClasses(classId, getToken());
      showToast("Class deleted successfully.");
    } catch (err) {
      showToast("Failed to delete class. Please try again.", true);
      console.log(err);
    } finally {
      fetchClasses();
      togglePrompt();
      fetchClasses();
    }
  };
  const togglePrompt = () => setIsPromptOpen(!isPromptOpen);
  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(search);
    setPage(0); // Reset to first page
  };
  return (
    <div>
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Classes List</h3>
          <SearchBar handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} search={search} />
        </div>

        <ClassTableRow
          data={data}
          loading={loading}
          fetchError={error}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
        <ClassTableFooter
          data={data}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          toggleModal={toggleModal}
        />
      </div>
      <ClassesForm
        isModalOpen={isModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
        toggleModal={toggleModal}
        loadingSubmit={loadingSubmit}
        schoolYears={schoolYear}
        isEditing={isEditing}
      />
      <ConfirmationModal
        isOpen={isPromptOpen}
        onCancel={togglePrompt}
        onConfirm={handleDeleteConfirm}
        question={question}
      />
    </div>
  );
};

export default DashboardClasses;
