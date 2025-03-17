import Icons from "@/components/atoms/Icons";
import DashboardStudent from "@/components/organism/DashboardStudent";
import Dashboard from "@/components/templates/Dashboard";
import { getToken } from "@/services/auth";
import React from "react";

const StudentPage = () => {
  return (
    <Dashboard>
      <DashboardStudent token={getToken()} />
    </Dashboard>
  );
};

export default StudentPage;
