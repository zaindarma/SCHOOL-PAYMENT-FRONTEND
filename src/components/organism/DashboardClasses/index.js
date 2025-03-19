import ClassTableFooter from "@/components/molecules/ClassTableFooter";
import ClassTableRow from "@/components/molecules/ClassTableRow";
import { useClasses } from "@/hooks/useClasses";
import { getToken } from "@/services/auth";
import React, { useState } from "react";

const DashboardClasses = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error, totalPages, currentPage, fetchClasses } =
    useClasses(page, 10, searchQuery, getToken());

  return (
    <div>
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Classes List
          </h3>
        </div>
        <ClassTableRow data={data} loading={loading} fetchError={error} />
        <ClassTableFooter
          data={data}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
      {/* modal content */}
    </div>
  );
};

export default DashboardClasses;
