// src/pages/SchoolYearList.js
import React, { useState } from "react";
import Dashboard from "@/components/templates/Dashboard";
import useSchoolYears from "@/hooks/useSchoolYear";
import { useToast } from "@/context/ToastContext";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";

const SchoolYearList = () => {
  const {
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
  } = useSchoolYears();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [schoolYearId, setSchoolYearId] = useState(null);
  const { showToast } = useToast();
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [editSchoolYear, setEditSchoolYear] = useState({
    id: "",
    schoolYear: "",
    startDate: "",
    endDate: "",
  });
  const togglePrompt = () => setIsPromptOpen(!isPromptOpen);
  // Modal Create/Edit Form Change Handler (Unified)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditSchoolYear((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    handleCreate(editSchoolYear);
    setShowCreateModal(false);
    setEditSchoolYear({ id: "", schoolYear: "", startDate: "", endDate: "" }); // Reset form
  };

  const handleEdit = (schoolYear) => {
    setEditSchoolYear(schoolYear);
    setShowEditModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    handleUpdate(editSchoolYear.schoolYearId, editSchoolYear); // Ganti id dengan schoolYearId
    setShowEditModal(false);
    setEditSchoolYear({ schoolYearId: "", schoolYear: "", startDate: "", endDate: "" }); // Reset form
  };

  const handleDeleteModal = (id) => {
    setSchoolYearId(id);
    setQuestion("Are you sure you want to delete this school year?");
    togglePrompt();
  };
  const handleDeleteConfirm = () => {
    handleDelete(schoolYearId);
    togglePrompt();
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Dashboard>
      <div className="overflow-x-auto p-6 bg-white  shadow-lg rounded-lg">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition mb-4"
        >
          + Create School Year
        </button>

        {/* Create/Edit Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white  p-6 rounded-lg shadow-xl w-1/3 transition transform scale-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 ">
                {showCreateModal ? "Create School Year" : "Edit School Year"}
              </h3>
              <form onSubmit={showCreateModal ? handleCreateSubmit : handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 ">School Year</label>
                  <input
                    type="text"
                    name="schoolYear"
                    value={editSchoolYear.schoolYear}
                    onChange={handleFormChange}
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300  border-gray-600 "
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 ">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={editSchoolYear.startDate}
                    onChange={handleFormChange}
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300  border-gray-600 "
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 ">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={editSchoolYear.endDate}
                    onChange={handleFormChange}
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300  border-gray-600 "
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    {showCreateModal ? "Create" : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      setEditSchoolYear({
                        id: "",
                        schoolYear: "",
                        startDate: "",
                        endDate: "",
                      });
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabel dengan tampilan modern */}
        <table className="w-full border-collapse bg-white  shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100  text-gray-600  uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">School Year</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">End Date</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700  text-sm">
            {schoolYears?.map((year, index) => (
              <tr
                key={year.schoolYearId}
                className={`border-b ${index % 2 === 0 ? "bg-white " : "bg-gray-50 "} hover:bg-gray-100  transition`}
              >
                <td className="py-3 px-6">{year.schoolYear}</td>
                <td className="py-3 px-6">{year.startDate}</td>
                <td className="py-3 px-6">{year.endDate}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(year)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModal(year.schoolYearId)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <ConfirmationModal
          isOpen={isPromptOpen}
          onCancel={togglePrompt}
          onConfirm={handleDeleteConfirm}
          question={question}
        />
      </div>
    </Dashboard>
  );
};

export default SchoolYearList;
