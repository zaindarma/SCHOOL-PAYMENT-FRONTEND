import React, { useState, useRef, useEffect } from "react";
import Icons from "@/components/atoms/Icons";

const ClassTableRow = ({ data, loading, fetchError, handleUpdate, handleDelete }) => {
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
        top: buttonRect.bottom + window.scrollY + 4,
        right: buttonRect.right - buttonRect.left + buttonRect.width,
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
        <p className="text-center p-4 text-gray-500 itext-gray-400">Loading classes...</p>
      ) : fetchError ? (
        <p className="text-center p-4 text-red-500">{fetchError}</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200 idivide-gray-700">
            <thead className="bg-gray-100 ibg-gray-800">
              <tr>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 itext-gray-300 uppercase">
                  Class ID
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 itext-gray-300 uppercase">
                  Class Name
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 itext-gray-300 uppercase">
                  School Year
                </th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 itext-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ibg-gray-900 divide-y divide-gray-200 idivide-gray-700">
              {data?.data?.content?.length > 0 ? (
                data?.data?.content?.map((classItem) => (
                  <tr key={classItem.classesId} className="hover:bg-gray-100 ihover:bg-gray-800">
                    <td className="pl-1 px-1 py-1 text-sm text-gray-900 itext-gray-300">{classItem.classesId}</td>
                    <td className="pl-1 px-1 py-1 text-sm text-gray-900 itext-gray-300">{classItem.classesName}</td>
                    <td className="px-1 py-1 text-sm text-gray-500 itext-gray-400">{classItem.schoolYearId}</td>
                    <td className="px-1 py-1 text-center relative">
                      <button
                        className="px-1 bg-blue-500  hover:bg-gray-700 rounded-lg "
                        onClick={(e) => toggleDropdown(classItem.classesId, e)}
                      >
                        <Icons.MoreVert />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 itext-gray-400">
                    No classes found.
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
          className="absolute z-[9999] bg-white ibg-gray-800 border border-gray-200 iborder-gray-700 shadow-lg rounded-lg"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          <button
            className="flex text-left px-4 py-2 text-sm text-gray-700 itext-gray-300 hover:bg-gray-100 ihover:bg-gray-700"
            onClick={() => {
              handleUpdate(openDropdown);
              setOpenDropdown(null);
            }}
          >
            Update
          </button>
          <button
            className="flex text-left px-4 py-2 text-sm text-red-600 itext-red-400 hover:bg-gray-100 ihover:bg-gray-700"
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

export default ClassTableRow;
