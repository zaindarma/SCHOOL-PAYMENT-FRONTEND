import Icons from "@/components/atoms/Icons";
import React, { useState, useEffect, useRef } from "react";

const UserTableRow = ({ data, handleRoleChange, handleSoftDelete, handleDelete, loading, fetchError }) => {
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
        <p className="text-center p-4 text-gray-500 ">Loading users...</p>
      ) : fetchError ? (
        <p className="text-center p-4 text-red-500">{fetchError}</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">NIS</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">Name</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">Email</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">Role</th>
                <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-y divide-gray-200 ">
              {data?.data?.length > 0 ? (
                data?.data.map((user) => (
                  <tr
                    key={user.userId}
                    className={` ${user.deletedAt ? "bg-red-700 text-white hover:bg-red-950" : "hover:bg-gray-100"}`}
                  >
                    <td className={`pl-1 px-1 py-1 text-sm ${user.deletedAt ? "text-white" : "text-gray-900"}`}>
                      {user.nis}
                    </td>
                    <td className={`pl-1 px-1 py-1 text-sm ${user.deletedAt ? "text-white" : "text-gray-900"}`}>
                      {user.name}
                    </td>
                    <td className={`px-1 py-1 text-sm ${user.deletedAt ? "text-white" : "text-gray-500"}`}>
                      {user.email}
                    </td>
                    <td className="px-1 py-1 text-sm">
                      {user.role === "ADMIN" ? (
                        <span className={`${user.deletedAt ? "text-white" : "text-gray-900"}`}>Admin</span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                          className={`${
                            user.deletedAt
                              ? "text-white bg-gray-800 border-white"
                              : "text-gray-900 bg-gray-100 border-gray-300"
                          } text-sm rounded px-2 py-1 focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="STUDENT">Student</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      )}
                    </td>

                    <td className="px-1 py-1 text-center relative">
                      <button
                        className="px-1 bg-blue-500  hover:bg-gray-700 rounded-lg "
                        onClick={(e) => toggleDropdown(user.userId, e)}
                      >
                        <Icons.MoreVert />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 ">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* ✅ Dropdown Actions */}
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] bg-white  border border-gray-200  shadow-lg rounded-lg"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
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

export default UserTableRow;
