import ConfirmationModal from "@/components/molecules/ConfirmationModal";
import RoleBar from "@/components/molecules/RoleBar";
import UserTableFooter from "@/components/molecules/UserTableFooter";
import UserTableRow from "@/components/molecules/UserTableRow";
import { useToast } from "@/context/ToastContext";
import { useUsers } from "@/hooks/useUser";
import { getToken } from "@/services/auth";
import {
  hardDeleteUser,
  softDeleteUser,
  updateRole,
} from "@/services/userService";
import React, { useState } from "react";

const DashboardUser = () => {
  const [page, setPage] = useState(0);
  const [role, setRole] = useState("");
  const {
    data,
    loading,
    error: fetchError,
    totalPages,
    currentPage,
    fetchUsers,
  } = useUsers(page, 10, role, getToken());
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const { showToast } = useToast();
  const togglePrompt = () => {
    setIsPromptOpen(!isPromptOpen);
  };
  const openPrompt = (questionText, confirmAction) => {
    setQuestion(questionText);
    setOnConfirm(() => confirmAction); // Store function dynamically
    togglePrompt();
  };

  const handleDelete = (id) => {
    openPrompt("Are you sure you want to delete this user?", () =>
      handleDeleteConfirm(id)
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await hardDeleteUser(id, getToken());
      if (response.status !== 200) throw response;
      showToast("User deleted successfully.");
      setRole(""); // Refresh user list
      fetchUsers();
    } catch (err) {
      showToast("Failed to delete user. Please try again.", true);
    } finally {
      setIsPromptOpen(false);
    }
  };

  const handleSoftDelete = (id) => {
    openPrompt("Are you sure you want to soft delete this user?", () =>
      handleSoftDeleteConfirm(id)
    );
  };

  const handleSoftDeleteConfirm = async (id) => {
    try {
      const response = await softDeleteUser(id, getToken());
      if (response.status !== 200) throw response;
      showToast("User soft deleted successfully.");
      setRole("");
      fetchUsers();
    } catch (err) {
      showToast("Failed to delete user. Please try again.", true);
    } finally {
      setIsPromptOpen(false);
    }
  };

  const handleUpdate = (id, role) => {
    openPrompt("Are you sure you want to update role of this user?", () =>
      handleUpdateConfirm(id, role)
    );
  };

  const handleUpdateConfirm = async (id, role) => {
    try {
      const response = await updateRole(id, role, getToken());
      if (response.status !== 200) throw response;
      showToast("Update role successfully.");
      setRole("");
      fetchUsers();
    } catch (err) {
      showToast("Failed to update role. Please try again.", true);
    } finally {
      setIsPromptOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white px-5 mx-5 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b  flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 ">User List</h3>
          <RoleBar role={role} setRole={setRole} />
        </div>
        <UserTableRow
          data={data}
          handleRoleChange={handleUpdate}
          handleSoftDelete={handleSoftDelete}
          handleDelete={handleDelete}
          fetchError={fetchError}
          loading={loading}
        />
        <UserTableFooter
          data={data}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          toggleModal={false}
        />
      </div>
      <ConfirmationModal
        isOpen={isPromptOpen}
        onCancel={togglePrompt}
        onConfirm={onConfirm}
        question={question}
      />
    </div>
  );
};

export default DashboardUser;
