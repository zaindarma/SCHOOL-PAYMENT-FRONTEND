import React from "react";

const StudentTableRow = ({
  data,
  handleUpdate,
  handleSoftDelete,
  handleDelete,
  loading,
  fetchError,
}) => {
  return (
    <>
      {loading ? (
        <p className="text-center p-4 text-gray-500 dark:text-gray-400">
          Loading students...
        </p>
      ) : fetchError ? (
        <p className="text-center p-4 text-red-500">{fetchError}</p>
      ) : (
        <div className="overflow-x-auto">
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
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.data?.length > 0 ? (
                data?.data.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-2 text-sm text-gray-900 dark:text-gray-300">
                      {student.name}
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {student.classData.className}
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {student.phoneNumber}
                    </td>
                    <td className="px-6 py-2 text-center space-x-2 gap-y-2">
                      <button
                        className="px-2 py-1 border border-blue-500 text-white hover:bg-blue-800 rounded-lg"
                        onClick={() => handleUpdate(student.id)}
                      >
                        Update
                      </button>
                      <button
                        className="px-2 py-1 border border-yellow-500 text-white hover:bg-yellow-800 rounded-lg"
                        onClick={() => handleSoftDelete(student.id)}
                      >
                        Soft Delete
                      </button>
                      <button
                        className="px-2 py-1 border border-red-500 text-white hover:bg-red-800 rounded-lg"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
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
    </>
  );
};

export default StudentTableRow;
