import Icons from "@/components/atoms/Icons";
import React, { useState } from "react";
import "flowbite";
import { useRouter } from "next/router";
import { logout } from "@/services/auth";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const currentPage = router.asPath.split("/").filter(Boolean).pop().toLowerCase();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (route) => {
    router.push(route);
    setIsSidebarOpen(false); // Close sidebar when navigating
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Icons.SidebarButton />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center justify-center p-2 text-gray-900 dark:text-white font-bold">
                <p className="ms-3">
                  MIAW SCHOOL <span className="text-blue-700">ADMIN</span>
                </p>
              </div>
            </li>
            {[
              { route: "/admin/users", label: "Users", icon: <Icons.AccountBox /> },
              { route: "/admin/student", label: "Student", icon: <Icons.Badge /> },
              { route: "/admin/payment", label: "Payment", icon: <Icons.Wallet /> },
              { route: "/admin/payment-type", label: "Payment-Type", icon: <Icons.Wallet /> },
              { route: "/admin/classes", label: "Classes", icon: <Icons.School /> },
              { route: "/admin/school-year", label: "School Year", icon: <Icons.PhotoMerge /> },
              { route: "/main", label: "Main website", icon: <Icons.Home /> },
            ].map(({ route, label, icon }) => (
              <li key={route}>
                <a
                  onClick={() => handleNavigation(route)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer group ${
                    currentPage === route.split("/").pop()
                      ? "text-blue-700 bg-gray-200 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {icon && icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => logout()}
                className="flex items-center p-2 text-gray-900 rounded-lg bg-red-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <Icons.Logout />
                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p2 sm:p4 rounded-lg dark:border-gray-700">{children}</div>
      </div>
    </>
  );
};

export default Dashboard;
