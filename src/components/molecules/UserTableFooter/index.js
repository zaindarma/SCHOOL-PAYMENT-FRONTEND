import React from "react";
import Pagination from "../Pagination";

const UserTableFooter = ({
  data,
  loading,
  currentPage,
  totalPages,
  setPage,
  toggleModal,
}) => {
  return (
    <div className="p-4 border-b iborder-gray-700 flex flex-col justify-center items-center md:flex-row md:items-center md:justify-between gap-2">
      <h3 className="text-lg font-semibold text-gray-700 itext-gray-300">
        Total Users:{" "}
        {loading ? (
          <span className="font-bold text-gray-400">...</span>
        ) : (
          <span className="font-bold text-blue-500">
            {data?.totalElements ?? 0}
          </span>
        )}
      </h3>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UserTableFooter;
