import Icons from "@/components/atoms/Icons";
import React, { useState, useEffect, useRef } from "react";

const StudentTableRow = ({ data, handleUpdate, handleSoftDelete, handleDelete, loading, fetchError }) => {
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
        <p className="text-center p-4 text-black ">Loading students...</p>
      ) : fetchError ? (
        <p className="text-center p-4 text-red-500">{fetchError}</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="px-6 py-1 text-left text-xs font-medium text-black  uppercase">Name</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-black  uppercase">Class</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-black  uppercase">Phone</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-black  uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-y divide-gray-200 ">
              {data?.data?.length > 0 ? (
                data?.data.map((student) => (
                  <tr
                    key={student.id}
                    className={` ${student.deletedAt ? "bg-red-700 text-white hover:bg-red-950" : "hover:bg-gray-100"}`}
                  >
                    <td className="pl-1 px-1 py-1 text-sm text-gray-900 ">{student.name}</td>
                    <td className="px-1 py-1 text-sm text-black ">{student.classData.className}</td>
                    <td className="px-1 py-1 text-sm text-black ">{student.phoneNumber}</td>
                    <td className="px-1 py-1 text-center relative">
                      {/* Three dots button */}
                      <button
                        className="px-1 bg-blue-500  hover:bg-gray-700 rounded-lg "
                        onClick={(e) => toggleDropdown(student.id, e)}
                      >
                        <Icons.MoreVert />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-black ">
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
          className="absolute z-[9999] bg-white  border border-gray-200  shadow-lg rounded-lg "
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          <button
            className="flex text-left px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
            onClick={() => {
              handleUpdate(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Update
          </button>
          <button
            className="flex text-left px-4 py-2 text-sm text-yellow-600  hover:bg-gray-100 "
            onClick={() => {
              handleSoftDelete(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Soft Delete
          </button>
          <button
            className="flex text-left px-4 py-2 text-sm text-red-600  hover:bg-gray-100 "
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
