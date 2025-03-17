import React from "react";
import { useStudents } from "@/hooks/useStudents";

const DashboardStudent = ({ token }) => {
  const { data, loading, error } = useStudents(0, 10, token); // Fetch first 10 students

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 p-4 shadow-md">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Students</p>
          {loading ? (
            <p className="text-2xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl font-bold text-blue-500">{data?.totalElements ?? 0}</p>
          )}
        </div>
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 shadow-md">
          <p className="text-2xl text-gray-400 dark:text-gray-500">📚</p>
        </div>
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 shadow-md">
          <p className="text-2xl text-gray-400 dark:text-gray-500">🏫</p>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Student List</h3>
        </div>
        {loading ? (
          <p className="text-center p-4 text-gray-500 dark:text-gray-400">Loading students...</p>
        ) : error ? (
          <p className="text-center p-4 text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {data?.data.length > 0 ? (
                  data.data.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.classData.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.phoneNumber}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStudent;
