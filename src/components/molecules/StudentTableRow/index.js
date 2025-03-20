import Icons from "@/components/atoms/Icons";
import React, { useState, useEffect, useRef } from "react";

const StudentTableRow = ({
  data,
  handleUpdate,
  handleSoftDelete,
  handleDelete,
  loading,
  fetchError,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const dropdownRef = useRef(null);

  const toggleDropdown = (id, event) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      const buttonRect = event.target.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY + 4, // 4px margin below the button
        right: buttonRect.right - buttonRect.left + buttonRect.width, // Align with the button
      });
      setOpenDropdown(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center p-4 text-gray-500 dark:text-gray-400">
          Loading students...
        </p>
      ) : fetchError ? (
        <p className="text-center p-4 text-red-500">{fetchError}</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Name
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Class
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Phone
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.data?.length > 0 ? (
                data?.data.map((student) => (
                  <tr
                    key={student.id}
                    className={`hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      student.deletedAt && "bg-red-950"
                    }`}
                  >
                    <td className="pl-1 px-1 py-1 text-sm text-gray-900 dark:text-gray-300">
                      {student.name}
                    </td>
                    <td className="px-1 py-1 text-sm text-gray-500 dark:text-gray-400">
                      {student.classData.className}
                    </td>
                    <td className="px-1 py-1 text-sm text-gray-500 dark:text-gray-400">
                      {student.phoneNumber}
                    </td>
                    <td className="px-1 py-1 text-center relative">
                      {/* Three dots button */}
                      <button
                        className="px-1 text-gray-500 dark:text-gray-300 hover:bg-gray-700 dark:hover:text-gray-400"
                        onClick={(e) => toggleDropdown(student.id, e)}
                      >
                        <Icons.MoreVert />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg "
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          <button
            className="flex text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              handleUpdate(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Update
          </button>
          <button
            className="flex text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              handleSoftDelete(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Soft Delete
          </button>
          <button
            className="flex text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              handleDelete(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default StudentTableRow;
