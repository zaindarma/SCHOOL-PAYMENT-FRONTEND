import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded-md ${
          currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-md ${
          currentPage + 1 === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
