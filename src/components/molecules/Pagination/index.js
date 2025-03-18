import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex  items-center space-x-2">
      {/* Previous Button */}
      <button
        className={`p-1 rounded-md ${
          currentPage === 0
            ? "text-gray-500 border-1 cursor-not-allowed"
            : "border-1 text-white hover:bg-blue-600"
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
        className={`p-1 rounded-md ${
          currentPage + 1 === totalPages
            ? " text-gray-500 border-1 cursor-not-allowed"
            : "border-1 text-white hover:bg-blue-600"
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
