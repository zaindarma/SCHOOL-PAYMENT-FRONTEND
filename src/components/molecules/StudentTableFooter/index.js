import React from "react";
import Paginatiion from "../Pagination";
const StudentTableFooter = ({
  data,
  loading,
  currentPage,
  totalPages,
  setPage,
  toggleModal,
}) => {
  return (
    <div className="p-4 border-b dark:border-gray-700 flex flex-col justify-center items-center md:flex-row md:items-center md:justify-between gap-2">
      <button
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={toggleModal}
      >
        Add Student
      </button>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Total Students:{" "}
        {loading ? (
          <span className="font-bold text-gray-400">...</span>
        ) : (
          <span className="font-bold text-blue-500">
            {data?.totalElements ?? 0}
          </span>
        )}
      </h3>
      <Paginatiion
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default StudentTableFooter;
