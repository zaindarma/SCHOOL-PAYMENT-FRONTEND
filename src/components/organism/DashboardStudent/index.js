import React, { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import Pagination from "@/components/molecules/Pagination";

const DashboardStudent = ({ token }) => {
  const [page, setPage] = useState(0); // Keep track of the page number
  const { data, loading, error, totalPages, currentPage } = useStudents(page, 10, token); // Fetch students

  return (
    <div className="p-6">
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
                  <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {data?.data.length > 0 ? (
                  data.data.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {student.name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.classData.className}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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

      {/* Pagination */}

      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          Total Students:{" "}
          {loading ? (
            <span className="font-bold text-gray-400">...</span>
          ) : (
            <span className="font-bold text-blue-500">{data?.totalElements ?? 0}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
