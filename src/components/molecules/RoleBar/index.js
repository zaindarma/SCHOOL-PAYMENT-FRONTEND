import Button from "@/components/atoms/Button";
import Icons from "@/components/atoms/Icons";
import { useState } from "react";

const RoleBar = ({ role, setRole }) => {
  return (
    <div className="mt-2 md:mt-0 flex flex-wrap items-center space-x-2 w-full md:w-auto">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none "
      >
        <option value="">All</option>
        <option value="ADMIN">Admin</option>
        <option value="STUDENT">Student</option>
      </select>
    </div>
  );
};

export default RoleBar;
