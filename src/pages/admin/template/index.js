import Icons from "@/components/atoms/Icons";
import Dashboard from "@/components/templates/Dashboard";
import React from "react";

const DashboardTemplate = () => {
  return (
    <Dashboard>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 ibg-gray-800">
        <p className="text-2xl text-gray-400 itext-gray-500">
          <Icons.Plus />
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 ibg-gray-800">
          <p className="text-2xl text-gray-400 itext-gray-500">
            <Icons.Plus />
          </p>
        </div>
      </div>
    </Dashboard>
  );
};

export default DashboardTemplate;
