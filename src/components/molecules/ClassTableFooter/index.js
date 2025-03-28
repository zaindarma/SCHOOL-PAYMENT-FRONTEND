import React from "react";
import Paginatiion from "../Pagination";
const ClassTableFooter = ({
  data,
  loading,
  currentPage,
  totalPages,
  setPage,
  toggleModal,
}) => {
  return (
    <div className="p-4 border-b iborder-gray-700 flex flex-col justify-center items-center md:flex-row md:items-center md:justify-between gap-2">
      <button
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={toggleModal}
      >
        Add Class
      </button>
      <h3 className="text-lg font-semibold text-gray-700 itext-gray-300">
        Total Class:{" "}
        {loading ? (
          <span className="font-bold text-gray-400">...</span>
        ) : (
          <span className="font-bold text-blue-500">
            {data?.data?.totalElements ?? 0}
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

export default ClassTableFooter;
